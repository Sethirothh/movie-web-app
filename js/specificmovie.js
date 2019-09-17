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
        <div class="title-box">
            <h2 id="title" >${title}</h2>
            <img src="img/stars.png"/>
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



//function to make the content change when you click on the ARROW DOWN
function scrollArrow() {
  let description = document.getElementById("desc-box");
  let readReviews = document.getElementById("read-reviews");
  let arrowDown = document.getElementById("arrow-down");
  let arrowUp = document.getElementById("arrow-up");
  readReviews.style.display = "block";
  arrowUp.style.display = "block";
  arrowDown.style.display = "none";
  description.style.display = "none"
}

//function to make you go back to the previous content on the ARROW UP
function scrollArrowUp() {
  let description = document.getElementById("desc-box");
  let readReviews = document.getElementById("read-reviews");
  let arrowDown = document.getElementById("arrow-down");
  let arrowUp = document.getElementById("arrow-up");
  readReviews.style.display = "none";
  arrowUp.style.display = "none";
  arrowDown.style.display = "block";
  description.style.display = "block";
}

function readMore() {
  let moreRew = document.querySelector("#more-review");
  if (moreRew.style.display === "none") {
    moreRew.style.display = "block";
  } else {
    moreRew.style.display = "none"
  }
}

function readMore2() {
  let moreRew2 = document.querySelector("#more-review2");
  if (moreRew2.style.display === "none") {
    moreRew2.style.display = "block";
  } else {
    moreRew2.style.display = "none"
  }
}

function readMore3() {
  let moreRew3 = document.querySelector("#more-review3");
  if (moreRew3.style.display === "none") {
    moreRew3.style.display = "block";
  } else {
    moreRew3.style.display = "none"
  }
}

function readMore4() {
  let moreRew4 = document.querySelector("#more-review4");
  if (moreRew4.style.display === "none") {
    moreRew4.style.display = "block";
  } else {
    moreRew4.style.display = "none"
  }
}