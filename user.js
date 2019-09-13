"use strict";

/// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC922aYRfhFVYBeDHryrI1hQy287hL_0rw",
  authDomain: "movie-firebase0402.firebaseapp.com",
  databaseURL: "https://movie-firebase0402.firebaseio.com",
  projectId: "movie-firebase0402",
  storageBucket: "movie-firebase0402.appspot.com",
  messagingSenderId: "371912193337",
  appId: "1:371912193337:web:bc428ec77b749a9595a4e8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Firebase UI configuration
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '#home',
};
// Init Firebase UI Authentication
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen on authentication state change
function logIn1() {
  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = result.credential.accessToken;
    // The signed-in user info.
    let user = result.user;
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  });
  showPage("profile")
}

function logIn2() {
  let logPage = document.querySelector(".page2");
  logPage.style.display = "block";
  firebase.auth().onAuthStateChanged(function(user) {
    let tabbar = document.querySelector('#tabbar');
    console.log(user);
    if (user) { // if user exists and is authenticated
      setDefaultPage();
      tabbar.classList.remove("hide");
      logPage.style.display = "none";
      appendUserData(user);
    } else { // if user is not logged in
      showPage("login");
      tabbar.classList.add("hide");
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
  showPage("profle")
}
//sign out user
function logout() {
  firebase.auth().signOut();
  showPage("home")
}

function logInHide() {
  let hidePage = document.querySelector("#tabbar");
  hidePage.style.display = "none";
}

function appendUserData(user) {
  document.querySelector('#profile').innerHTML += `
    <h3>${user.displayName}</h3>
    <p>${user.email}</p>
  `;
}