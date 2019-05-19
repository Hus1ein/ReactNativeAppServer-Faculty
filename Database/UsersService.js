var mongoUtil = require('../Database/mongoUtil');
var db = mongoUtil.getDb();
let usersCollection = db.collection("users");

module.exports = {

    getUserByUsername : function (username, callback) {
        usersCollection.find({'username': username}).toArray(function(err, docs) {
            if (docs.length > 0) {
                callback(docs[0]);
            } else {
                callback(null);
            }
        });
    },

    validationUser : function (username, password, callback) {
        this.getUserByUsername(username, (user) => {
           if (user != null && user.password === password) {
               callback(true);
           }  else {
               callback(false);
           }
        });
    },
};

