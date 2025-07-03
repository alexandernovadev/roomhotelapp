import { createApp } from 'vue';
import App from './App.vue';
import './assets/main.css';

// Import Inter font
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Create Vue app instance
const app = createApp(App);

// Mount the app
app.mount('#app');
