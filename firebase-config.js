// firebase-config.js

// การตั้งค่า Firebase ของคุณ
const firebaseConfig = {
    apiKey: "AIzaSyBUlKIfJyWeYlOmAtKzPOtdT5TwiaonGtc",
    authDomain: "happynewyear-91e57.firebaseapp.com",
    projectId: "happynewyear-91e57",
    storageBucket: "happynewyear-91e57.firebasestorage.app",
    messagingSenderId: "31051724461",
    appId: "1:31051724461:web:a9b9b72a7b32fda9ce7824",
    measurementId: "G-KT8TXCGHZH"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore(app);  // ใช้ Firebase Firestore
