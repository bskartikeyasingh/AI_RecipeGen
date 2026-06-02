import { initializeApp }
from "firebase/app";

import {

  getAuth,

  GoogleAuthProvider

} from "firebase/auth";

// ====================================
// FIREBASE CONFIG
// ====================================

const firebaseConfig = {

  apiKey: "AIzaSyCL6kQ9RRTPdpqS2eouDFvakbwR2hpHyn0",

  authDomain:
    "ai-recipe-generator-698a9.firebaseapp.com",

  projectId:
    "ai-recipe-generator-698a9",

  storageBucket:
    "ai-recipe-generator-698a9.firebasestorage.app",

  messagingSenderId:
    "571374792488",

  appId:
    "1:571374792488:web:a3513a8ada4567cbff2a1d"
};

// ====================================
// INITIALIZE
// ====================================

const app = initializeApp(
  firebaseConfig
);

// ====================================
// AUTH
// ====================================

export const auth =
  getAuth(app);

export const provider =
  new GoogleAuthProvider();