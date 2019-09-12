
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


//Adi , work in here with the movie slider :)

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
