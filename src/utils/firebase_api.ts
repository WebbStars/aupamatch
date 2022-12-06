// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAp-2bnoS0nDoMAfpdB_IuDWG2kI6BcKiI',
  authDomain: 'aupamatchauth.firebaseapp.com',
  projectId: 'aupamatchauth',
  storageBucket: 'aupamatchauth.appspot.com',
  messagingSenderId: '674727245242',
  appId: '1:674727245242:web:9a2c1e7b70ea28763ad983',
  measurementId: 'G-6WZGJF4Z0L'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
getAnalytics(app)

const auth = getAuth()
const createUser = createUserWithEmailAndPassword
const normalLogin = signInWithEmailAndPassword
const login = signInWithPopup
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

export {
  auth,
  createUser,
  normalLogin,
  login,
  googleProvider,
  GoogleAuthProvider,
  facebookProvider,
  FacebookAuthProvider
}
