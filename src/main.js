import { createApp } from 'vue'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase' // Import from centralized firebase.js
import App from './App.vue'
import router from './router'
import store from './store'

// Auth state listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in, fetching auth user...')
    store.dispatch('FETCH_AUTH_USER')
  }
})

const vueApp = createApp(App)

vueApp.use(router)
vueApp.use(store)

vueApp.mount('#app')

// Initial user fetch (consider moving this inside the onAuthStateChanged block if it depends on auth)
store.dispatch('FETCH_USER', { id: store.state.authId })
