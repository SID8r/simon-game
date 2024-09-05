
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];

// BUTTON CLICKED 
$(".btn").click(function(){
   var userClickedButton=$(this).attr("id");
   userClickedPattern.push(userClickedButton);
   animatePress(userClickedButton,100);
   playSound(userClickedButton);
   checkAnswer((userClickedPattern.length) -1);
});

// PLAY SOUND
function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}

// NEXT SEQUENCE
var level=0;
function nextSequence(){
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  
}

// ANIMATION
function animatePress(currentColor,time){
        $("#"+currentColor).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColor).removeClass("pressed");
        },time);
    }

// GAME START
var start=false;;
$(document).keydown(function(){
    if(!start){
        $("h1").text("Level "+level);
        nextSequence();
        start=true;
    }
    
})


// GAME - CHECK
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
                userClickedPattern=[];
            },1000);
        }
    }
    else{
        var wrong="wrong";
        playSound(wrong);
        $("body").addClass("game-over");
        setTimeout(function(){
           $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// START-OVER
function startOver(){
    level=0;
    gamePattern=[];
    start=false;
    userClickedPattern=[];
}

