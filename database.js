exports.initiatelDB = () => {
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

  // Connection URL
var url = 'mongodb://chatbot:chatbot@ds133331.mlab.com:33331/gyanvarsha';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  var cursor = db.collection('users_info').find( );
  cursor.each(function(err,doc){
      console.log(doc);
  })
  console.log("Connected successfully to MongoDb server");

  db.close();
});
}