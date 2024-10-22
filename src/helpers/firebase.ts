import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBhBmi5jGbmI_fI0t9UFOHYmuPEXfe4kOs",
  authDomain: "swift-wiki.firebaseapp.com",
  projectId: "swift-wiki",
  storageBucket: "swift-wiki.appspot.com",
  messagingSenderId: "1082280958088",
  appId: "1:1082280958088:web:90fc501d4b3686ea82e73d"
};  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;