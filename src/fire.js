import firebase from 'firebase'
import Rebase from 're-base';

var config = {
    apiKey: "AIzaSyBRRKRZ068429qJphWdbrOd8oyLY6zPgCU",
    authDomain: "dojo-ibl.firebaseapp.com",
    databaseURL: "https://dojo-ibl.firebaseio.com",
    projectId: "dojo-ibl",
    storageBucket: "dojo-ibl.appspot.com",
    messagingSenderId: "518897628174"
  };

export const fire = firebase.initializeApp(config);

export const db = firebase.database();

export const fireba = firebase;

export const auth = firebase.auth(); //the firebase auth namespace

export const firebaseAuth = firebase.auth;

export default fire;

export const base = Rebase.createClass(db);
