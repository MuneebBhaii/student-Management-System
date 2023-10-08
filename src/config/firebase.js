import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAixa-fYGEjPWMpi2B2pbFEswSl3VUJv8U",
  authDomain: "fir-web-70b6f.firebaseapp.com",
  projectId: "fir-web-70b6f",
  storageBucket: "fir-web-70b6f.appspot.com",
  messagingSenderId: "135349629762",
  appId: "1:135349629762:web:3dc1c8dba128dee9248edb",
  measurementId: "G-ELWRN80LCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
export {app,auth,firestore, analytics}