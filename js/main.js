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


function randomMovie(){
  console.log(Math.floor(Math.random() * 10));
}
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
    let info = document.querySelector("#information");

    if (info.classList.contains("information")) {
      info.classList.remove("information");

      info.style.display = "none";
    }
    else {
      info.classList.add("information");
      info.style.display = "block";
    }
}
//slideshow

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
