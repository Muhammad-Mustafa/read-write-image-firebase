import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBmwjNr9pzagjCAcs4_L0-ttVu6far6CAI",
  authDomain: "read-write-pictures.firebaseapp.com",
  databaseURL: "https://read-write-pictures.firebaseio.com",
  projectId: "read-write-pictures",
  storageBucket: "read-write-pictures.appspot.com",
  messagingSenderId: "869602270138",
  appId: "1:869602270138:web:481ed323b67d39c0191b83"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
