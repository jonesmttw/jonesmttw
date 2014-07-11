###GitMap

I saw and example of how GitHub can render a map from a geojson at FMEUC 2014 and wanted to give it a shot.

After initially generating some geojson, I wanted to take it one step further and looked at how to style the map and geometry.  GitHub runs Leaflet.js in the background and has a few attributes it looks for to help you when styling geometry. The two I focused with (mainly because I was dealing with point geometry) was `marker-symbol` and `marker-color` 
```javascript
{"type":"Feature","geometry":{"type":"Point","coordinates":[-94.5772587,39.0988014]},"properties":{"name":"Kansas City","marker-color":"#00f","marker-symbol":"city"}}
```
[There's a map for that](https://github.com/blog/1528-there-s-a-map-for-that)

[GitHub Map Styling](https://help.github.com/articles/mapping-geojson-files-on-github)

With that you get the end result seen [here - gitmap](https://github.com/jonesmttw/dev_land/blob/master/geojs_map/gitmap.geojson)


