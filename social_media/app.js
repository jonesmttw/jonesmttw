
/**
 * Module dependencies.
 */

var express = require('express');
var maps = require('./maps');
var http = require('http');
var https = require('https');
var path = require('path');
var oauth = require('oauth');
var io;

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.oauthRequestToken = '';
app.locals.oauthRequestTokenSecret = '';

var consumerKey = 'AtjRR0irISrnHxOAY69XDC0SP';
var consumerPrivateKey = 'FSQqPVoPwKUtdjnEzUP0X8NU3UQ9RWqNyChOH492atdg3YMhOZ';
var bearer_token;

var school_locations = { "Air Force" : {"lat": 38.8338816, "lng": -104.8213634 },"Akron" : {"lat": 41.0814447, "lng": -81.5190053 },"Alabama" : {"lat": 33.2098407, "lng": -87.5691735 },"UAB" : {"lat": 33.5206608, "lng": -86.80249 },"Appalachian State" : {"lat": 36.216795, "lng": -81.6745517 },"Arizona" : {"lat": 32.2217429, "lng": -110.926479 },"Arizona State" : {"lat": 33.4255104, "lng": -111.9400054 },"Arkansas" : {"lat": 36.0625795, "lng": -94.1574263 },"Arkansas State" : {"lat": 35.8422967, "lng": -90.704279 },"Army" : {"lat": 41.3914827, "lng": -73.9559721 },"Auburn" : {"lat": 32.6098566, "lng": -85.4807825 },"Ball State" : {"lat": 40.1933767, "lng": -85.3863599 },"Baylor" : {"lat": 31.549333, "lng": -97.1466695 },"Boise State" : {"lat": 43.6187102, "lng": -116.2146068 },"Boston College" : {"lat": 42.3303798, "lng": -71.166187 },"Bowling Green" : {"lat": 41.3747744, "lng": -83.6513229 },"Buffalo" : {"lat": 42.8864468, "lng": -78.8783689 },"BYU" : {"lat": 40.2338438, "lng": -111.6585337 },"California" : {"lat": 37.8715926, "lng": -122.272747 },"Fresno State" : {"lat": 36.7468422, "lng": -119.7725868 },"UCLA" : {"lat": 34.0522342, "lng": -118.2436849 },"UCF" : {"lat": 28.5383355, "lng": -81.3792365 },"Central Michigan" : {"lat": 43.5978075, "lng": -84.7675139 },"Cincinnati" : {"lat": 39.1031182, "lng": -84.5120196 },"Clemson" : {"lat": 34.6834382, "lng": -82.8373654 },"Colorado" : {"lat": 40.0149856, "lng": -105.2705456 },"Colorado State" : {"lat": 40.5852602, "lng": -105.084423 },"Connecticut" : {"lat": 41.8084314, "lng": -72.2495231 },"Duke" : {"lat": 35.9940329, "lng": -78.898619 },"Eastern Michigan" : {"lat": 42.2411499, "lng": -83.6129939 },"East Carolina" : {"lat": 35.612661, "lng": -77.3663538 },"Florida" : {"lat": 29.6516344, "lng": -82.3248262 },"Florida Atlantic" : {"lat": 26.3683064, "lng": -80.1289321 },"FIU" : {"lat": 25.7890972, "lng": -80.2040435 },"Florida State" : {"lat": 30.4382559, "lng": -84.2807329 },"Georgia" : {"lat": 33.95, "lng": -83.383333 },"Georgia Southern" : {"lat": 32.4487876, "lng": -81.7831674 },"Georgia State" : {"lat": 33.7489954, "lng": -84.3879824 },"Georgia Tech" : {"lat": 33.7489954, "lng": -84.3879824 },"Hawai'i" : {"lat": 21.3069444, "lng": -157.8583333 },"Houston" : {"lat": 29.7601927, "lng": -95.3693896 },"Idaho" : {"lat": 46.7323875, "lng": -117.0001651 },"Illinois" : {"lat": 40.1105875, "lng": -88.2072697 },"Indiana" : {"lat": 39.165325, "lng": -86.5263857 },"Iowa" : {"lat": 41.6611277, "lng": -91.5301683 },"Iowa State" : {"lat": 42.034722, "lng": -93.62 },"Kansas" : {"lat": 38.9716689, "lng": -95.2352501 },"Kansas State" : {"lat": 39.1836082, "lng": -96.5716694 },"Kent State" : {"lat": 41.1536674, "lng": -81.3578859 },"Kentucky" : {"lat": 38.0405837, "lng": -84.5037164 },"LSU" : {"lat": 30.4582829, "lng": -91.1403196 },"Louisiana Tech" : {"lat": 32.5232053, "lng": -92.637927 },"Louisiana-Lafayette" : {"lat": 30.2240897, "lng": -92.0198427 },"Louisiana-Monroe" : {"lat": 32.5093109, "lng": -92.1193012 },"Louisville" : {"lat": 38.2526647, "lng": -85.7584557 },"Marshall" : {"lat": 38.4192496, "lng": -82.445154 },"Maryland" : {"lat": 38.9896967, "lng": -76.93776 },"Massachusetts" : {"lat": 42.367, "lng": -72.517 },"Memphis" : {"lat": 35.1495343, "lng": -90.0489801 },"Miami (FL)" : {"lat": 25.72149, "lng": -80.2683838 },"Miami (OH)" : {"lat": 39.5069974, "lng": -84.745231 },"Michigan" : {"lat": 42.2808256, "lng": -83.7430378 },"Michigan State" : {"lat": 42.7369792, "lng": -84.4838654 },"Middle Tennessee" : {"lat": 35.8456213, "lng": -86.39027 },"Minnesota" : {"lat": 44.983334, "lng": -93.26667 },"Ole Miss" : {"lat": 34.3664951, "lng": -89.5192484 },"Mississippi State" : {"lat": 33.4503998, "lng": -88.8183872 },"Missouri" : {"lat": 38.9517053, "lng": -92.3340724 },"Navy" : {"lat": 38.9784453, "lng": -76.4921829 },"Nebraska" : {"lat": 40.809722, "lng": -96.675278 },"Nevada" : {"lat": 39.5296329, "lng": -119.8138027 },"UNLV" : {"lat": 36.1699412, "lng": -115.1398296 },"New Mexico" : {"lat": 35.110703, "lng": -106.609991 },"New Mexico State" : {"lat": 32.3199396, "lng": -106.7636538 },"North Carolina" : {"lat": 35.9131996, "lng": -79.0558445 },"NC State" : {"lat": 35.7795897, "lng": -78.6381787 },"North Texas" : {"lat": 33.2148412, "lng": -97.1330683 },"NIU" : {"lat": 41.9294736, "lng": -88.7503647 },"Northwestern" : {"lat": 42.0450722, "lng": -87.6876969 },"Notre Dame" : {"lat": 41.6763545, "lng": -86.2519898 },"Ohio" : {"lat": 39.3292396, "lng": -82.1012554 },"Ohio State" : {"lat": 39.9611755, "lng": -82.9987942 },"Oklahoma" : {"lat": 35.2225668, "lng": -97.4394777 },"Oklahoma State" : {"lat": 36.1156071, "lng": -97.0583681 },"Old Dominion" : {"lat": 36.8507689, "lng": -76.2858726 },"Oregon" : {"lat": 44.0520691, "lng": -123.0867536 },"Oregon State" : {"lat": 44.5645659, "lng": -123.2620435 },"Penn State" : {"lat": 40.7933949, "lng": -77.8600012 },"Pittsburgh" : {"lat": 40.4406248, "lng": -79.9958864 },"Purdue" : {"lat": 40.4258686, "lng": -86.9080655 },"Rice" : {"lat": 29.7601927, "lng": -95.3693896 },"Rutgers" : {"lat": 40.54564, "lng": -74.460817 },"San Diego State" : {"lat": 32.715738, "lng": -117.1610838 },"San Jose State" : {"lat": 37.3393857, "lng": -121.8949555 },"South Alabama" : {"lat": 30.6953657, "lng": -88.0398912 },"South Carolina" : {"lat": 34.0007104, "lng": -81.0348144 },"South Florida" : {"lat": 27.950575, "lng": -82.4571776 },"USC" : {"lat": 34.0522342, "lng": -118.2436849 },"SMU" : {"lat": 32.849444, "lng": -96.791944 },"Southern Miss" : {"lat": 31.3271189, "lng": -89.2903392 },"Stanford" : {"lat": 37.424106, "lng": -122.1660756 },"Syracuse" : {"lat": 43.0481221, "lng": -76.1474244 },"Temple" : {"lat": 39.952335, "lng": -75.163789 },"Tennessee" : {"lat": 35.9606384, "lng": -83.9207392 },"Texas" : {"lat": 30.267153, "lng": -97.7430608 },"Texas A&M" : {"lat": 30.627977, "lng": -96.3344068 },"TCU" : {"lat": 32.7554883, "lng": -97.3307658 },"Texas State" : {"lat": 29.8832749, "lng": -97.9413941 },"Texas Tech" : {"lat": 33.5778631, "lng": -101.8551665 },"UTEP" : {"lat": 31.7775757, "lng": -106.4424559 },"UTSA" : {"lat": 29.4241219, "lng": -98.4936282 },"Toledo" : {"lat": 41.6639383, "lng": -83.555212 },"Troy" : {"lat": 31.8087678, "lng": -85.969951 },"Tulane" : {"lat": 29.9510658, "lng": -90.0715323 },"Tulsa" : {"lat": 36.1539816, "lng": -95.992775 },"Utah" : {"lat": 40.7607793, "lng": -111.8910474 },"Utah State" : {"lat": 41.7369803, "lng": -111.8338359 },"Vanderbilt" : {"lat": 36.166667, "lng": -86.783333 },"Virginia" : {"lat": 38.0293059, "lng": -78.4766781 },"Virginia Tech" : {"lat": 37.2295733, "lng": -80.4139393 },"Wake Forest" : {"lat": 36.0998596, "lng": -80.244216 },"Washington" : {"lat": 47.6062095, "lng": -122.3320708 },"Washington State" : {"lat": 46.7297771, "lng": -117.1817377 },"West Virginia" : {"lat": 39.629526, "lng": -79.9558968 },"Western Kentucky" : {"lat": 36.9685219, "lng": -86.4808043 },"Western Michigan" : {"lat": 42.2917069, "lng": -85.5872286 },"Wisconsin" : {"lat": 43.0730517, "lng": -89.4012302 },"Wyoming" : {"lat": 41.3113669, "lng": -105.5911007 } };
var search_terms = ["Air Force","Akron","Alabama","UAB","Appalachian State","Arizona State","Arizona","Arkansas State","Arkansas","Army","Auburn","Ball State","Baylor","Boise State","Boston College","Bowling Green","Buffalo","BYU","California","Fresno State","UCLA","UCF","Central Michigan","Cincinnati","Clemson","Colorado State","Colorado","Connecticut","Duke","Eastern Michigan","East Carolina","Florida Atlantic","FIU","Florida State","Florida","Georgia Southern","Georgia State","Georgia Tech","Georgia","Hawai'i","Houston","Idaho","Illinois","Indiana","Iowa State","Iowa","Kansas State","Kansas","Kent State","LSU","Louisiana Tech","Louisiana-Lafayette","Louisiana-Monroe","Louisville","Marshall","Maryland","Massachusetts","Memphis","Miami (FL)","Miami (OH)","Michigan State","Middle Tennessee","Minnesota","Ole Miss","Mississippi State","Missouri","Navy","Nebraska","Nevada","UNLV","New Mexico State","New Mexico","North Carolina","NC State","North Texas","NIU","Northwestern","Notre Dame","Ohio State","Ohio","Oklahoma State","Oklahoma","Old Dominion","Oregon State","Oregon","Penn State","Pittsburgh","Purdue","Rice","Rutgers","San Diego State","San Jose State","South Alabama","South Carolina","South Florida","USC","SMU","Southern Miss","Stanford","Syracuse","Temple","Tennessee","Texas A&M","TCU","Texas State","Texas Tech","Texas","UTEP","UTSA","Toledo","Troy","Tulane","Tulsa","Utah","Utah State","Vanderbilt","Virginia Tech","Virginia","Wake Forest","Washington State","Washington","West Virginia","Western Kentucky","Western Michigan","Wisconsin","Wyoming","Kentucky","Michigan"];
var school_tweets = {"Air Force" : [],"Akron" : [],"Alabama" : [],"UAB" : [],"Appalachian State" : [],"Arizona State" : [],"Arizona" : [],"Arkansas State" : [],"Arkansas" : [],"Army" : [],"Auburn" : [],"Ball State" : [],"Baylor" : [],"Boise State" : [],"Boston College" : [],"Bowling Green" : [],"Buffalo" : [],"BYU" : [],"California" : [],"Fresno State" : [],"UCLA" : [],"UCF" : [],"Central Michigan" : [],"Cincinnati" : [],"Clemson" : [],"Colorado State" : [],"Colorado" : [],"Connecticut" : [],"Duke" : [],"Eastern Michigan" : [],"East Carolina" : [],"Florida Atlantic" : [],"FIU" : [],"Florida State" : [],"Florida" : [],"Georgia Southern" : [],"Georgia State" : [],"Georgia Tech" : [],"Georgia" : [],"Hawai'i" : [],"Houston" : [],"Idaho" : [],"Illinois" : [],"Indiana" : [],"Iowa State" : [],"Iowa" : [],"Kansas State" : [],"Kansas" : [],"Kent State" : [],"LSU" : [],"Louisiana Tech" : [],"Louisiana-Lafayette" : [],"Louisiana-Monroe" : [],"Louisville" : [],"Marshall" : [],"Maryland" : [],"Massachusetts" : [],"Memphis" : [],"Miami (FL)" : [],"Miami (OH)" : [],"Michigan State" : [],"Middle Tennessee" : [],"Minnesota" : [],"Ole Miss" : [],"Mississippi State" : [],"Missouri" : [],"Navy" : [],"Nebraska" : [],"Nevada" : [],"UNLV" : [],"New Mexico State" : [],"New Mexico" : [],"North Carolina" : [],"NC State" : [],"North Texas" : [],"NIU" : [],"Northwestern" : [],"Notre Dame" : [],"Ohio State" : [],"Ohio" : [],"Oklahoma State" : [],"Oklahoma" : [],"Old Dominion" : [],"Oregon State" : [],"Oregon" : [],"Penn State" : [],"Pittsburgh" : [],"Purdue" : [],"Rice" : [],"Rutgers" : [],"San Diego State" : [],"San Jose State" : [],"South Alabama" : [],"South Carolina" : [],"South Florida" : [],"USC" : [],"SMU" : [],"Southern Miss" : [],"Stanford" : [],"Syracuse" : [],"Temple" : [],"Tennessee" : [],"Texas A&M" : [],"TCU" : [],"Texas State" : [],"Texas Tech" : [],"Texas" : [],"UTEP" : [],"UTSA" : [],"Toledo" : [],"Troy" : [],"Tulane" : [],"Tulsa" : [],"Utah" : [],"Utah State" : [],"Vanderbilt" : [],"Virginia Tech" : [],"Virginia" : [],"Wake Forest" : [],"Washington State" : [],"Washington" : [],"West Virginia" : [],"Western Kentucky" : [],"Western Michigan" : [],"Wisconsin" : [],"Wyoming" : [],"Kentucky" : [],"Michigan" : []};


// have special condition search for things like georgia, falcons, tigers etc.
// falls into special condition test for "sec" or pac12 or team against 

function tweetToArray(tweet){
    for(var i = 0; i < search_terms.length; i++){
        if(tweet.text.indexOf(search_terms[i]) != -1){
            school_tweets[search_terms[i]].push(tweet.text);
            console.log(tweet.text);
            break;
        }
    }
}

function processTweets(data){
    var tweets = JSON.parse(data);
    for(var i = 0; i < tweets.statuses.length; i++){
        var t = tweets.statuses[i];
        if(t.geo) { console.log(t.geo) }
        tweetToArray(t);
    }
}

var twitter = new oauth.OAuth2(consumerKey, consumerPrivateKey, 'https://api.twitter.com/', null, 'oauth2/token', null);

twitter.getOAuthAccessToken('', {'grant_type':'client_credentials'}, function(e, access_token, refresh_token, results){
    bearer_token = access_token;
    
    var data = '';
    // var query = 'ncaa%20football', count = '50';
    var query = 'candle'
    var options = { hostname: 'api.twitter.com', path: '/1.1/search/tweets.json?q=' + query + '&count=' + count, headers: { Authorization: 'Bearer ' + bearer_token } };
    https.get(options, function(twitter_res){
        twitter_res.on('data', function(chunk){ data += chunk;});
        twitter_res.on('end', function(){ /* processTweets(data); */ });
    });
});

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/maps/css/maps.css', function(req, res){
    var p = path.join(__dirname, '\\' + req.path);
    res.sendfile(p);
});

app.get('/maps/js/maps.js', function(req, res){
    var p = path.join(__dirname, '\\' + req.path);
    res.sendfile(p);
});

app.get('/', function(req, res){
    res.render('map', {'title': 'Maps'});
});

//app.all('*', maps.index);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
