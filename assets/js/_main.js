/*! Plugin options and other jQuery stuff */

// dl-menu options
$(function() {
  $( '#dl-menu' ).dlmenu({
    animationClasses : { classin : 'dl-animate-in', classout : 'dl-animate-out' }
  });
});

// FitVids options
$(function() {
  $("article").fitVids();
});

$(".close-menu").click(function () {
  $(".menu").toggleClass("disabled");
  $(".links").toggleClass("enabled");
});

$(".about").click(function () {
  $("#about").css('display','block');
});

$(".close-about").click(function () {
  $("#about").css('display','');
});