import { createApp } from 'vue'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import App from './App.vue'
import router from './router'
import store from './store'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCfsNo8UySXjVBv83qzYYw538WsaHf-C6E',
  authDomain: 'roomsvue.firebaseapp.com',
  projectId: 'roomsvue',
  storageBucket: 'roomsvue.appspot.com',
  messagingSenderId: '326652607881',
  appId: '1:326652607881:web:6f079aff8dbbd5fa5b3558',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

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

export { auth }
