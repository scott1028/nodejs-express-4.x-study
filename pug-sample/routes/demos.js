var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.locals.currentTime = new Date().getTime();
  res.render('demo', { title: 'Demo Page' });
});

module.exports = router;
