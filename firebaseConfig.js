 // firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';  

const firebaseConfig = {
    apiKey: "AIzaSyDBZDn3e8ODgpVdm6FWjvdVwJiScYo4D3o",
    authDomain: "dform-1905b.firebaseapp.com",
    projectId: "dform-1905b",
    storageBucket: "dform-1905b.appspot.com",
    messagingSenderId: "173857463324",
    appId: "1:173857463324:web:70d4ac4dad23553c8553d9",
    measurementId: "G-ET013QV86R"
  };
  

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getFirestore(app);  
  
  export { app, analytics, db };