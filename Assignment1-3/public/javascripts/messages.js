(function(exports) {

    //client to server: end of turn
    exports.T_End_of_Turn = 'This players turn is over';
    exports.End_of_Turn = {
        type : exports.T_End_of_Turn
    };

    //server to client: start of turn
    exports.T_Start_Turn = 'Start this players turn'
    exports.Start_Turn = {
        type : exports.T_Start_Turn
    };

    //client to server: game won
    exports.T_Game_Won = 'the game has been won';
    exports.Game_Won = {
        type : exports.T_Game_Won,
        data : null
    };

    //server to client: game aborted
    exports.Game_Aborted = {
        type : 'Game Aborted'
    };
    exports.Z_Game_Aborted = JSON.stringify(exports.Game_Aborted);

    //server to client: set as player A
    exports.T_PlayerID = 'PlayerID';
    exports.PlayerA = {
        type : exports.T_PlayerID,
        data : 'A'

    };
    exports.Z_PlayerA = JSON.stringify(exports.PlayerA);

    //server to client: set as player B
    exports.PlayerB = {
        type : exports.T_PlayerID,
        data : 'B'
    };
    exports.Z_PlayerB = JSON.stringify(exports.PlayerB);

    //Dual: sends a move made my a player
    exports.T_sendMove = 'Send Move';
    exports.sendMove = {
        type : exports.T_sendMove,
        data : null
    };

    //Dual: sends the updated score
    exports.T_sendScore = 'Send Score';
    exports.sendScore = {
        type : exports.T_sendScore,
        data : null
    };

    //Dual: Sends a players chosen color
    exports.T_sendColor = 'Send color';
    exports.sendColor = {
        type : exports.T_sendColor,
        data : null
    };

    //Dual: sends dice roll for turn determination 
    exports.T_diceRoll = 'roll for turn';
    exports.diceRoll = {
        type : exports.T_diceRoll,
        data : null
    };
}(typeof exports === 'undefined' ? this.Messages = {} : exports));