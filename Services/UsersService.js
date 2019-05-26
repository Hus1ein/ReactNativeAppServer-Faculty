const mongoUtil = require('../Database/mongoUtil');
const {ObjectId} = require('mongodb');
const passwordEncryption = require('../Helpers/PasswordEncryption');

const db = mongoUtil.getDb();
const usersCollection = db.collection('users');

module.exports = {

    getUserByUsername : function (username, callback) {
        usersCollection.find({'username': username}).toArray(function(err, docs) {
            if (docs.length > 0) {
                let user = docs[0];
                user._id = user._id.toHexString();
                callback(user);
            } else {
                callback(null);
            }
        });
    },

    validationUser : function (username, password, callback) {
        this.getUserByUsername(username, (user) => {
           if (user != null && passwordEncryption.verifyPassword(password, user.password)) {
               callback(user);
           }  else {
               callback(null);
           }
        });
    },

    getUserById : function (userId, callback) {
        usersCollection.find({'_id': ObjectId(userId)}).toArray(function(err, docs) {
            if (docs.length > 0) {
                let user = docs[0];
                user._id = user._id.toHexString();
                callback(user);
            } else {
                callback(null);
            }
        });
    }
};

