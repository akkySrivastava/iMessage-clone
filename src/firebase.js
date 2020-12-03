import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyD85ahvmn7DsjJyTJvPWRlNzriKwypsoIc",
    authDomain: "imessage-clone-akky.firebaseapp.com",
    projectId: "imessage-clone-akky",
    storageBucket: "imessage-clone-akky.appspot.com",
    messagingSenderId: "553982143637",
    appId: "1:553982143637:web:355a23474faaea04cebf9c",
    measurementId: "G-821EELRD5P"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider}
  export default db;
