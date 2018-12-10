//Stuff to run when the document loads
$(document).ready(function () {
    blurbackground(); 
    updateGameState();
    updateScore();
});


//Game State and chosen color
var playersChosenColor;
var stateOfGame = 1;
var isPlayerTurn = true;
var diceRolled = false;

//The game Score
var redScore = 0;
var yellowScore = 0;
var greenScore = 0;
var blueScore = 0;

//Checks if the game is won
function gameWon() {
    if (redScore == 4) { 
        stateOfGame = 4;
        return true;

    } else if (yellowScore == 4) {
        stateOfGame = 4;
        return true;

    } else if (greenScore == 4) {
        stateOfGame = 4;
        return true;

    } else if (blueScore == 4) {
        stateOfGame = 4;
        return true;

    }

    return false;
}

//Blurs the background, needs to be changed to look nice
function blurbackground() {

    $('#content').toggle('.blur');
    $('#background').toggle('.blur');
}

//Color selecting buttons
var colorButtons = $('.colorButton');

colorButtons.on('click', function() {

    if ($(this).html() == 'RED') {
        playersChosenColor = 'red';
    } else if ($(this).html() == 'BLUE') {
        playersChosenColor = 'blue';
    } else if ($(this).html() == 'YELLOW') {
        playersChosenColor = 'yellow'
    } else if ($(this).html() == 'GREEN') {
        playersChosenColor = 'green';
    }

    $('#content').toggle('.blur');
    $('#background').toggle('.blur');
    $('#selectBox').toggle('.hide');

    selectedPawn = $(document).on('click', '.pawn.'+playersChosenColor, function() {

        if (isPlayerTurn) {
            if($(this).hasClass('clicked')) {

                $(this).removeClass('clicked');
                stateOfGame = 1;
                updateGameState();
                selectedPawn = null;
            } else if (!$(this).hasClass('clicked')) {
    
                stateOfGame = 2;
                updateGameState();
    
                $('.clicked').removeClass('clicked');
                $(this).addClass('clicked');
                selectedPawn = $(this).attr('id');
            }
        }
    });    
});
    
//The confirm turn button
var confrirmButton = $('#confirmTurn');

confrirmButton.on('click', function() {

    if (isPlayerTurn) {
        move(selectedPawn, $('#diceNum').html());
    }
});

//Places the game state in the box
function placeGameState(state) {

    var gameState = $('#gameState');
    gameState.html(state);
}

//Game state updater
function updateGameState() {
    if (stateOfGame == 1) {

        placeGameState("Please Select a Pawn");
    } else if (stateOfGame == 2) {

        placeGameState("Please roll the dice, or put the pawn on the start position.")
    } else if (stateOfGame == 3) {

        isPlayerTurn = false;
        placeGameState("Please wait for your turn");
    } else if (stateOfGame == 4) {

        placeGameState("The game has been Won!")
    } else if (stateOfGame == 0) {

        placeGameState("Please roll the dice to determine ");
    }
}

//Score updater
function updateScore() {

    $('#blueScore').html(blueScore);
    $('#redScore').html(redScore);
    $('#greenScore').html(greenScore);
    $('#yellowScore').html(yellowScore);
}



//A bunch of stuff needs to happen with node js. 
    //Which player selected which color
    //What turn it is
    //Turn rotation is done locally, but WHOSE turn it is is done on the server

