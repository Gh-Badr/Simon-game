// alert("hello");

var buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern;
var randomNumber;
var randomChosenColour;
var userChosenColour;
var audio;
var level=0;
var numberOfButtonsClicked;


$(document).on("keypress",function(){
  if(level==0){
    nextSequence();
  }
});


$(".btn").on("click",function(){
  userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  numberOfButtonsClicked +=1;
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(numberOfButtonsClicked);


});


function nextSequence(){
  randomNumber = Math.floor(4*Math.random());
  randomChosenColour= buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("."+randomChosenColour).fadeOut(50,function(){
    $(this).trigger("myFadeOutEvent");
  }).fadeIn(50);
  $("."+randomChosenColour).on("myFadeOutEvent",function(){
    playSound(randomChosenColour);
  });
  level += 1;
  $("h1").text("Level "+level);
  userClickedPattern=[];
  numberOfButtonsClicked = 0;
}

function checkAnswer(currentButton){
  console.log(gamePattern);
  console.log(userClickedPattern);
  if (gamePattern[currentButton-1] != userClickedPattern[currentButton-1]){
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key To Restart");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 100);
    gamePattern = [];
    level=0;

  }
  else if(currentButton==level){
    setTimeout(nextSequence, 1000);
  }
}

function playSound(name){
  audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}
