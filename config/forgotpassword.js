    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

    document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;

        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset link sent! Please check your email.');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error sending password reset email:', error);
            alert('Error: ' + error.message);
        }
    });
