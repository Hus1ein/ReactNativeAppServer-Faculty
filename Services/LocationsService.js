const mongoUtil = require('../Database/mongoUtil');
const db = mongoUtil.getDb();
let locationsCollection = db.collection("locations");

module.exports = {

    create : function (location, callback) {

        locationsCollection.insertMany([location], (err, result) => {
           if (!err) {
               callback(result.ops[0]);
           }
        });

    },

    findAll : function (callback) {

        locationsCollection.find({}).toArray(function(err, docs) {
            callback(docs);
        });

    },
};

