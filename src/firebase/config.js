import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC6TAGUymcZHEHGZHBJmm4msmj3Arl5VfA',
  authDomain: 'miniblog-react-f2e23.firebaseapp.com',
  projectId: 'miniblog-react-f2e23',
  storageBucket: 'miniblog-react-f2e23.appspot.com',
  messagingSenderId: '690411629556',
  appId: '1:690411629556:web:084acbc67399998539e7a1',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();

export { db };
