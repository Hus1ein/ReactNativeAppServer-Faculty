const mongoUtil = require('../Database/mongoUtil');
const db = mongoUtil.getDb();
let imagesCollection = db.collection("images");

module.exports = {

    create : function (image, callback) {

        imagesCollection.insertMany([image], (err, result) => {
            if (!err) {
                callback(result.ops[0]);
            }
        });

    },

    findAll : function (username, callback) {

        imagesCollection.find({'username': username}).toArray(function(err, docs) {
            callback(docs);
        });

    },
};

