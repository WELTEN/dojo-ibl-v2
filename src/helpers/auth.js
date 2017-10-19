import { ref, firebaseAuth } from '../fire'

export function auth (email, pw) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function loginGoogle () {
  var provider = new firebaseAuth.GoogleAuthProvider();
  return firebaseAuth().signInWithPopup(provider).then(function(result) {
      // if (result.credential) {
      //     // This gives you a Google Access Token. You can use it to access the Google API.
      // }
  });
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user) {
  // return ref.child(`users/${user.uid}/info`)
  //   .set({
  //     email: user.email,
  //     uid: user.uid
  //   })
  //   .then(() => user)
}
