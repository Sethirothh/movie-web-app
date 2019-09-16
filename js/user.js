"use strict";

/// Your web app's Firebase configuration
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
  let logPage = document.querySelector("#login");
  logPage.style.display = "block";
  firebase.auth().onAuthStateChanged(function(user) {
    let tabbar = document.querySelector('nav');
    console.log(user);
    if (user) { // if user exists and is authenticated
      setDefaultPage();
      tabbar.classList.remove("hide");
      logPage.style.display = "none";
      appendUserData(user);
    } else { // if user is not logged in
      showPage("profile");
      tabbar.classList.add("hide");
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
  showPage("profile")
}
//sign out user
function logout() {
  firebase.auth().signOut();
  showPage("home")
}

function logInHide() {
  let hidePage = document.querySelector("nav");
  hidePage.style.display = "none";
}

function appendUserData(user) {
  let htmlTemplate = "";
  htmlTemplate += `
  <div class="text-info">
    <h2 class="title-box">Your profile</h2>
    <div class="description-box">
    <img src="https://cdn3.iconfinder.com/data/icons/bitcoin-cryptocurrency/512/Icon_2-512.png" id="profile-img">
    <span></span>
    <input type='file' id="img" accept="image/*")" onchange="readURL(this);" />
    <h3 id="name">${user.displayName}</h3>
    </div>
    <span class="space"</span>
    <h2 class="title-box">Your scores</h2>
    <div class="description-box">
    <div class="score-board">
    <p id="total" class="float-left">Total</p>
    <img src="arrow.png" id="arrow" class="float-right" alt="arrow to the left" onclick="haveScore()">
    <p id="score" class="float-right">398 Points</p>
    </div>
    <div class="score-board-ext slide-in-top">
      <div class="score-board-row">
        <p class="movie">Forrest Gump</p>
        <p class="score">158 Points</p>
      </div>
      <div class="score-board-row">
        <p class="movie">Toy Story 4</p>
        <p class="score">75 Points</p>
      </div>
      <div class="score-board-row">
        <p class="movie">Lion King</p>
        <p class="score">165 Points</p>
      </div>
    </div>
    <button id="share-btn"><img src="share.png" id="share" alt="share image">Share</button>
  </div>
  `;
  document.querySelector('#profile').innerHTML = htmlTemplate
}

function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function(e) {
      $('#profile-img')
        .attr('src', e.target.result)
        .width(100)
        .height(100);
    };

    reader.readAsDataURL(input.files[0]);

  }
}

function haveScore() {
  let arrow = document.querySelector("#arrow");
  let score = document.querySelector(".score-board-ext");
  if (score.style.display === "none") {
    score.style.display = "block";
    arrow.classList.add('rotate-90-cw');
  } else {
    arrow.classList.remove("rotate-90-cw");
    score.style.display = "none"
  };
}
