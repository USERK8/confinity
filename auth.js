
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyC3hJ1pmZtEoZXegutaWQv7bV5raTE4Jz8",
  authDomain: "confinity-f216b.firebaseapp.com",
  projectId: "confinity-f216b",
  storageBucket: "confinity-f216b.firebasestorage.app",
  messagingSenderId: "1071800475495",
  appId: "1:1071800475495:web:a1b020caa6884151a099c2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

 
export const db = getFirestore(app);
export { auth };

const loginBtn = document.getElementById("loginBtn");

function renderLoggedOut() {
  if (!loginBtn) return;
  loginBtn.textContent = "Log in";
  loginBtn.onclick = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Sign-in failed:", err);
      alert("Sign-in didn't go through. Please try again.");
    }
  };
}

function renderLoggedIn(user) {
  if (!loginBtn) return;
  const firstName = user.displayName ? user.displayName.split(" ")[0] : "Account";
  loginBtn.textContent = `Hi, ${firstName}`;
  loginBtn.onclick = async (e) => {
    e.preventDefault();
    if (confirm("Log out of Confinity?")) {
      await signOut(auth);
    }
  };
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    renderLoggedIn(user);
  } else {
    renderLoggedOut();
  }
});
