
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

movieRef.onSnapshot(function(snapshotData) {
  let movies = snapshotData.docs;
  appendMovies(movies);
});

function specificSpoiler(movie) {

  let htmlTemplate = `
    <article>
    <h1>True or false</h1>
    <h2>${movie.data().statement}</h2>
      </article>
    `;
  document.querySelector("#spoilers").innerHTML += htmlTemplate;
}

specificSpoiler(movie);
