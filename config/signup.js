import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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
const provider = new GoogleAuthProvider();

document.getElementById('google-sign-up').addEventListener('click', async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const displayName = user.displayName || user.email;
        await setDoc(doc(db, 'users', user.uid), {
            email: user.email,
            displayName: displayName,
            createdAt: new Date(),
        });
        window.location.href = 'questionsignup.html?uid=' + user.uid;
    } catch (error) {
        console.error('Error during Google sign-up:', error);
        alert('An error occurred during Google sign-up: ' + error.message);
    }
});

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const question = document.getElementById('signup-question').value;
    const answer = document.getElementById('signup-answer').value;
    const birthdate = document.getElementById('signup-birthdate').value;

    const pin = birthdate.slice(8, 10) + birthdate.slice(5, 7);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(db, 'users', user.uid), {
            email: email,
            securityQuestion: question,
            securityAnswer: answer,
            pin: pin,
            createdAt: new Date(),
        });

        alert("Signup Successful!");
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Signup Error:', error);
        alert("Signup failed: " + error.message);
    }
});
