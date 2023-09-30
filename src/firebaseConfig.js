import { initializeApp } from 'firebase/app';
// import { set, getDatabase, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBMoFUcQKuCaWf8Q5wSS117PwvlEQVi9g",
    authDomain: "popcorn-ecommerce.firebaseapp.com",
    databaseURL: "https://popcorn-ecommerce-default-rtdb.firebaseio.com",
    projectId: "popcorn-ecommerce",
    storageBucket: "popcorn-ecommerce.appspot.com",
    messagingSenderId: "1073239731923",
    appId: "1:1073239731923:web:3a543b7ea36959777b6e26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// function writeUserData(userId, name, email) {
//     const db = getDatabase(app);
//     const reference = ref(db, 'users/' + userId);

//     set(reference, {
//         name,
//         email
//     })
// }
//Product CRUD
// const db = getDatabase(app)
// function addProduct(productId, productName, productDescription, productImg, productVariation, productAmount) {
//     const reference = ref(db, 'products/' + productId);
//     set(reference, {
//         productName,
//         productDescription,
//         productImg,
//         productVariation,
//         productAmount
//     })
// }

export { app, auth };