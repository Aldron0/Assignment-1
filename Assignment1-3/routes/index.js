var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/Start_Screen", function(req, res) {
	res.sendFile("Start_Screen.html", {root: "./public"});
});

router.get("/Play", function(req, res) {
	res.sendFile("Game_Screen.html", {root: "./public"});
});

module.exports = router;
