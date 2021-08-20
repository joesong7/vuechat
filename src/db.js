
import firebase from "firebase/app";
import "firebase/database";
const config ={
    //API key
    apiKey: "AIzaSyD6Vj0eprhzin6vXIhTVmOcQIW7AZDMiL4",
    authDomain: "vuechat-17508.firebaseapp.com",
    projectId: "vuechat-17508",
    storageBucket: "vuechat-17508.appspot.com",
    messagingSenderId: "1041631255663",
    appId: "1:1041631255663:web:43f4cb9ca66eb4ba39419a",
  
}

const db = firebase.initializeApp(config);

export default db;