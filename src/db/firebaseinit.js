import firebase from 'firebase'
import config from './firebaseConfig'
import 'firebase/firestore'

  const firebaseApp = firebase.initializeApp(config);
 
  //const firestore = firebase.firestore();
  
  firebase.firestore()

export default firebaseApp.firestore()


