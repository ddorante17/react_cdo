// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRuKa5ajWEJLC1E8gv42LOG956E5-dNPs",
    authDomain: "cdocssreact.firebaseapp.com",
    projectId: "cdocssreact",
    databaseURL: "https://cdocssreact-default-rtdb.firebaseio.com",
    storageBucket: "cdocssreact.appspot.com",
    messagingSenderId: "41161484700",
    appId: "1:41161484700:web:6882cf7a74b42b35d14059",
    measurementId: "G-SK4JCMSC5S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);
export {auth, storage};
export default db;
