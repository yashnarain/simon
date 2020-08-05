
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(".container").hide();

$(document).keypress(function() {
  if (!started) {
    $(".container").show();
    $("h2").hide();
    $("h3").hide();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(document).click(function() {
  if (!started) {
    $(".container").show();
    $("h2").hide();
    $("h3").hide();
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  for(var i=0; i<gamePattern.length; i++){
    task(i);
}
}

function task(i){

setTimeout (function(){
  $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(gamePattern[i]);
}, 200 * i);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var func = $("#" + currentColour);
  func.addClass("pressed");
  setTimeout(function() {
    func.removeClass("pressed");
  }, 100);
}
