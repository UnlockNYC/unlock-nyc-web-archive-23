$(document).ready(function() {
  let autoslide = setInterval(moveRight, 29500);

  var slideCount = $("#slider ul li").length;
  var slideWidth = $(window).width();
  if ($(window).width() > 800) {
    if ($(window).height() > $(window).width() * 0.7) {
      var slideHeight = $(window).height() * 0.8;
    } else {
      slideHeight = $(window).height();
    }
  } else if ($(window).innerWidth() < 500) {
    slideHeight = 575;
  } else {
    slideHeight = 700;
  }

  var sliderUlWidth = slideCount * slideWidth;

  $("#slider").css({ width: slideWidth, height: slideHeight });
  $("#slider ul").css({ width: sliderUlWidth, marginLeft: -slideWidth });
  $("#slider ul li").css({ width: slideWidth, height: slideHeight });
  $("#slider ul li:last-child").prependTo("#slider ul");

  $(window).resize(function() {
    slideCount = $("#slider ul li").length;
    slideWidth = $(window).width();
    if ($(window).width() > 800) {
      if ($(window).height() > $(window).width() * 0.7) {
        var slideHeight = $(window).height() * 0.8;
      } else {
        slideHeight = $(window).height();
      }
    } else if ($(window).innerWidth() < 500) {
      slideHeight = 575;
    } else {
      slideHeight = 700;
    }
    sliderUlWidth = slideCount * slideWidth;

    $("#slider").css({ width: slideWidth, height: slideHeight });
    $("#slider ul").css({ width: sliderUlWidth, marginLeft: -slideWidth });
    $("#slider ul li").css({ width: slideWidth, height: slideHeight });
  });

  function moveLeft() {
    $("#slider ul").animate(
      {
        left: +slideWidth
      },
      600,
      function() {
        $("#slider ul li:last-child").prependTo("#slider ul");
        $("#slider ul").css("left", "");
      }
    );
  }

  function moveRight() {
    $("#slider ul").animate(
      {
        left: -slideWidth
      },
      600,
      function() {
        $("#slider ul li:first-child").appendTo("#slider ul");
        $("#slider ul").css("left", "");
      }
    );
  }

  $("div.control_prev").click(function() {
    moveLeft();
    clearInterval(autoslide);
  });

  $("div.control_next").click(function() {
    moveRight();
    clearInterval(autoslide);
  });
});
