var mongoUtil = require('../Database/mongoUtil');
var db = mongoUtil.getDb();
let locationsCollection = db.collection("locations");

module.exports = {

    create : function (location, callback) {
        locationsCollection.insertMany([location], (err, result) => {
           if (!err) {
               callback(result.ops);
           }
        });
    },

    getAllByUserId : function (username, callback) {
        locationsCollection.find({}).toArray(function(err, docs) {
            callback(docs);
        });
    },
};

