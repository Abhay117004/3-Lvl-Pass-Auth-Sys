    import { auth, db } from '/config/FirebaseConfig.js';
    import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

    function checkAuth() {
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to view this page.");
            window.location.href = 'login.html'; 
        }
    }

    auth.onAuthStateChanged((user) => {
        if (user) {
        } else {
            alert("You must be logged in to view this page.");
            window.location.href = 'login.html';
        }
    });

    document.getElementById('pin-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const enteredPin = document.getElementById('pin').value;

        const user = auth.currentUser;
        if (!user) {
            alert('Please log in first.');
            window.location.href = 'login.html';
            return;
        }

        const docRef = doc(db, 'users', user.uid);
        try {
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const storedPin = docSnap.data().pin;

                if (enteredPin === storedPin) {
                    alert("PIN verified successfully!");
                    window.location.href = 'home.html';
                } else {
                    alert("Incorrect PIN. Please try again.");
                }
            } else {
                console.error("No such user document.");
                alert("No data found for your account.");
            }
        } catch (error) {
            console.error('Error verifying PIN:', error);
            alert("Error verifying PIN: " + error.message);
        }
    });
