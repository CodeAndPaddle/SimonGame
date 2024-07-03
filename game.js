var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern=[];
var firstTime = true;
var level = 0 ;

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " +level);
    
    
}

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (!firstTime){
        checkAnswer(userClickedPattern.length);
    }
})

function playSound (color){
    var audio = new Audio(color + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function(){$("#" + currentColour).removeClass("pressed")}, 100);
}

$(document).on("keypress click",function(){
    if(firstTime){
        userClickedPattern = [];
        setTimeout(function(){nextSequence();},200);
        firstTime = false;
    }
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel-1] != userClickedPattern[currentLevel-1]){

        var wrongAudio = new Audio("wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")}, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();

    }
    if (currentLevel === level){
        userClickedPattern = [];
        setTimeout(function(){nextSequence();},1000);
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    firstTime=true;
    level = 0;
}