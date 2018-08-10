'use strict';

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : 'xxxxx',
    database : 'elearn_dev',
    charset  : 'utf8'
  }
});
var bookshelf = require('bookshelf')(knex);


// ORM Hook
module.exports = function(app){
    var Models = {};
    Models.User = bookshelf.Model.extend({
        idAttribute: 'uid',
        tableName: 'users',
        userPurchases: function() {
            return this.hasMany(Models.UserPurchase, 'uid');
        },
        userWatches: function() {
            return this.hasMany(Models.UserWatch, 'watch_uid');
        }
    });
    Models.UserPurchase = bookshelf.Model.extend({
        idAttribute: 'purchases_id',
        tableName: 'user_purchase',
        user: function() {
            return this.belongsTo(Models.User, 'uid');
        }
    });
    Models.UserWatch = bookshelf.Model.extend({
        idAttribute: 'uwid',
        tableName: 'user_watch',
        user: function() {
            return this.belongsTo(Models.User, 'uid');
        },
        // use belongsTo to set non PK of Own table relation.
        productParent: function() {
            return this.belongsTo(Models.ProductParent, 'pid');
        }
    });
    Models.ProductParent = bookshelf.Model.extend({
        idAttribute: 'pid',
        tableName: 'product_parents',
        userWatches: function(){
            return this.hasMany(Models.UserWatch, 'pid');
        }
    });
    app.use(function(req, res, next){
        req.Models = Models;
        next();
    });
};
