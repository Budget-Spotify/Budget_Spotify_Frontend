import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import 'dotenv/config'
const firebaseConfig = {
    apiKey: "AIzaSyBOR0GGxF4Oyd9iu7I-V3zJpalnvk5Rhmc",
    authDomain: "budget-spotify.firebaseapp.com",
    projectId: "budget-spotify",
    storageBucket: "budget-spotify.appspot.com",
    messagingSenderId: "573482884078",
    appId: "1:573482884078:web:d59cd5535e2b5db6b74cff",
    measurementId: "G-W1S26TEF9K"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;