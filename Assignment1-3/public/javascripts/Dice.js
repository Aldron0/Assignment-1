//Rolls the random number
var dice = {
    sides: 6,
    roll: function() {

        var randomNumber =
        Math.floor(Math.random()*this.sides) + 1;

        return randomNumber;
    }
}

//Is supposed to print the number
function placeNumber(num) {

    var diceNum = $('#diceNum');
    diceNum.html(num);
}

var diceButton = $('#diceButton');

diceButton.on('click', function() {
    if (diceRolled == false) {

        var result = dice.roll();
        placeNumber(result);
        diceRolled = true;
    }
});

function placeInitial(num) {

    $('#initialDiceNum').html(num);
}

var initialRoll = true;
var initial = $('#initialDiceButton');

initial.on('click', function () {

    if (initialRoll) {

        var result = dice.roll();
        placeInitial(result);
        initialRoll = false;

        let diceMsg = Messages.diceRoll;
        diceMsg.data = result;
        socket.send(JSON.stringify(diceMsg));
    }

    if(playerHasColor) {
        setTimeout(function () {

            $('#gameContent').toggle('.hide');
            $('#selectBox').toggle('.hide');
        }, 3000);

    } else {

        placeInstr("Please select a color");
    }
});

