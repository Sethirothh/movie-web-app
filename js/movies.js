
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
  htmlTemplate = ""
    for (let movie of movies) {
      console.log(movie.id);
htmlTemplate += `

        <div class="swiper-slide">
          <div class="card">
            <div class="content">
              <img src="${movie.data().img}" alt="movie image1">
            </div>
          </div>
        </div>
`
    }
      document.querySelector('#user-container').innerHTML = htmlTemplate;
  }

  // Calling the random function from the HTML - inputting a random number
function randomNumber(){
  movieRef.onSnapshot(function(snapshotData) {
    let movies = snapshotData.docs;
    let movieNumber = movies.length - 1;
    let id = Math.floor(Math.random() * movieNumber);

    // After selecting the random number, we'll send the data from firebase to randomMovie()
    randomMovie(movies[id]);
  });
  showPage("specific");
}
// randomMovie() processes the data and appends it to the DOM
function randomMovie(movie){
  let title = movie.data().title;
  let description = movie.data().description;
  let rating = movie.data().rating;
  let img = movie.data().img;

  console.log(title, description, rating);
    // console.log(movies[number].data().title);
    let htmlTemplate = `
      <article class="specific-movie">
      <img src="${img}"/>
      <section class="text-info">
        <h2>${title}</h2>
        <p>${description}</p>
        <p>rating: ${rating} / 5</p>

      </section>
      </article>
    `;
    document.querySelector("#specific").innerHTML = htmlTemplate;
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
