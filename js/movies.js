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

// watch the database ref for changes
movieRef.onSnapshot(function(snapshotData) {
  let movies = snapshotData.docs;
  appendMovies(movies);
  setTimeout(function () {
    showLoader(false);
  }, 1000);
});

function appendMovies(movies) {
  console.log(movies.length);
  let htmlTemplate = "";

  for (let movie of movies) {
    console.log(movie.data().title);
    htmlTemplate += `

        <div class="swiper-slide">
          <div class="card">
            <div class="content">

              <img src="${movie.data().img}" alt="movie image1">
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
};

//search

function search(value) {
  let searchQuery = value.toLowerCase();
  let filteredMovies = [];
  let movies = [];
  for (let movie of movies) {
    let title = movie.data().title.toLowerCase();
    if (title.includes(searchQuery)) {
      filteredMovies.push(movie);
    };
  };
  console.log(filteredMovies);
  appendMovies(filteredMovies);
};
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

function chosenMovie(id){
  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    singleMovie(movies[id], id);
  });

  showPage("specific");
}
// randomMovie() processes the data and appends it to the DOM



// swiper

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
