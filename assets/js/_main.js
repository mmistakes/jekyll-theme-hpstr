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

$(".entry-reading-time-content").text(function (index, value) {
  var minutes = Math.round(parseFloat(value));
  var minutes_label=minutes===1?" minute":" minutes";
  var reading_time=minutes>0?"about "+minutes+" "+minutes_label+" ":"less than 1 minute";
  return reading_time;
});
