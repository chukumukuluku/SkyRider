'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});
router.get('/onlineGraph', function(req, res, next) {
  res.render('onlineGraph');
});
router.get('/dbGraph', function(req, res, next) {
  res.render('dbGraph');
});

module.exports = router;
