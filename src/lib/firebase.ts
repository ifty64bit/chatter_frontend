// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7lbS10LlefhborvaqJQEUaFl91RzMJsU",
    authDomain: "chatter-fd06e.firebaseapp.com",
    projectId: "chatter-fd06e",
    storageBucket: "chatter-fd06e.appspot.com",
    messagingSenderId: "717882493686",
    appId: "1:717882493686:web:46a99e9e01f982e93b7ad7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported() ?? getAnalytics(app);
export const auth = getAuth(app);
