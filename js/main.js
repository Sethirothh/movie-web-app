'use strict';

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

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}


// This code runs a loader if the parameter contains the boolean of true
function showLoader(show) {
  let loader = document.querySelector("#loader");
  // if show == true , remove hide class from #loader
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
} // Author: Jesper

// This handles the navigation
function toggleMenu() {
  let nav = document.querySelector(".hamburgerMenu");
  let ul = document.querySelector("nav > ul");
  // Check if the menu is active, if it is, close it, if it isn't open it.
  if (nav.classList.contains("activeMenu")) {
    nav.classList.remove("activeMenu");
    ul.style.height = 0;
  } else {
    nav.classList.add("activeMenu");
    ul.classList.add("navigationActive");
    ul.style.height = ul.childElementCount * 52 + "px";
  }
} // Author: Jesper

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

// Variables to the different firestores and collections
const db = firebase.firestore();
const movieRef = db.collection("movies");
const userRef = db.collection("users");
let currentUser;

// The uiconfig for the authentication of user-logins
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  signInSuccessUrl: "#profile",
};
// Init Firebase UI Authentication
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// This is the function calling the login system. Checking if the user is logged in before showing.
function logIn() {
  firebase.auth().onAuthStateChanged(function(user) {
    let header = document.querySelector("header");
    currentUser = user;
    console.log(currentUser);
    if (user) { // if user exists and is authenticated
      setDefaultPage();
      header.classList.remove("hide");
      appendUserData(user);
      initMovieRef();
    } else { // if user is not logged in
      showPage("login");
      header.classList.remove("hide");
      ui.start("#firebaseui-auth-container", uiConfig);
    }
  });
  showPage("profile");
} // Author: Karolina

//sign out user
function logout() {
  firebase.auth().signOut();
  showPage("home")
} // Author: Karolina


// This is the function for taking the data of the loged in user and displaying it on the profile page
function appendUserData(user) {
  let htmlTemplate = "";
  htmlTemplate += `
    <div class="text-info">
      <h2 class="title-box2">Your profile</h2>
      <div class="description-box2">
      <img src="img/profile2.png" id="profile-img">
      <span></span>
      <input type="file" id="img" accept="image/*")" onchange="readURL(this);" />
      <h3 id="name">${user.displayName}</h3>
      </div>
      <span class="space"</span>
      <h2 class="title-box2">Your scores</h2>
      <div class="description-box2">
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
    <a class="right" href="#" onclick="logout()">Logout</a>
    `;
  document.querySelector("#profile").innerHTML = htmlTemplate
} // Author: Karolina


// This function responsible for showing images from user's computer to the profile icon
function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function(e) {
      $("#profile-img")
        .attr("src", e.target.result)
        .width(100)
        .height(100);
    };

    reader.readAsDataURL(input.files[0]);

  }
} // Author: Karolina


// This code is showing extended score board on the profile page
function haveScore() {
  let arrow = document.querySelector("#arrow");
  let score = document.querySelector(".score-board-ext");
  if (score.style.display === "none") {
    score.style.display = "block";
    arrow.classList.add("rotate-90-cw");
    }
    else {
      arrow.classList.remove("rotate-90-cw");
      score.style.display = "none"
    };
  } // Author: Karolina


  let movies = [];
  // Making a global variable and after that calling the database.collection
  // Putting every movie inside of the global variable with movies = snapshotData
  movieRef.onSnapshot(function(snapshotData) {
    movies = snapshotData.docs;
    // Calling appendMovies with the parameter movies to parse the movies
    appendMovies(movies);
    // Closing the loader when the function has been run, essentially making the site only show when loaded.
    showLoader(false);
  }); // Author: Jesper

  // Function responsible for redirecting not logged in user from favourites page to the log in
  function heart() {
    firebase.auth().onAuthStateChanged(function(user) {
      let header = document.querySelector("header");
      currentUser = user;
      if (currentUser) { // if user exists and is authenticated
        showPage("favourites");
      } else { // if user is not logged in
        showPage("login");
        ui.start("#firebaseui-auth-container", uiConfig);
      }
    });
  } // author : Karolina + Jesper

  //adding a movie to favorites if the user is logged in
  function addToFavourites(movieId) {
    firebase.auth().onAuthStateChanged(function(user) {
      let header = document.querySelector("header");
      currentUser = user;
      console.log(currentUser);
      if (currentUser) { // if user exists and is authenticated
        userRef.doc(currentUser.uid).set({
          favMovies: firebase.firestore.FieldValue.arrayUnion(movieId)
        }, {
          merge: true
        });
      } else { // if user is not logged in
        showPage("login");
        header.classList.remove("hide");
        ui.start("#firebaseui-auth-container", uiConfig);
      }
    });
  }


  // removes a given movieId to the favMovies array inside currentUser
  function removeFromFavourites(movieId) {
    userRef.doc(currentUser.uid).update({
      favMovies: firebase.firestore.FieldValue.arrayRemove(movieId)
    });
  }


  function infoModal() {

    //htmlTemplate giving the information box syntax for information
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
    //Author Martine


    let info = document.querySelector("#information");
    // Check if it's open, if it is, close it, if it isn't, open it.
    if (info.classList.contains("information")) {

      info.classList.add("infoClose");
      // When you close it, to make sure the animation shows - there's a setTimeout on the display:none;
      setTimeout(function() {
        info.classList.remove("information");
        info.classList.remove("infoClose");
        info.style.display = "none";
      }, 1000);
    } else {
      //If it isn't open, show it with display block and add the information class to toggle the keyframes.
      // keyframes can be found in the animations section @css and .information class calls it.
      info.classList.add("information");
      info.style.display = "block";
    }
  } // Author: Jesper
  //slideshow
  function spoilerSpecific(id) {
    // Taking the spoilerSpecific with the id-parameter and parsing it
    movieRef.onSnapshot(function(snapshotData) {
      let movies = snapshotData.docs;
      // Using the parameter id and the variable movies to append the movies to specificSpoiler()
      specificSpoiler(movies[id], id);
    });
    showPage("spoilers")
  } // Author: Jesper + Adi



  //creting the Spoilers page
  function specificSpoiler(movie, id) {
    console.log(movie);
    let htmlTemplate = "";
    htmlTemplate = `
  <button onclick="chosenMovie('${id}')">Go Back</button>
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
    //looping the spoilers from the database array

    document.querySelector("#spoilers").innerHTML = htmlTemplate;
  } //Author: Adi

  function loopAnswers(spoilers) {
    // We're taking the parameter spoilers and logging to see what information we get.
    console.log(spoilers);
    // After logging we'll call an empty variable.
    let spoils = "";
    for (let spoiler of spoilers) {
      spoils += `<li>${spoiler}</li>`;
    }
    // After filling the variable with spoilers with a forof loop, we return spoils to where the function is called.
    // This function is called in the singeMovie()
    return spoils;
  } // Author: Jesper
  // watch the database ref for changes


  function chooseMovie(id) {
    // We parse the id in the function chooseMovie from the appendMovies().
    // The appendMovies contain a class with chooseMovie on the link, giving the id of an element.
    // Then we'll call firebase and get what's inside of the document in the database.
    movieRef.doc(id).get().then(function(doc) {
      singleMovie(doc);
      // Then we parse it into singleMovie() and then show the page.
      showPage("specific");
    });
  } // Author: Jesper + Adi

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

  //Appending movies to the DOM
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
              <a href="#specific" onclick="chooseMovie('${movie.id}'), closeSearch()">
              <img src="${movie.data().img}" alt="movie image1">
              </a>
              <div class="title_stars">
              <h2>${movie.data().title}</h2>
              <img class="stars" src="img/stars.png"/>
              </div>
            </div>
          </div>
        </div>
`;
      //movie.data().title is taking the title of the movie from firebase, also with the img.
    };
    document.querySelector(".swiper-wrapper").innerHTML = htmlTemplate;
    initSlider();
  };

  // Author: Adi + Karolina(heart function)


  //Appending movies to the favorites page if the user clicks on the heart
  function appendFavMovies(favMovieIds) {
    document.querySelector("#fav-movie-container").innerHTML = "";
    for (let movieId of favMovieIds) {
      movieRef.doc(movieId).get().then(function(movie) {
        document.querySelector("#fav-movie-container").innerHTML += `
        <article>
          <div class="heart3" onclick="heartIt(), removeFromFavourites('${movie.id}')"></div>
          <div id="cover-img">
            <img src="${movie.data().img}">
          </div>
          <div id="red-bottom" onclick="chooseMovie("${movie.id}")">
            <h2 id="title">${movie.data().title} >>></h2>
            <img class="stars" src="img/stars.png" id="movie-rating">
          </div>
          </div>
        </article>
      `;
      });
    }
  } // Author: Adi + Karolina(heart function)


  //search


  //Searching the moviesby the title from the(even if the user is writing it in lowercase), then pushing the movie to the filteredMovies array
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
  } //Author: Adi



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
  } // Author: Jesper

  function chosenMovie(id) {
    movieRef.onSnapshot(function(snapshotData) {
      let movies = snapshotData.docs;
      // After selecting the random number, we'll send the data from firebase to randomMovie()
      singleMovie(movies[id], id);
    });
    showPage("specific");
  } // Author: Jesper




  // swiper initialization
  function initSlider() {
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 900,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });
  } //Author: Adi

  function singleMovie(movie, id) {
    let title = movie.data().title;
    let description = movie.data().description;
    let rating = movie.data().rating;
    let img = movie.data().img;
    console.log(title, description, rating);
    // console.log(movies[number].data().title);
    //Appending the data to the DOM with use of backtick string:
    let htmlTemplate = `
      <article class="specific-movie">
      <div class="image-wrap">
          <img src="${img}"/>
      </div>
      <section class="text-info">
        <div class="title-box">
            <h2 id="title" >${title}</h2>
            <img class="stars" src="img/stars.png"/>
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
  //Author Martine


  //function to change the content (reviews) when you click on the ARROW DOWN
  function scrollArrow() {
    //create varibles and get the data from the HTML
    let description = document.getElementById("desc-box");
    let readReviews = document.getElementById("read-reviews");
    let arrowDown = document.getElementById("arrow-down");
    let arrowUp = document.getElementById("arrow-up");
    //changes the styling when the img is clicked:
    readReviews.style.display = "block";
    arrowUp.style.display = "block";
    arrowDown.style.display = "none";
    description.style.display = "none"
  }
  //Author Martine

  //function to make you go back to the previous content(description) on the ARROW UP
  function scrollArrowUp() {
    //create varibles and get the data from the HTML
    let description = document.getElementById("desc-box");
    let readReviews = document.getElementById("read-reviews");
    let arrowDown = document.getElementById("arrow-down");
    let arrowUp = document.getElementById("arrow-up");
    //changes the styling when the other img is clicked:
    readReviews.style.display = "none";
    arrowUp.style.display = "none";
    arrowDown.style.display = "block";
    description.style.display = "block";
  }
  //Author Martine

  // function for expanding reviews
  function readMore() {
    let moreRew = document.querySelector("#more-review");
    if (moreRew.style.display === "none") {
      moreRew.style.display = "block";
    } else {
      moreRew.style.display = "none"
    }
  } // Author: Karolina

  function readMore2() {
    let moreRew2 = document.querySelector("#more-review2");
    if (moreRew2.style.display === "none") {
      moreRew2.style.display = "block";
    } else {
      moreRew2.style.display = "none"
    }
  } // Author: Karolina

  function readMore3() {
    let moreRew3 = document.querySelector("#more-review3");
    if (moreRew3.style.display === "none") {
      moreRew3.style.display = "block";
    } else {
      moreRew3.style.display = "none"
    }
  } // Author: Karolina

  function readMore4() {
    let moreRew4 = document.querySelector("#more-review4");
    if (moreRew4.style.display === "none") {
      moreRew4.style.display = "block";
    } else {
      moreRew4.style.display = "none"
    }
  } // Author: Karolina


  // This code is for turning the heart red and back to white after to click on it (when you want to add/remove movie from the favourites)
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
  } // Author: Karolina


function closeSearch(){
  document.querySelector(".filter label").style.display = "none";
}
function openSearch() {
  document.querySelector(".filter label").style.display = "block";
}
