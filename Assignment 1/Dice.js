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
