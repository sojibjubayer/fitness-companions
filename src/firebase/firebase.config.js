// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyA9NqQH6w1EutMgooinGRKkD1CS23JI4J0",
  authDomain: "fitness-companions.firebaseapp.com",
  projectId: "fitness-companions",
  storageBucket: "fitness-companions.appspot.com",
  messagingSenderId: "1045318531736",
  appId: "1:1045318531736:web:00f0569ccbb6950fe8eeed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;