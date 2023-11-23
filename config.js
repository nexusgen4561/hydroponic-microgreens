import firebase from 'firebase/compat/app'
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBfJwk62EZF8Flw5o54M-seAI45jU9EUzg",
    authDomain: "temphumidityapp-4959a.firebaseapp.com",
    databaseURL: "https://temphumidityapp-4959a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "temphumidityapp-4959a",
    storageBucket: "temphumidityapp-4959a.appspot.com",
    messagingSenderId: "271639484008",
    appId: "1:271639484008:web:843fc1ab7361c194f40ddd"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const storage = getStorage(app)
export { db, app, storage }