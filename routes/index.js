var express = require('express');
var url = require('url');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send();
});

module.exports = router;
