import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJKBY6fl_vhGOsFwebH1VEDEyf3j34eho",
  authDomain: "lax-dashboard-v2-testing.firebaseapp.com",
  projectId: "lax-dashboard-v2-testing",
  storageBucket: "lax-dashboard-v2-testing.appspot.com",
  messagingSenderId: "945781234656",
  appId: "1:945781234656:web:d1a13864036187d2582985"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();