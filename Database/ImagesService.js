var mongoUtil = require('../Database/mongoUtil');
var db = mongoUtil.getDb();
let imagesCollection = db.collection("images");

module.exports = {

    create : function (image, callback) {
        imagesCollection.insertMany([image], (err, result) => {
            if (!err) {
                callback(result.ops);
            }
        });
    },

    getAllByUserId : function (username, callback) {
        //userId.toHexString()
        imagesCollection.find({'username': username}).toArray(function(err, docs) {
            callback(docs);
        });
    },
};

