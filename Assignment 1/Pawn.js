//Registering a selected pawn
var selectedPawn;

//Moving the pawn
function move(chosenPawn, diceRoll) {

    var pawn = $("#"+chosenPawn)
    var parent = pawn.parent();
    
    //Moving the pawn off of the start location
    if (parent.hasClass('startPos')) {

        if (pawn.hasClass('yellow')) {
            pawn.appendTo('#1');
            $('#'+selectedPawn).toggleClass('clicked');
            stateOfGame = 3;
            updateGameState();

        } else if (pawn.hasClass('green')) {
            pawn.appendTo('#11');
            $('#'+selectedPawn).toggleClass('clicked');
            stateOfGame = 3;
            updateGameState();

        } else if (pawn.hasClass('blue')) {
            pawn.appendTo('#32');
            $('#'+selectedPawn).toggleClass('clicked');
            stateOfGame = 3;
            updateGameState();

        } else if (pawn.hasClass('red')) {
            pawn.appendTo('#21');
            $('#'+selectedPawn).toggleClass('clicked');
            stateOfGame = 3;
            updateGameState();

        }

    //Moving from any other space
    } else {

        var currentSpace = parseInt(parent.attr('id'));
        var diceInt = parseInt(diceRoll);

        //Calculates the endSpace
        var endSpace = { 
            getSpace: function() {
                if (currentSpace + diceInt > 41) {
                    return (currentSpace + diceInt) - 41;
                } else {
    
                    return currentSpace + diceInt;
                }
            }    
        }

        checkForPawn(endSpace.getSpace());

        //Increments the score if the pawn lands on the players start position
        if (isStart(endSpace.getSpace())) {
            if (playersChosenColor == 'yellow') {
                
                yellowScore++;
            } else if (playersChosenColor == 'green') {

                greenScore++;
            } else if (playersChosenColor == 'blue') {

                blueScore++;
            } else {
                
                redScore++;
            }

            pawn.remove().fadeOut(500);
            updateScore();
        }

        pawn.appendTo('#'+endSpace.getSpace());
        $('#'+selectedPawn).toggleClass('clicked');

        stateOfGame = 3;
        updateGameState();
        gameWon();
    }
}

//Checks if there is another pawn on the upcoming space
function checkForPawn(space) {

    if($('#'+space).children().length > 0) {

        var pawnOnSpace = $('#'+space).children(':first');

        if (pawnOnSpace.hasClass('green')) {
            pawnOnSpace.appendTo('.startPos.greenSpace');

        } else if (pawnOnSpace.hasClass('blue')) {
            pawnOnSpace.appendTo('.startPos.blueSpace')

        } else if (pawnOnSpace.hasClass('green')) {
            pawnOnSpace.appendTo('.startPos.greenSpace')

        } else if (pawnOnSpace.hasClass('yellow')) {

            pawnOnSpace.appendTo('.startPos.yellowSpace')
        }
    }
}

//checks if the next space is a start space
function isStart(space) {
    var actualSpace = $('#'+space);

    if (playersChosenColor == 'yellow' && actualSpace.hasClass('yellowStart')) {

        return true;
    } else if (playersChosenColor == 'red' && actualSpace.hasClass('redStart')) {

        return true;
    } else if (playersChosenColor == 'blue' && actualSpace.hasClass('blueStart')) {

        return true;
    } else if (playersChosenColor == 'green' && actualSpace.hasClass('greenStart')) {

        return true;
    } else {

        return false;
    }
}




