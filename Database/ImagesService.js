var mongoUtil = require('../Database/mongoUtil');
var db = mongoUtil.getDb();
let imagesCollection = db.collection("images");

module.exports = {

    create : function (image, callback) {
        image.userId = image.userId.toHexString();
        imagesCollection.insertMany([image], (err, result) => {
            if (!err) {
                callback(result.ops);
            }
        });
    },

    getAllByUserId : function (userId, callback) {
        imagesCollection.find({'userId': userId.toHexString()}).toArray(function(err, docs) {
            callback(docs);
        });
    },
};

