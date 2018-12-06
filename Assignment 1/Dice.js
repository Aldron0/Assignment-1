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

    var diceNum = document.getElementById('diceNum');
    diceNum.innerHTML = num;
}

var button = document.getElementById('diceButton');

button.onclick = function() {
    var result = dice.roll();
    placeNumber(result);
};
