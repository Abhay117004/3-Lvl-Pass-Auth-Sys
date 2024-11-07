import { auth, db } from '/config/FirebaseConfig.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

function checkAuth() {
    const user = auth.currentUser;
    if (!user) {
        alert("You must be logged in to view this page.");
        window.location.href = 'login.html'; 
    } else {
        fetchSecurityQuestion(user.uid);
    }
}

async function fetchSecurityQuestion(uid) {
    const docRef = doc(db, 'users', uid);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            document.getElementById('security-question').value = userData.securityQuestion || 'No question set.';
        } else {
            console.log("No such document!");
            alert("No data found for your account.");
        }
    } catch (error) {
        console.error("Error fetching data from Firestore:", error);
        alert("An error occurred while fetching your security question.");
    }
}

auth.onAuthStateChanged((user) => {
    if (user) {
        fetchSecurityQuestion(user.uid);
    } else {
        alert("You must be logged in to view this page.");
        window.location.href = 'login.html';
    }
});

document.getElementById('security-question-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const answer = document.getElementById('answer').value;
    const user = auth.currentUser;

    if (!user) {
        alert("You must be logged in to submit the answer.");
        return;
    }

    const docRef = doc(db, 'users', user.uid);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.securityAnswer.toLowerCase() === answer.toLowerCase()) {
                alert("Answer verified successfully!");
                window.location.href = 'pin.html';  
            } else {
                alert("Incorrect answer. Please try again.");
            }
        } else {
            console.log("No such document!");
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("An error occurred while verifying your answer.");
    }
});
