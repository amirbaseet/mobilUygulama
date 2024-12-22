// Firebase'i başlatmak için Firebase Config'i kullanıyoruz
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// FireStore
import 'firebase/compat/firestore';

// Kendi firebaseConfig değerlerinizi kopyala/yapıştır yapın. Yoksa uygulama çalışmaz.
const firebaseConfig = {
  apiKey: "AIzaSyDeQT3OZAOaxyjjamae9bS8LLg-xaL7918",
  authDomain: "mobil-todo-list-51f79.firebaseapp.com",
  projectId: "mobil-todo-list-51f79",
  storageBucket: "mobil-todo-list-51f79.firebasestorage.app",
  messagingSenderId: "70183092508",
  appId: "1:70183092508:web:68f24a16c2b1f9dcdbbad9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

// Firebase Storeage için
export const firestore = firebase.firestore();