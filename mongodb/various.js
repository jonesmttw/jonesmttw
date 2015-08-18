var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var db_url = 'mongodb://localhost:27017/test';


/* Rename collection Example */

var rename = function(db, callback){
	db.collection('restaurants').rename('somenewname', function(err, d){
		assert.equal(err, null);
		callback();
	});
}


/* Data Aggregation Examples */

var aggregateRestaurants = function(db, callback) {
	db.collection('restaurants').aggregate(
		[
			{ $group: { "_id": "$borough", "count": { $sum: 1 } } }
		]
	).toArray(function(err, result) {
		assert.equal(err, null);
		console.log(result);
		callback(result);
	});
};