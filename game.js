maxWidth();
function maxWidth() {
  if (window.matchMedia("(max-width: 1120px)").matches) {
    $("#level-title").text("Press Start");
  }
}

// User Clicked Pattern
var userClickedPattern = [];

// Game Pattern
var gamePattern = [];

// Button Colors Array
var buttonColours = ["red", "blue", "green", "yellow"];

// Game Starts
var started = false;
var level = 0;
$(document).keydown(function () {
  checkStart();
});

// For mobile Users
$(".button-mobile").click(function () {
  checkStart();
  $(".button-mobile").css("display", "none");
});

// Checks start of the Game
function checkStart() {
  if (!started) {
    nextSequence();
    $("level-title").text("Level " + level);
    started = true;
  }
}

// Next color Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Button EventHandler
$(".btn").on("click", function (e) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastIndex = userClickedPattern.length - 1;
  checkAnswer(lastIndex);
});

// Function to Play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation for when user clicks
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(() => {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// Checks Answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

// Start Over
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  $(".button-mobile").css("display", "");
  $(".button-mobile").text("Restart");
}
