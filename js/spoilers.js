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
  <button onclick="chosenMovie(${id})">Go Back</button>
    <article class="spoilerArticle">

      <h1>True or false</h1>
      <div class="spoilerGrid">
        <h2 class="statement">${movie.data().statement}</h2>
        <img src="${movie.data().img}">

      </div>
      <ul class="answers">
        <li>Answer1</li>
        <li>Answer1</li>
        <li>Answer1</li>
      </ul>
    </article>
    `;
  document.querySelector("#spoilers").innerHTML = htmlTemplate;
}
