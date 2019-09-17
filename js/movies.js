
// watch the database ref for changes
let movies = [];
movieRef.onSnapshot(function(snapshotData) {
movies = snapshotData.docs;
  appendMovies(movies);
  showLoader(false);
});


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
            

              <img src="${movie.data().img}" alt="movie image1">
              <div>
              <h2>${movie.data().title}</h2>
              <p>${movie.data().rating}</p>
              <button onclick="addToFavourites('${movie.id}')">Add to favourites</button>
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
          <h2>${movie.data().title}</h2>
          <img src="${movie.data().img}">
          <p>${movie.data().description}</p>
          <button onclick="removeFromFavourites('${movie.id}')">Remove from favourites</button
        </article>
      `;
    });

  }
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






// swiper
function initSlider(){
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


// function heartIt(){
//   let heart = document.querySelector(".heart");
//   let heart2 = document.querySelector(".heart2");
//   if (heart.style.display==="block") {
//     heart2.style.display="block";
//     heart.style.display="none"
//   } else {
//     heart2.style.display="none";
//     heart.style.display="block";
//   }
// }
