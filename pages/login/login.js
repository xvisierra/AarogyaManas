const firebaseConfig = {
  apiKey: "AIzaSyA0A_y1j0K7Eu1P0PaE5NLqYvOyzZ2UjsM",
  authDomain: "aarogyamanas-5808a.firebaseapp.com",
  projectId: "aarogyamanas-5808a",
  storageBucket: "aarogyamanas-5808a.appspot.com",
  messagingSenderId: "627350676855",
  appId: "1:627350676855:web:ea1a27b10d0afbd9ba6d72"
};

firebase.initializeApp(firebaseConfig);
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in with Firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in successfully, redirect to analysis.html
      window.location.href = '../../analysis.html';
    })
    .catch((error) => {
      // Handle errors here
      console.error('Login failed:', error.message);
      alert(error.message);
      // You can display an error message to the user if needed
    });
});