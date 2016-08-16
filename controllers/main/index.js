var db = require('../../db');

exports.index = function(req, res){
  // var startAt = new Date();
  // while(new Date - startAt < 6000){ }
  // // res.redirect('/users');
  res.json('test');
};

exports.list = function(req, res, next){
  req.session.test_value = 0;
  console.log('Invoke ORM!');
  req.models.User.find({uid: 1}, function (err, user){
    if(err){
      res.status(400).json(null);
      return;
    }

    // Blocking test result: The different client will be queued in line.
    // var startAt = new Date();
    // while(new Date - startAt < 5000){ }

    // Timer callback test result: The different client will not be queued in line.
    // setTimeout(function(){
    //   res.json(user);
    // }, 5000);
    // return;

    // normal
    res.json(user);
  });
};
