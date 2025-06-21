import { createApp } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase' // Import from centralized firebase.js
import App from './App.vue'
import router from './router'
import store from './store'

// Import main CSS with Tailwind first
import './assets/main.css'
// Import CSS variables after Tailwind
import './styles/variables.css'

// Auth state listener
onAuthStateChanged(auth, async (user) => {
  if (user) {
    try {
      await store.dispatch('FETCH_AUTH_USER')
    } catch (error) {
      console.error('Error fetching auth user:', error)
    }
  } else {
    store.commit('SET_AUTHID', null)
  }
})

const vueApp = createApp(App)

vueApp.use(router)
vueApp.use(store)

vueApp.mount('#app')

// Initial user fetch (consider moving this inside the onAuthStateChanged block if it depends on auth)
store.dispatch('FETCH_USER', { id: store.state.authId })
