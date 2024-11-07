import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBPOtTR68Vt7Q-O0HweSkhpCcCt-3RJTy8",
  authDomain: "level-password-auth-system.firebaseapp.com",
  projectId: "level-password-auth-system",
  storageBucket: "level-password-auth-system.firebasestorage.app",
  messagingSenderId: "626807809821",
  appId: "1:626807809821:web:eaf4ea617694ee7bcf63f4",
  measurementId: "G-KF6STJE8FE"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, RecaptchaVerifier, signInWithPhoneNumber };
