var mongoUtil = require('../Database/mongoUtil');
var db = mongoUtil.getDb();
let locationsCollection = db.collection("locations");

module.exports = {

    create : function (location, callback) {
        location.person = location.person.toHexString();
        locationsCollection.insertMany([location], (err, result) => {
           if (!err) {
               callback(result.ops);
           }
        });
    },

    getAllByUserId : function (userId, callback) {
        locationsCollection.find({'person': userId.toHexString()}).toArray(function(err, docs) {
            callback(docs);
        });
    },
};

