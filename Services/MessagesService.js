const mongoUtil = require('../Database/mongoUtil');
const db = mongoUtil.getDb();
let messagesCollection = db.collection("messages");

module.exports = {

    create : function (message, callback) {
        messagesCollection.insertMany([message], (err, result) => {
            if (!err) {
                callback(result.ops[0]);
            }
        });
    },

    findAll : function (firstUser, secondUser, callback) {
        messagesCollection.find({$or:[{'sender': firstUser, 'receiver': secondUser},{'sender': secondUser, 'receiver': firstUser}]}).toArray(function(err, docs) {
            callback(docs);
        });
    },
};

