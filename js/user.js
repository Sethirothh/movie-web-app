// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBvQMiSGejyFER7PpjonSTSgQvsLOHNj9g",
  authDomain: "movieswebapp-b84db.firebaseapp.com",
  databaseURL: "https://movieswebapp-b84db.firebaseio.com",
  projectId: "movieswebapp-b84db",
  storageBucket: "movieswebapp-b84db.appspot.com",
  messagingSenderId: "805404101375",
  appId: "1:805404101375:web:d6fe85e938f04f82fc9aca"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore();
const movieRef = db.collection("movies");
const userRef = db.collection("users");
let currentUser;


const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: '#profile',
};
// Init Firebase UI Authentication
const ui = new firebaseui.auth.AuthUI(firebase.auth());

function logIn() {
  firebase.auth().onAuthStateChanged(function(user) {
    let header = document.querySelector('header');
    currentUser = user;
    console.log(currentUser);
    if (user) { // if user exists and is authenticated
      setDefaultPage();
      header.classList.remove("hide");
      appendUserData(user);
    } else { // if user is not logged in
      showPage("login");
      header.classList.add("hide");
      ui.start('#firebaseui-auth-container', uiConfig);
    }
  });
  showPage("profile");
}

//sign out user
function logout() {
  firebase.auth().signOut();
  showPage("home")
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
    <img src="img/arrowdown.png" id="arrow" class="float-right" alt="arrow to the left" onclick="haveScore()">
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
    <button id="share-btn"><img src="img/share.png" id="share" alt="share image">Share</button>
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

function addToFavourites(movieId) {
  userRef.doc(currentUser.uid).set({
    favMovies: firebase.firestore.FieldValue.arrayUnion(movieId)
  }, {
    merge: true
  });
}

// removes a given movieId to the favMovies array inside currentUser
function removeFromFavourites(movieId) {
  userRef.doc(currentUser.uid).update({
    favMovies: firebase.firestore.FieldValue.arrayRemove(movieId)
  });
}
