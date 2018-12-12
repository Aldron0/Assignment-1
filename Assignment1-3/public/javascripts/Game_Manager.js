
//Stuff to run when the document loads
$(document).ready(function () {

    blurbackground(); 
    updateGameState();
    updateScore();
});



//Game State and chosen color
var WebSocketURL = "ws://192.168.0.104:3000";
var playersChosenColor;
var stateOfGame = 3;
var isPlayerTurn = false;
var diceRolled = true;
var playerID;

//The game Score
var redScore = 0;
var yellowScore = 0;
var greenScore = 0;
var blueScore = 0;

var otherPlayersColor;

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

    $('#gameContent').toggle('.hide');
}

//Color selecting buttons
var colorButtons = $('.colorButton');
var playerHasColor = false;

colorButtons.on('click', function() {
    if($(this).html().toLowerCase() == otherPlayersColor) {

        placeColor("That color has already been chosen!");
    } else {

        if ($(this).html() == 'RED') {

            playersChosenColor = 'red';
            playerHasColor = true;
            placeColor('You have Selected Red!');
        } else if ($(this).html() == 'BLUE') {

            playersChosenColor = 'blue';
            playerHasColor = true;
            placeColor('You have Selected Blue');
        } else if ($(this).html() == 'YELLOW') {

            playersChosenColor = 'yellow';
            playerHasColor = true;
            placeColor('You have Selected yellow');
        } else if ($(this).html() == 'GREEN') {

            playersChosenColor = 'green';
            playerHasColor = true;
            placeColor('you have selected green');
        }

        let colorMsg = Messages.sendColor;
        colorMsg.data = playersChosenColor;
        socket.send(JSON.stringify(colorMsg));   
    }

    if(initialRoll == false && playerHasColor == true) {

        $('#gameContent').toggle('.hide');
        $('#selectBox').toggle('.hide');
    } else {

        placeInstr('Please roll the die');
    }
    
    if (playerHasColor == true) {
    
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
    }
});

function placeInstr(instruction) {

    $('#instructions').html(instruction);
}

function placeColor(color) {

    $('#chosenColor').html(color);
    $('#PlayerChosenColor').html(color);
}

//The confirm turn button
var confrirmButton = $('#confirmTurn');

confrirmButton.on('click', function() {

    if (isPlayerTurn && selectedPawn != null) {

        stateOfGame = 3;
        updateGameState(3);

        move(selectedPawn, $('#diceNum').html());

        let playerMove = selectedPawn+'-'+$('#diceNum').html();

        let moveMsg = Messages.sendMove;
        moveMsg.data = playerMove;
        socket.send(JSON.stringify(moveMsg));

        let endMsg = Messages.End_of_Turn;
        socket.send(JSON.stringify(endMsg));
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

        placeGameState("The game has been Won!");
    } else if (stateOfGame == 0) {

        placeGameState("The game has been aborted");
    }
}

//Score updater
function updateScore() {

    $('#blueScore').html(blueScore);
    $('#redScore').html(redScore);
    $('#greenScore').html(greenScore);
    $('#yellowScore').html(yellowScore);
}

updateScore();

function scoreToArray () {

    var scoreToSend = [redScore, blueScore, greenScore, yellowScore];
    return scoreToSend;
}

var socket;

(function setup() {
    socket = new WebSocket(WebSocketURL);

    socket.onmessage = function (event) {

        let recivedMessage = JSON.parse(event.data);

        console.log(recivedMessage);

        //reciving players ID
        if (recivedMessage.type == Messages.T_PlayerID) {

            if (recivedMessage.data == 'A') {

                playerID = 'A';
            } else if (recivedMessage.data == 'B') {

                playerID = 'B';
            }

        //reciving others colors
        } else if (recivedMessage.type == Messages.T_sendColor) {

            otherPlayersColor = recivedMessage.data;
        //Game has been won
        } else if (recivedMessage.type == Messages.T_Game_Won) {

            if (recivedMessage.data == playerID) {

                alert('You Win!');
                socket.close();
            } else {

                alert('You Loose :(');
                socket.close();
            }   

        //reciving other players moves
        } else if (recivedMessage.type == Messages.T_sendMove) {

            var otherPlayersMove = recivedMessage.data;
            var moveArray = otherPlayersMove.split('-');

            if (moveArray[1] === ' ') {

                console.log('This move has been adjusted!')
                moveArray[1] = 0;
            }
            move(moveArray[0], moveArray[1]);
        //reciving score updates
        } else if (recivedMessage.type == Messages.T_sendScore) {
            var scoreUpdateArray = recivedMessage.data;

                redScore = scoreUpdateArray[0];
                blueScore = scoreUpdateArray[1];
                greenScore = scoreUpdateArray[2];
                yellowScore = scoreUpdateArray[3];
                updateScore();
        //recive start turn
        } else if (recivedMessage.type == Messages.T_Start_Turn) {

                isPlayerTurn = true;
                diceRolled = false;
                stateOfGame = 1;
                updateGameState();
        } else if (recivedMessage.type == Messages.Z_Game_Aborted) {

            stateOfGame = 0;
            alert("The other player has left!");
        }
    }
})();

