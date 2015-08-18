var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var db_url = 'mongodb://localhost:27017/test';

/* Query Examples */

// find ALL restaurants
var findRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

// find restaurants WHERE
var findFilteredRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find( { "borough": "Manhattan" } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

// find restaurants WHERE on multiple conditions
var findComboRestaurants = function(db, callback) {
	var cursor = db.collection('restaurants').find(
		{ "cuisine": "Italian", "address.zipcode": "10075" }
	);
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

// find boroughs with a sort order by zipcode - ORDER BY
var findSort = function(db, callback) {
	var cursor = db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		if (doc != null) {
			console.dir(doc);
		} else {
			callback();
		}
	});
};

// find all documents IN the array
var findin = function(db, ids, callback) {
	var cursor = db.collection('restaurants').find( { "borough":  { $in: ["Manhattan", "Bronx"] } } );
	cursor.each(function(err, doc) {
		assert.equal(err, null);
		console.log(doc);
		callback();
	});
};

MongoClient.connect(db_url, function(err, db) {
	assert.equal(null, err);
	findin(db, function() {
		db.close();
	});
});