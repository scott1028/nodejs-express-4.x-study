'use strict';

var Sequelize = require('sequelize');

// Or you can simply use a connection uri
var sequelize = new Sequelize('mysql://root:xxxxx@localhost:3306/elearn_dev');


// ORM Hook
module.exports = function(app){
    var Models = {};
    Models.User = sequelize.define('users', {
        uid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user_email: {
            type: Sequelize.STRING,
            field: 'user_email' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        user_status: {
            type: Sequelize.STRING
        }
    },
    {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });
    Models.UserPurchase = sequelize.define('user_purchase', {
        purchase_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        uid: {
            type: Sequelize.INTEGER
        },
        purchase_status: {
            type: Sequelize.STRING
        },
        product_code: {
            type: Sequelize.STRING
        },
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });
    Models.ProductParent = sequelize.define('product_parents', {
        pid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        product_code: {
            type: Sequelize.STRING
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        timestamps: false
    });
    //
    Models.User.hasMany(Models.UserPurchase, {
        foreignKey: 'uid',
    });
    Models.UserPurchase.belongsTo(Models.User, {
        foreignKey: 'uid',
    });
    Models.UserPurchase.belongsTo(Models.ProductParent, {
        foreignKey: 'product_code',
        targetKey: 'product_code'
    });

    // For Bookshelf.JS
    // Models.User = bookshelf.Model.extend({
    //     idAttribute: 'uid',
    //     tableName: 'users',
    //     userPurchases: function() {
    //         return this.hasMany(Models.UserPurchase, 'uid');
    //     },
    //     userWatches: function() {
    //         return this.hasMany(Models.UserWatch, 'watch_uid');
    //     }
    // });
    // Models.UserPurchase = bookshelf.Model.extend({
    //     idAttribute: 'purchases_id',
    //     tableName: 'user_purchase',
    //     user: function() {
    //         return this.belongsTo(Models.User, 'uid');
    //     }
    // });
    // Models.UserWatch = bookshelf.Model.extend({
    //     idAttribute: 'uwid',
    //     tableName: 'user_watch',
    //     user: function() {
    //         return this.belongsTo(Models.User, 'uid');
    //     },
    //     // use belongsTo to set non PK of Own table relation.
    //     productParent: function() {
    //         return this.belongsTo(Models.ProductParent, 'pid');
    //     }
    // });
    // Models.ProductParent = bookshelf.Model.extend({
    //     idAttribute: 'pid',
    //     tableName: 'product_parents',
    //     userWatches: function(){
    //         return this.hasMany(Models.UserWatch, 'pid');
    //     }
    // });
    app.use(function(req, res, next){
        req.Models = Models;
        next();
    });
};
