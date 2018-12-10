//player class and constructor
class player{
    player(color, id) {
        this.color = color;
        this.id = id;
        this.pawns = choosePawn();
    }
}


//returns an array with the players pawns
function choosePawn() {
    if (playersChosenColor == 'red') {
        return $('.pawn.red');

    } else if (playersChosenColor == 'blue') {
        return $('.pawn.blue');

    } else if (playersChosenColor == 'yellow') {
        return $('.pawn.yellow');

    } else if (playersChosenColor == 'green') {
        return $('.pawn.green');

    }
}
