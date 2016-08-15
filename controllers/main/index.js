var db = require('../../db');

exports.index = function(req, res){
  res.redirect('/users');
};

exports.list = function(req, res, next){
  req.session.test_value = 0;
  console.log('Invoke ORM!');
  req.models.User.find({uid: 1}, function (err, user){
    if(err){
      res.status(400).json(null);
      return;
    }
    res.json(user);
  });
};
