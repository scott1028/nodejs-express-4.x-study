var express = require('express');
var app = express();

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res, next) {
    res.write('hello world1');
    next();
}, function(req, res, next){
    res.write('hello world2');
    next();
}, function(req, res, next){
    res.write('hello world3');
    console.log('hello world3');
    res.end();
    next();
});

app.use(function(req, res, next){
    console.log('hello world4');
    next();
});

app.use(function(req, res, next){
    console.log('hello world5');
    next();
}, function(req, res, next){
    console.log('hello world6');
    next();  // do nothing because there is no middleware or controller handle in next level.
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});