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


// navigation
$('nav').hide();
$('.fa-bars').click(function () {
    console.log('clicked');
    $('.mobileNav').slideToggle();
    $('body').addClass('mobileOpen');
    $('.fa-times-circle').css('display', 'block');
    $('.fa-bars').css('display', 'none');

});


$('.fa-times-circle').click(function () {
    $('.fa-times-circle').css('display', 'none');
    $('.fa-bars').css('display', 'block');
});


$('.fa-times-circle').click(function () {
    if ($('body').hasClass('mobileOpen')) {
        console.log('mobile dropdown is closed');
        $('.mobileNav').slideUp();
        $('body').removeClass('mobileOpen');
        $('.fa-times-circle').css('display', 'none');
        $('.fa-bars').css('display', 'block');
    }
});



if ($('body').hasClass('mobileOpen')) {
    console.log('x');
} else {
    $('.fa-times-circle').css('display', 'none');
    $('.fa-bars').css('display', 'block');
}

//slideshow
