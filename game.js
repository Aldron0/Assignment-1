var game = function (gameID) {
    this.gameID = gameID;
    this.playerA = new player(null);
    this.playerB = new player(null);
    this.turn = null;
    this.gameState = 0;
}


var player = function (id) {
    this.color = null;
    this.id = id;
    this.initialDiceRoll = null;

}

    /*Game State Guide*/

    //0 player joined 0
    //1 players joined 1
    //2 players joined 2
    //colors selected 3
    //game started 4
    //game won 5
    //game aborted 6

game.prototype.setState = function (state) {

    return (this.state = state);
}

game.prototype.getState = function () {

    return this.state;
}

game.prototype.getTurn = function () {

    return this.turn;
}

game.prototype.setTurn = function (turn) {

    return (this.turn == trurn);
}


game.prototype.addPlayer = function (id) {

    if (this.playerA.id == null) {

        this.playerA.id = id;
        this.setState(1);
        return 'A';
    } else {

        this.playerB.id = id;
        this.setState(2);
        return 'B';
    }
}


module.exports = game;