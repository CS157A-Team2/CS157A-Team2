import * as firebase from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyD0OXQbZSSlcNdZ99qLtvpb7WI8Qj5EXE4",
  authDomain: "bookstore-9f5ae.firebaseapp.com",
  databaseURL: "https://bookstore-9f5ae.firebaseio.com",
  projectId: "bookstore-9f5ae",
  storageBucket: "",
  messagingSenderId: "465713866249",
  appId: "1:465713866249:web:ad142e2807fcc4b2d7bad8",
  measurementId: "G-G86ZWRW60G"
};

export default firebase.initializeApp(firebaseConfig);