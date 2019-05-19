const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://hussain:1234@cluster0-ngx9o.mongodb.net/test?retryWrites=true";
var _db;

module.exports = {

    connectToServer: function( callback ) {
        MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
            _db  = client.db('react_native');
            return callback( err );
        } );
    },

    getDb: function() {
        return _db;
    }

};
