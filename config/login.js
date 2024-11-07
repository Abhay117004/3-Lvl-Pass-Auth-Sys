    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
    import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
    import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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

    const googleSignUpButton = document.getElementById('google-sign-up');

    googleSignUpButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log('Logged in with Google:', user);
            
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    email: user.email,
                    displayName: user.displayName || user.email, 
                    createdAt: new Date(),
                });
            } else {
                console.log("User data:", docSnap.data());
            }

            alert('Logged in successfully!');
            window.location.href = 'questions.html'; 
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            alert('An error occurred during Google sign-in: ' + error.message);
        }
    });

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Logged in successfully");
            
            const user = auth.currentUser;
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("User data:", docSnap.data());
            } else {
                console.log("No such document!");
            }

            window.location.href = 'questions.html';
        } catch (error) {
            console.error('Error during email login:', error);
            alert("Login failed: " + error.message);
        }
    });
