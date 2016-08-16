'use strict';

var orm = require("orm");

module.exports = function(app){
    app.use(orm.express("mysql://root:xxxxxx@localhost/elearn_dev", {
        define: function (db, models, next) {
            models.User = db.define("users", {
                uid: { type: 'serial', key: true },
                user_email: String
            });
            next();
        }
    }));
};
