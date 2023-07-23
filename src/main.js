import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCfsNo8UySXjVBv83qzYYw538WsaHf-C6E',
  authDomain: 'roomsvue.firebaseapp.com',
  projectId: 'roomsvue',
  storageBucket: 'roomsvue.appspot.com',
  messagingSenderId: '326652607881',
  appId: '1:326652607881:web:6f079aff8dbbd5fa5b3558',
};
  // Initialize Firebase WWTTF en main se puede traer un CICLO DE VIDA ??
firebase.initializeApp(firebaseConfig);
// Escuha el cambio de la autenticacion
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('FETCH_AUTH_USER');
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.dispatch('FETCH_USER', { id: store.state.authId });
  },
}).$mount('#app');
