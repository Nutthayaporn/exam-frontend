import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB5-oJgH2jxbenRkQHmD7itk-sldgVSomw",
  authDomain: "practices-2018.firebaseapp.com",
  databaseURL: "https://practices-2018.firebaseio.com",
  projectId: "practices-2018",
  storageBucket: "practices-2018.appspot.com",
  messagingSenderId: "985546565279",
  appId: "1:985546565279:web:0afc36514fcf6dbe1a24aa"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database();