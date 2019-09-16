

movieRef.onSnapshot(function(snapshotData) {
  let movies = snapshotData.docs;
  specificSpoiler(movies[4]);
});

function specificSpoiler(movie) {

  let htmlTemplate = "";
  htmlTemplate = `
    <article>
    <h1>True or false</h1>
    <h2>${movie.data().statement}</h2>
      </article>
    `;
  document.querySelector("#spoilers").innerHTML += htmlTemplate;
}
