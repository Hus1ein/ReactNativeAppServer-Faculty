var mongoUtil = require('../Database/mongoUtil');
var db = mongoUtil.getDb();
let messagesCollection = db.collection("messages");

module.exports = {

    create : function (message, callback) {
        messagesCollection.insertMany([message], (err, result) => {
            if (!err) {
                callback(result.ops);
            }
        });
    },

    getAll : function (sender, receiver, callback) {
        messagesCollection.find({'sender': sender, 'receiver': receiver}).toArray(function(err, docs) {
            callback(docs);
        });
    },
};

