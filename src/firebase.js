import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration - move this from main.js
const firebaseConfig = {
  apiKey: 'AIzaSyCfsNo8UySXjVBv83qzYYw538WsaHf-C6E',
  authDomain: 'roomsvue.firebaseapp.com',
  projectId: 'roomsvue',
  storageBucket: 'roomsvue.appspot.com',
  messagingSenderId: '326652607881',
  appId: '1:326652607881:web:6f079aff8dbbd5fa5b3558',
};

// Initialize Firebase and export the instances
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
