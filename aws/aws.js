var aws = require('aws-sdk');
var express = require('express');

var app = express();

aws.config.loadFromPath('config.json');

var s3 = new aws.S3();

s3.listObjects({ Bucket: 'jonesmttw', Prefix: 'jessica_photos' }, function (err, data) {
    if (err) console.log(err, err.stack);
    else processKeys(data);
})

function processKeys(items) {
    var arr = items.Contents;
    arr.forEach(function (key) {
        //console.log(key.Key);
    })
}

app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen('3000');