import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import "firebase/auth";

var firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyB09G2SL1m8z8gRqiqn4EYz-1KQO0ktVk8",
    authDomain: "hackuci2021-2f7cb.firebaseapp.com",
    projectId: "hackuci2021-2f7cb",
    storageBucket: "hackuci2021-2f7cb.appspot.com",
    messagingSenderId: "881712526742",
    appId: "1:881712526742:web:3284e88b125c896a9f99b7"
  });
  
  class Fire {
    

      getCollection = (collection) => {
          return firebase.firestore().collection(collection);
      }
  
      // Used for realtime database
      getRef = (reference) => {
          return firebase.database().ref(reference);
      }

      getStorage = () =>{
          return firebase.storage().ref();
      }
  
      off() {
          this.ref.off();
      }
      getTime = () =>{
        return firebase.firestore.Timestamp.now();
    }
  }
  
  Fire.db = new Fire();
  export const auth = firebaseConfig.auth();
  export default Fire;