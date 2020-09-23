import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyB4cPluhQQRyDCLItsYoq-7TARHUNU80TE",
  authDomain: "whatsapp-clone-83b62.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-83b62.firebaseio.com",
  projectId: "whatsapp-clone-83b62",
  storageBucket: "whatsapp-clone-83b62.appspot.com",
  messagingSenderId: "694670528749",
  appId: "1:694670528749:web:5a7d0f2dfe72ae8648bce4",
  measurementId: "G-QNJV9Q4KXE",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const database = firebaseApp.firestore();
const authentication = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { authentication, provider };
export default database; //use this more so export as default
