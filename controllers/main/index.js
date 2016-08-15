var db = require('../../db');

exports.index = function(req, res){
  res.redirect('/users');
};

exports.list = function(req, res, next){
  // res.render('list', { users: db.users });
  req.session.test_value = 0;
  res.json(db.users);
};
