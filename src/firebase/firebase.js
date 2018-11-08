import firebase from "firebase/app"
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDRZk6fGYfiWqfSCZG1fbOqgYGFkObkbN0",
    authDomain: "demathlon.firebaseapp.com",
    databaseURL: "https://demathlon.firebaseio.com",
    projectId: "demathlon",
    storageBucket: "demathlon.appspot.com",
    messagingSenderId: "325479144483"
  };
 
firebase.initializeApp(config);


const auth = firebase.auth();

function isAuthenticated () {
  return !!auth.currentUser;
};
export {auth,firebase,isAuthenticated}
