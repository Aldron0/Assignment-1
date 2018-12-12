var express = require("express");
var http = require("http");
var websocket = require("ws");

var indexRouter = require("./routes/index.js");
var messages = require("./public/javascripts/messages.js");

var gameStatus = require("./status");
var Game = require("./game");

var port = process.argv[2];
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/play", indexRouter);

app.get("/", (req, res) => {

  res.render("Start_Screen.ejs", { gamesStarted: gameStatus.gamesStarted, gamesCompleted: gameStatus.gamesFinished, currentPlayers: gameStatus.currentPlayers });
});

var server = http.createServer(app);
const wss = new websocket.Server({ server });

var websockets = {};

setInterval(function() {
  for(let i in websockets){

    if(websockets.hasOwnProperty(i)){

      let gameObj = websockets[i];
      if(gameObj.getState() == 6){

        console.log("\tDeleting element "+i);
        delete websockets[i];
      }
    }
  }
}, 50000);

var currentGame = new Game(gameStatus.gamesStarted++);
var connectionID = 0;

wss.on("connection", function connection(ws) {

  gameStatus.currentPlayers++;
  var connection = ws;
  var connectionId = connectionID++;
  var playerID = currentGame.addPlayer(connection);
  websockets[connectionId] = currentGame;

  console.log("Player "+connectionId+" has been put into "+currentGame.gameID+" as "+playerID);

  connection.send((playerID == 'A') ? messages.Z_PlayerA : messages.Z_PlayerB)

  if (currentGame.getState() == 2) {

    currentGame = new Game(gameStatus.gamesStarted++);
  }
  
  //determine incoming message
  connection.on('message', function incoming(message) {

    let recMessage = JSON.parse(message);
    let gameObject = websockets[connectionId];

    let isPlayerA = (gameObject.playerA.id == connection) ? true : false;

    console.log(recMessage);

    //dice Roll
    if (recMessage.type == messages.T_diceRoll) {
      if (isPlayerA) {

        gameObject.playerA.initialDiceRoll = recMessage.data;
      } else {

        gameObject.playerB.initialDiceRoll = recMessage.data;
      }

      if (gameObject.playerA.color != null && gameObject.playerB.color != null) {
        if (gameObject.playerA.initialDiceRoll != null && gameObject.playerB.initialDiceRoll != null) {

          let playerARoll = gameObject.playerA.initialDiceRoll;
          let playerBRoll = gameObject.playerB.initialDiceRoll;
          let startMsg = messages.Start_Turn;

          if (playerARoll > playerBRoll || playerARoll == playerBRoll) {
    
            console.log('Player A goes first');
            gameObject.playerA.id.send(JSON.stringify(startMsg));
            gameObject.turn = 1;
          } else {
    
            console.log('Player B goes first.');
            gameObject.playerB.id.send(JSON.stringify(startMsg));
            gameObject.turn = 2;
          }

          gameObject.setState(4);
        }
      }

      //chosen color
    } else if (recMessage.type == messages.T_sendColor) {

      if (isPlayerA) {

        gameObject.playerA.color = recMessage.data;
        gameObject.playerB.id.send(message);
      } else {

        gameObject.playerB.color = recMessage.data;
        gameObject.playerA.id.send(message);
      }

      if (gameObject.playerA.color !== null && gameObject.playerB.color !== null) {

        console.log('Colors have been chosen');
        gameObject.setState(3);
      }

      //end of turn
    } else if (recMessage.type == messages.T_End_of_Turn) {

      let nextTurn = messages.Start_Turn;

      if (isPlayerA) {

        gameObject.playerB.id.send(JSON.stringify(nextTurn));
      } else {

        gameObject.playerA.id.send(JSON.stringify(nextTurn));
      }

      if (isPlayerA) {

        gameObject.turn = 2;
      } else {

        gameObject.turn = 1;
      }

      //move has been recived
    } else if (recMessage.type == messages.T_sendMove) {
      if (isPlayerA) {

        gameObject.playerB.id.send(message);
      } else {

        gameObject.playerA.id.send(message);
      }

      //score has been recived 
    } else if (recMessage.type == messages.T_sendScore) {
      if (isPlayerA) {

        gameObject.playerB.id.send(message);
      } else {

        gameObject.playerB.id.send(message);
      }

      //the game has been won
    } else if (recMessage.type == messages.T_Game_Won) {

      gameStatus.gamesFinished++;
      if (isPlayerA) {

        gameObject.playerB.id.send(message);
      } else {

        gameObject.playerB.id.send(message);
      }

      gameObject.setState(6);
    }
  });

  //game aborted
  connection.on('close', function (code) {

    console.log(connectionId + " Disconnected!");
    if (code == 1001) {

      let gameObject = websockets[connectionId];
      if (gameObject.getState() != 5) {

        gameObject.setState(6);
        let abortMsg = messages.Game_Aborted;
        try {
          gameObject.playerA.id.send(JSON.stringify(abortMsg));

          setTimeout(function () {

            gameObject.playerA.id.close();
            gameObject.playerA.id = null;
          }, 3000);

        } catch (e) {

          console.log("Player A is closing " + e);
        }
  
        try {
          gameObject.playerB.id.send(JSON.stringify(abortMsg));

          setTimeout(function () {

            gameObject.playerB.id.close();
            gameObject.playerB.id = null;
          }, 3000);
        } catch (e) {
          
          console.log("Player B is closing " + e);
        }
      }
    }
  });
});

server.listen(process.env.PORT || 3000);
