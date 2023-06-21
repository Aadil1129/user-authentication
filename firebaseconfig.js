import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4k-ujkJ52CUxm8tzbCCqJUsZaX26HO0E",
  authDomain: "todofirebase-4f1ab.firebaseapp.com",
  projectId: "todofirebase-4f1ab",
  storageBucket: "todofirebase-4f1ab.appspot.com",
  messagingSenderId: "350589989721",
  appId: "1:350589989721:web:c34ac2d2d0d245257f5248",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export default firebaseConfig;
