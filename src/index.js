import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bulma/css/bulma.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Archivo CSS de Bootstrap 4 
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
 

firebase.initializeApp({
  apiKey: "AIzaSyATTijYL4HnfwNvN-geedULKrwZXV7TZR0",
  authDomain: "ieserec.firebaseapp.com",
  projectId: "ieserec",
  storageBucket: "ieserec.appspot.com",
  messagingSenderId: "398807098345",
  appId: "1:398807098345:web:1360eb43de7ecc8371e178",
  measurementId: "G-T29RX82ENR"

  
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
