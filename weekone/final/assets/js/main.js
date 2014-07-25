$(document).ready(function() {

/* ===========================
   BODY
=========================== */
  var mouseX = 500;

  // config variables
  var WALK_SPEED = 6;
  var LEFT_EDGE_OFFSET = 0;
  var RIGHT_EDGE_OFFSET = 0;
  var FRAMERATE = 30;


  $(document).on("mousemove", function() {
    mouseX = event.clientX;
    // console.log(event);
  })

  var walk = false;
  $("#walkway").on("mouseenter", function() {
    walk = true;
  }).on("mouseleave", function() {
    walk = false;
  });

  setInterval(function() {
    if (walk) {
      if (mouseX > $(".torso").offset().left + 200 + RIGHT_EDGE_OFFSET) {
        // mouse is to the right of the character
        $(".torso").css("left", parseInt($(".torso").css("left")) + WALK_SPEED);
        $(".torso").removeClass("flipped");
        $(".left-leg, .right-leg").addClass("animating");
      } else if (mouseX < $(".torso").offset().left + 0 + LEFT_EDGE_OFFSET) {
        // mouse is to the left of the character
        $(".torso").css("left", parseInt($(".torso").css("left")) - WALK_SPEED);
        $(".torso").addClass("flipped");
        $(".left-leg, .right-leg").addClass("animating");
      } else {
        $(".left-leg, .right-leg").removeClass("animating");
      }

    } else{
      $(".left-leg, .right-leg").removeClass("animating");
    }
  }, 1000/FRAMERATE);


/* ===========================
   FERRIS WHEEL
=========================== */

var ferris = $("#ferris"),
    center = $("#center"),
    tl;

TweenLite.set(center, {x:190, y:190});

//a little tricky getting the ferris wheel built, but it serves its purpose
function addArms(numArms) {
  var space = 360/numArms; 
  for (var i = 0; i < numArms; i++){
    var newArm = $("<div>", {class:"arm"}).appendTo(center)
    var newPivot = $("<div>", {class:"pivot outer"}).appendTo(center);
    var newBasket = $("<div>", {class:"basket"}).appendTo(newPivot);
    TweenLite.set(newPivot, {rotation:i*space, transformOrigin:"10px 210px"})
    TweenLite.set(newArm, {rotation:(i*space) -90, transformOrigin:"0px 3px"})
    TweenLite.set(newBasket, {rotation:  (-i * space), transformOrigin:"50% top" });
  }   
}

//Get this party started
addArms(8);//values between 2 and 12 work best
TweenLite.from(ferris, 1, {autoAlpha:0});

//Animation (super easy)
tl = new TimelineMax({repeat:-1});
tl.to(center, 20, {rotation:360, ease:Linear.easeNone})
//spin each basket in the opposite direction of the ferris wheel at same rate (no math)
tl.to($(".basket"), 20, {rotation:"-=360", ease:Linear.easeNone},0)


function updateSlider() {
    $("#slider").slider("value", tl.progress());
}
  

/* ===========================
   Navigation
=========================== */

  // get the images with jQuery
  // use .get() to return the selection as a normal JS array
  var crew = $("ul li img").get();

  // stolen shuffle function from stack overflow
  function shuffle(o){ //v1.0
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  // shuffle them up
  crew = shuffle(crew);

  // tween them all, but with a stagger, 
  // so they come in at a random time
  TweenMax.staggerFrom(crew, 0.5, {
    scale: 0,
    ease: Back.easeOut
  }, 0.05);
})

$(function() {
      var pull    = $('#pull');
        menu    = $('nav ul');
        menuHeight  = menu.height();

      $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
      });

      $(window).resize(function(){
            var w = $(window).width();
            if(w > 320 && menu.is(':hidden')) {
              menu.removeAttr('style');
            }
        });
    });