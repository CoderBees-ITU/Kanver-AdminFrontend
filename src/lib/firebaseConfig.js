// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKjX9i4oA8AJ4h9kyK63Wm4wnwn-fL2PA",
  authDomain: "test-kanver.firebaseapp.com",
  projectId: "test-kanver",
  storageBucket: "test-kanver.firebasestorage.app",
  messagingSenderId: "532415059799",
  appId: "1:532415059799:web:ab87a38af3016b0e369012",
  measurementId: "G-HKXNQTTWKR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth };