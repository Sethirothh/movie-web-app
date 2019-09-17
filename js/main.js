'use strict';


// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  location.href = `#${pageId}`;
  setActiveTab(pageId);
}



// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll(".tabbar a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }

  }
}

// set default page
function setDefaultPage() {
  let page = "home";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

setDefaultPage();


function openModal(){

}

// This handles the navigation
function toggleMenu(){
    let nav = document.querySelector(".hamburgerMenu");
    let ul = document.querySelector("nav > ul");
  if (nav.classList.contains("activeMenu")) {
    nav.classList.remove("activeMenu");
    ul.style.height = 0;
  } else {
    nav.classList.add("activeMenu");
    ul.classList.add("navigationActive");
    ul.style.height = ul.childElementCount * 50 + "px";
  }
}

function infoModal(){
    let htmlTemplate = ""
    htmlTemplate += `
    <div class="closeModal" onclick="infoModal()">
      <span></span>
      <span></span>
    </div>
        <div id="info-box">
        <h2 id="info-head">don't know what <br> movie to watch?</h2>
        <div class="info-down"><img id="info-random" src="img/shuffle.png">
        <p class="info-desc">Use this button to get a</p><p id="random-movie-info"> random movie </p><p class="info-desc">suggestion!</p>
        </div></div>
`;
document.querySelector("#information").innerHTML = htmlTemplate;

    let info = document.querySelector("#information");

    if (info.classList.contains("information")) {

      info.classList.add("infoClose");

      setTimeout(function(){
          info.classList.remove("information");
          info.classList.remove("infoClose");
          info.style.display = "none";
    }, 1000);

    }
    else {
      info.classList.add("information");
      info.style.display = "block";
    }
}
//slideshow
