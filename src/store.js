import { createStore } from 'vuex'
import {
  ref,
  push,
  update,
  onValue,
  child,
  set,
  get,
  limitToFirst,
  query,
} from 'firebase/database'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth, db } from './firebase' // Import from centralized firebase.js
import countObjectProperties from './utilis'

export default createStore({
  state: {
    users: {},
    services: {},
    rooms: {},
    authId: null,
  },
  mutations: {
    SET_ROOM(state, { newRoom, roomId }) {
      state.rooms[roomId] = newRoom
    },
    APPEND_ROOM_TO_USER(state, { roomId, userId }) {
      if (!state.users[userId].rooms) {
        state.users[userId].rooms = {}
      }
      state.users[userId].rooms[roomId] = roomId
    },
    SET_ITEM(state, { item, id, resource }) {
      const newItem = { ...item, '.key': id }
      state[resource][id] = newItem
    },
    SET_AUTHID(state, id) {
      state.authId = id
    },
  },

  actions: {
    CREATE_ROOM: async ({ state, commit }, room) => {
      try {
        const newRoom = { ...room }
        const roomsRef = ref(db, 'rooms')
        const newRoomRef = push(roomsRef)
        const roomId = newRoomRef.key

        newRoom.userId = state.authId
        newRoom.publishedAt = Math.floor(Date.now() / 1000)
        newRoom.meta = { likes: 0 }

        const updates = {}
        updates[`/rooms/${roomId}`] = newRoom
        updates[`/users/${newRoom.userId}/rooms/${roomId}`] = roomId

        await update(ref(db), updates)

        commit('SET_ROOM', { newRoom, roomId })
        commit('APPEND_ROOM_TO_USER', { roomId, userId: newRoom.userId })
        return state.rooms[roomId]
      } catch (error) {
        console.error('Error creating room:', error)
        throw error
      }
    },

    FETCH_ROOMS: ({ commit }, limit) => new Promise((resolve, reject) => {
      let roomsQuery = query(ref(db, 'rooms'))
      if (limit) {
        roomsQuery = query(roomsQuery, limitToFirst(limit))
      }

      get(roomsQuery)
        .then((snapshot) => {
          if (snapshot.exists()) {
            const rooms = snapshot.val()
            Object.keys(rooms).forEach((roomId) => {
              const room = rooms[roomId]
              commit('SET_ITEM', { resource: 'rooms', id: roomId, item: room })
            })
            resolve(rooms)
          } else {
            resolve(null)
          }
        })
        .catch((error) => {
          reject(error)
        })
    }),

    FETCH_USER: ({ commit }, { id }) => new Promise((resolve) => {
      const userRef = ref(db, `users/${id}`)
      onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          const user = snapshot.val()
          commit('SET_ITEM', { resource: 'users', id: snapshot.key, item: user })
          resolve(user)
        } else {
          resolve(null)
        }
      }, { onlyOnce: true })
    }),

    CREATE_USER: async ({ commit }, { email, name, password, phone, avatar }) => {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = userCredential
      const registeredAt = Math.floor(Date.now() / 1000)
      const newUser = {
        email,
        name,
        registeredAt,
        phone: phone || '',
        avatar: avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D9488&color=fff&size=128`,
        bio: '',
        username: email.split('@')[0] // Username por defecto basado en el email
      }

      await set(ref(db, `users/${user.uid}`), newUser)
      commit('SET_ITEM', { resource: 'users', id: user.uid, item: newUser })
      commit('SET_AUTHID', user.uid)
      return newUser
    },

    FETCH_AUTH_USER: ({ dispatch, commit }) => {
      if (!auth.currentUser) {
        return Promise.resolve(null)
      }

      const userId = auth.currentUser.uid
      commit('SET_AUTHID', userId)
      return dispatch('FETCH_USER', { id: userId })
    },

    SIGN_IN(_, { email, password }) {
      return signInWithEmailAndPassword(auth, email, password)
    },

    LOG_OUT({ commit }) {
      signOut(auth).then(() => {
        commit('SET_AUTHID', null)
      })
    },
  },

  getters: {
    authUser(state) {
      return state.authId ? state.users[state.authId] : null
    },
    rooms: (state) => state.rooms,
    userRoomsCount: (state) => (id) => {
      if (state.users[id] && state.users[id].rooms) {
        return countObjectProperties(state.users[id].rooms)
      }
      return 0
    },
  },
})
