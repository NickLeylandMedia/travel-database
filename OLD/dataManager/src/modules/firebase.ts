// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCRt1gz81wbOusxn9w2sJ-w5bmJ8yykqwg',
  authDomain: 'travel-database-df828.firebaseapp.com',
  projectId: 'travel-database-df828',
  storageBucket: 'travel-database-df828.appspot.com',
  messagingSenderId: '631670466205',
  appId: '1:631670466205:web:a24791599e5f08c1549674',
  measurementId: 'G-HD5PBEKZ35',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ********** AUTHENTICATION ********** //
const logInWithEmail = async (email: string, password: string) => {
  const auth = getAuth();
  console.log('Logging in with email and password...');
  console.log(email, password);
  try {
    const action = await signInWithEmailAndPassword(auth, email, password);

    return await action.user;
  } catch (error) {
    console.error(error);
    return alert(error);
  }
};

export { logInWithEmail };
