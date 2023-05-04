//array of Button-Colors

var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];  //FOR GAME  SEQUENCE
var userClickedPattern=[];  //Tracks User Pattern

var level=0;
var started=false;

//keyboard  press  detection
$(document).keydown(function(){
    if(started===false){
        $("h1").text("Level "+level);
        nextSequence();
        started=true;
    }
});


//Sequence Generator
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColors[randomNumber];
    //pushing the color into gamepattern  Array
    gamePattern.push(randomChoosenColor);

    //using jquery to choose button with sameid and adding animation
    $("#"+randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor); //REFACTOR
    

}
$(".btn").click(function(){
    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChoosenColor=$(this).attr("id");

    // Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChoosenColor);

    playSound(userChoosenColor); //REFACTOR
    animatePress(userChoosenColor);
    // console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
 });


function playSound(name){
    var audio=new Audio('sounds/'+name+'.mp3');
    audio.play();
}

//click animation when user presses the button
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {   
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}