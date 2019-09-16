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
        <h2 id="title-box" >${title}</h2>
        <p class="description-box">${description.split(".").splice(0,5).join(".")}</p>
        <p>rating: ${rating} / 5</p>
        <div class = "buttons">
           <button class="trueorfalse" onclick="spoilerSpecific('${id}')">True or false</h3>
           <button class="watchmovie" onclick="">Watch movie</h3>
         </div>
         <div class="review"><img src="img/stars.png"/><h3>Good Movie</h3>
         <p>Its pretty nice</p></div>
         <div class="review"><img src="img/stars.png"/><h3>I love this movie!</h3>
         <p>Its pretty nice Its pretty nice</p>
         </div>
         <div class="review"><img src="img/stars.png"/><h3>Okay</h3>
         <p>Its pretty nice Its pretty nice</p>
         </div>
         <div class="review"><img src="img/stars.png"/><h3>Good</h3>
         <p>Its pretty nice Its pretty nice</p>
         </div>
         <img id="arrowDown" src="img/arrowdown.png" onclick="scrollArrow()"/>

      </section>

      </article>
    `;
  document.querySelector("#specific").innerHTML = htmlTemplate;
}
