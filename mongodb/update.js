var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var db_url = 'mongodb://localhost:27017/test';

/* Update Examples */

// finds the first document with the name 'Juni' and updates the values
var updateRestaurants = function(db, callback) {
	db.collection('restaurants').updateOne(
		{ "name" : "Juni" },
		{
			$set: { "cuisine": "American (New)" },
			$currentDate: { "lastModified": true }
		}, function(err, results) {
			console.log(results);
			callback();
	});
};

// updates all documents with the address.zipcode of '10016' and updates 
var updateMultipleRestaurants = function(db, callback){
	db.collection('restaurants').updateMany(
		{ "address.zipcode": "10016", cuisine: "Other" },
		{
			$set: { cuisine: "Category To Be Determined" },
			$currentDate: { "lastModified": true }
		}, function(err, results) {
			console.log(results);
			callback();
	});
};



MongoClient.connect(db_url, function(err, db){
	assert.equal(null, err);

	updateMultipleRestaurants(db, function(){
		db.close();
	});
});