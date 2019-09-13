
  function showLoader(show) {
    let loader = document.querySelector('#loader');
    if (show ) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }

  function showMovieLoader(show) {
    let loader = document.querySelector('#movieLoader');
    if (show ) {
      loader.classList.remove("hide");
    } else {
      loader.classList.add("hide");
    }
  }
