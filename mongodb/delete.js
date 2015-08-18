var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var db_url = 'mongodb://localhost:27017/test';


/* Delete Examples */

// remove all documents that match the query
var removeMultipleRestaurants = function(db, callback) {
	db.collection('restaurants').deleteMany(
		{ "borough": "Manhattan" },
		function(err, results) {
			console.log(results);
			callback();
		}
	);
};

// remove the first document that matches the query
var removeRestaurants = function(db, callback) {
	db.collection('restaurants').deleteOne(
		{ "borough": "Queens" },
		function(err, results) {
			console.log(results);
			callback();
		}
	);
};

// drop collection 
var dropRestaurants = function(db, callback) {
	db.collection('restaurants').drop( function(err, response) {
		console.log(response)
		callback();
	});
};

MongoClient.connect(db_url, function(err, db){
	assert.equal(null, err);

	removeRestaurants(db, function(){
		db.close();
	});
});