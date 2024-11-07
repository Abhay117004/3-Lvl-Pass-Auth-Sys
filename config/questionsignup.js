import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get('uid');

if (!uid) {
    alert("User ID (uid) is missing in the URL parameters.");
    window.location.href = 'login.html';
}

document.getElementById('q-a-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const question = document.getElementById('security-question').value;
    const answer = document.getElementById('security-answer').value;
    const birthdate = document.getElementById('birthdate').value;
    const pin = birthdate.slice(8, 10) + birthdate.slice(5, 7);

    try {
        const docRef = doc(db, 'users', uid);
        await setDoc(docRef, {
            securityQuestion: question,
            securityAnswer: answer,
            pin: pin
        }, { merge: true });

        alert("Security question, answer, and PIN saved successfully!");
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error saving security info:', error);
        alert("Error saving security question, answer, and PIN: " + error.message);
    }
});
