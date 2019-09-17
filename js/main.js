'use strict';


function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

function showMovieLoader(show) {
  let loader = document.querySelector('#movieLoader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}


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
      initMovieRef();
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

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}



// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();


function openModal() {

}

// This handles the navigation
function toggleMenu() {
  let nav = document.querySelector(".hamburgerMenu");
  let ul = document.querySelector("nav > ul");
  if (nav.classList.contains("activeMenu")) {
    nav.classList.remove("activeMenu");
    ul.style.height = 0;
  } else {
    nav.classList.add("activeMenu");
    ul.classList.add("navigationActive");
    ul.style.height = ul.childElementCount * 52 + "px";
  }
}

function infoModal() {
  let htmlTemplate = ""
  htmlTemplate += `
    <div class="closeModal" onclick="infoModal()">
      <span></span>
      <span></span>
    </div>
        <div id="info-box">
        <h2 id="info-head">don't know what <br> movie to watch?</h2>
        <div class="info-down"><img id="info-random" src="img/shuffle.png">
        <p class="info-desc">Use this button to get a</p><p id="random-movie-info"> random movie </p><p class="info-desc">suggestion!</p>
        </div></div>
`;
  document.querySelector("#information").innerHTML = htmlTemplate;

  let info = document.querySelector("#information");

  if (info.classList.contains("information")) {

    info.classList.add("infoClose");

    setTimeout(function() {
      info.classList.remove("information");
      info.classList.remove("infoClose");
      info.style.display = "none";
    }, 1000);

  } else {
    info.classList.add("information");
    info.style.display = "block";
  }
}
//slideshow
function spoilerSpecific(id) {

  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    specificSpoiler(movies[id], id);
  });
  showPage('spoilers')
}


function specificSpoiler(movie, id) {
  console.log(movie);
  let htmlTemplate = "";
  htmlTemplate = `
  <button onclick="chosenMovie(${id})">Go Back</button>
    <article class="spoilerArticle">

      <h1>True or false</h1>
      <div class="spoilerGrid">
        <h2 class="statement">${movie.data().statement}</h2>
        <img src="${movie.data().img}">

      </div>
      <ul>
      ${loopAnswers(movie.data().answers)}
</ul>
    </article>
    `;

  document.querySelector("#spoilers").innerHTML = htmlTemplate;
}
function loopAnswers(spoilers){
  console.log(spoilers);
  let spoils = "";
  for (let spoiler of spoilers) {
    spoils += `<li>${spoiler}</li>`;
  }

      return spoils;
}
// watch the database ref for changes
let movies = [];
movieRef.onSnapshot(function(snapshotData) {
  movies = snapshotData.docs;
  appendMovies(movies);
  showLoader(false);
});

function chooseMovie(id) {
  movieRef.doc(id).get().then(function(doc){
    singleMovie(doc);
    showPage("specific");
  });
}

function initMovieRef() {




  // user's favourite movies
  userRef.doc(currentUser.uid).onSnapshot({
    includeMetadataChanges: true
  }, function(doc) {
    if (!doc.metadata.hasPendingWrites && doc.data()) {
      appendFavMovies(doc.data().favMovies);
    }
  });
}


function appendMovies(movies) {
  console.log(movies.length);
  let htmlTemplate = "";

  for (let movie of movies) {
    console.log(movie.data().title);
    let i = 0;
    console.log(i++);
    htmlTemplate += `

        <div class="swiper-slide">
          <div class="card">
            <div class="content">
            <div class="heart" onclick="heartIt(), addToFavourites('${movie.id}')"></div>
            <div class="heart2" onclick="heartIt(), removeFromFavourites('${movie.id}')"></div>
              <a href="#specific" onclick="chooseMovie('${movie.id}')">
              <img src="${movie.data().img}" alt="movie image1">
              </a>
              <div>
              <h2>${movie.data().title}</h2>
              <p>${movie.data().rating}</p>
              </div>

            </div>
          </div>
        </div>
`;
  };
  document.querySelector('.swiper-wrapper').innerHTML = htmlTemplate;

  initSlider()
};

function appendFavMovies(favMovieIds) {
  document.querySelector('#fav-movie-container').innerHTML = "";
  for (let movieId of favMovieIds) {
    movieRef.doc(movieId).get().then(function(movie) {
      document.querySelector('#fav-movie-container').innerHTML += `
        <article>
        <div class="fav-movie">
          <div id="cover-img">
          <div class="heart3" onclick="heartIt(), removeFromFavourites('${movie.id}')"></div>
            <img src="${movie.data().img}">
          </div>
          <div id="red-bottom">
            <h2 id="title">${movie.data().title}</h2>
            <p id="movie-rating">${movie.data().rating}</p>
          </div>
          </div>
        </article>
      `;
    });

  }
}




//search



function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredMovies = [];
  for (let movie of movies) {
    console.log(movie);
    console.log(searchQuery);

    let title = movie.data().title.toLowerCase();
    console.log(title);
    if (title.includes(searchQuery)) {
      filteredMovies.push(movie);
    }
  }
  console.log(filteredMovies);
  appendMovies(filteredMovies);
}
//filter
// Calling the random function from the HTML - inputting a random number
function randomNumber() {
  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    let movieNumber = movies.length - 1;
    let id = Math.floor(Math.random() * movieNumber);

    // After selecting the random number, we'll send the data from firebase to randomMovie()
    singleMovie(movies[id], id);
  });
  showPage("specific");
}

function chosenMovie(id) {
  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    // After selecting the random number, we'll send the data from firebase to randomMovie()
    singleMovie(movies[id], id);
  });
  showPage("specific");
}




// swiper
function initSlider() {
  var swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 900,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  });
}

function singleMovie(movie, id) {
  let title = movie.data().title;
  let description = movie.data().description;
  let rating = movie.data().rating;
  let img = movie.data().img;

  console.log(title, description, rating);
  // console.log(movies[number].data().title);
  let htmlTemplate = `
      <article class="specific-movie">
      <div class="image-wrap">
          <img src="${img}"/>
      </div>
      <section class="text-info">
        <div class="title-box">
            <h2 id="title" >${title}</h2>
            <img src="img/stars.png"/>
        </div>
        <div class="description-box">
          <div id="desc-box">
            <p>${description.split(".").splice(0,5).join(".")}</p>
            <p>rating: ${rating} / 5</p>
          </div>
            <div id="read-reviews">
              <div class="arrow"><img id="arrow-up" src="img/arrowdown.png" onclick="scrollArrowUp()"/>
              </div>
              <div class="review">
                <img src="img/stars.png"/><h3>Good Movie</h3>
                <p>Its pretty nice and I have <span id="dots">...</span><span id="more-review">no idea what to write here</span></p>
                <button class="read-more-btn" onclick="readMore()">Read More</button>
              </div>
              <div class="review">
                <img src="img/stars.png"/>
                <h3>I love this movie!</h3>
                <p>Its pretty nice and I have <span id="dots">...</span><span id="more-review2">no idea what to write here</span></p>
                <button class="read-more-btn" onclick="readMore2()">Read More</button>
              </div>
              <div class="review"><img src="img/stars.png"/><h3>Okay</h3>
                <p>Its pretty nice and I have <span id="dots">...</span><span id="more-review3">no idea what to write here</span></p>
                <button class="read-more-btn" onclick="readMore3()">Read More</button>
              </div>
              <div class="review"><img src="img/stars.png"/><h3>Good</h3>
                <p>Its pretty nice and I have <span id="dots">...</span><span id="more-review4">no idea what to write here</span></p>
                <button class="read-more-btn" onclick="readMore4()">Read More</button>
              </div>
          </div><div class="arrow"><img id="arrow-down" src="img/arrowdown.png" onclick="scrollArrow()"/>
          </div>
          </div>
         <div class = "buttons">
            <button class="trueorfalse" onclick="spoilerSpecific('${id}')">True or false</h3>
            <button class="watchmovie" onclick="">Watch movie</h3>
          </div>
      </section>

      </article>
    `;
  document.querySelector("#specific").innerHTML = htmlTemplate;
}



//function to make the content change when you click on the ARROW DOWN
function scrollArrow() {
  let description = document.getElementById("desc-box");
  let readReviews = document.getElementById("read-reviews");
  let arrowDown = document.getElementById("arrow-down");
  let arrowUp = document.getElementById("arrow-up");
  readReviews.style.display = "block";
  arrowUp.style.display = "block";
  arrowDown.style.display = "none";
  description.style.display = "none"
}

//function to make you go back to the previous content on the ARROW UP
function scrollArrowUp() {
  let description = document.getElementById("desc-box");
  let readReviews = document.getElementById("read-reviews");
  let arrowDown = document.getElementById("arrow-down");
  let arrowUp = document.getElementById("arrow-up");
  readReviews.style.display = "none";
  arrowUp.style.display = "none";
  arrowDown.style.display = "block";
  description.style.display = "block";
}

function readMore() {
  let moreRew = document.querySelector("#more-review");
  if (moreRew.style.display === "none") {
    moreRew.style.display = "block";
  } else {
    moreRew.style.display = "none"
  }
}

function readMore2() {
  let moreRew2 = document.querySelector("#more-review2");
  if (moreRew2.style.display === "none") {
    moreRew2.style.display = "block";
  } else {
    moreRew2.style.display = "none"
  }
}

function readMore3() {
  let moreRew3 = document.querySelector("#more-review3");
  if (moreRew3.style.display === "none") {
    moreRew3.style.display = "block";
  } else {
    moreRew3.style.display = "none"
  }
}

function readMore4() {
  let moreRew4 = document.querySelector("#more-review4");
  if (moreRew4.style.display === "none") {
    moreRew4.style.display = "block";
  } else {
    moreRew4.style.display = "none"
  }
}

function heartIt() {
  let heart = document.querySelector(".heart");
  let heart2 = document.querySelector(".heart2");
  if (heart2.style.display === "none") {
    heart2.style.display = "block";
    heart.style.display = "none"
  } else {
    heart2.style.display = "none";
    heart.style.display = "block";
  }
}
