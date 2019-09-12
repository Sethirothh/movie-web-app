
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
  });


  function appendMovies(movies) {
    console.log(movies.length);
    for (var i = 0; i < movies.length; i++) {
      console.log(movies[i].data().title);

    }
  }
function randomNumber(){
  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    let movieNumber = movies.length - 1;
    let id = Math.floor(Math.random() * movieNumber);
    randomMovie(movies[id]);
  });
  showPage("specific");
}

function randomMovie(movie){
  let title = movie.data().title;
  let description = movie.data().description;
  let rating = movie.data().rating;
  console.log(title);
  // console.log(movies[number].data().title);
}
//Adi , work in here with the movie slider :)

var swiper = new Swiper('.swiper-container', {
   effect: 'coverflow',
   grabCursor: true,
   centeredSlides: true,
   slidesPerView: 'auto',
   coverflowEffect: {
     rotate: 20,
     stretch: 0,
     depth: 600,
     modifier: 1,
     slideShadows : true,
   },
   pagination: {
     el: '.swiper-pagination',
   },
 });
