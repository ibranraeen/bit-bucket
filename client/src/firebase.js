import firebase from "firebase"

const firebaseConfig = {
  your-config-file here
  };

    const firebaseApp = firebase.initializeApp(firebaseConfig);
    const db = firebaseApp.firestore();
    const storage = firebase.storage();
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
  export { db, storage, auth, provider }
