function spoilerSpecific(id){

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
    <article>
    <button onclick="chosenMovie(${id})">Go Back</button>
    <h1>True or false</h1>
    <h2>${movie.data().statement}</h2>
      </article>
    `;
  document.querySelector("#spoilers").innerHTML = htmlTemplate;
}
