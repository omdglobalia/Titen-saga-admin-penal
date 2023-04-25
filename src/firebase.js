import firebase from 'firebase/compat/app';
import "firebase/compat/database";
import { getStorage } from 'firebase/storage';

const fbConfig = {
  // apiKey: "AIzaSyA2WpJiPEr_bE5bvPKLj5FG1nOu3mWzxy0",
  // authDomain: "react-coursetask.firebaseapp.com",
  // databaseURL: "https://react-coursetask-default-rtdb.firebaseio.com",
  // projectId: "react-coursetask",
  // storageBucket: "react-coursetask.appspot.com",
  // messagingSenderId: "767617770492",
  // appId: "1:767617770492:web:bb66746422ade502750879"

  apiKey: "AIzaSyDxzWt3AHPgqZCWBOl8l6RvK70pdUpONoY",
  authDomain: "titan-909eb.firebaseapp.com",
  projectId: "titan-909eb",
  storageBucket: "titan-909eb.appspot.com",
  messagingSenderId: "912366163631",
  appId: "1:912366163631:web:6f6a88b2f614c122a0265a"

};

const fireDB = firebase.initializeApp(fbConfig);
const db = fireDB.database().ref();
export default db
export const storage = getStorage(fireDB);
