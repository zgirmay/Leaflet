const API_KEY = "pk.eyJ1Ijoiemdpcm1heSIsImEiOiJjanRsa3ExZHAwY2d3NGFvNnk5ZWxmaWVpIn0.0_x3qO9-aW3Ebr2CouUwFQ";
var myMap = L.map("map", {
    center: [37,-95],
    zoom: 3,
  });
  

    L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",{
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap); ;
   

  var queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
  d3.json(queryUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
  createMap(earthquakes);
}

  function markerSize(num) {
    return num;
  }
   var colors = ['red','blue','green','orange','yellow','purple']
  
  for (var i = 0; i < earthquakeData.features.length; i++) {
    var feature = earthquakeData.features[i];
    var coord = feature.geometry.coordinates;
    var magnitude = feature.properties.mag;
    var depth = feature.geometry.coordinates[2];
    if (magnitude < 1){
      col = colors[0]
    } else if (magnitude >= 1 && magnitude < 2){
      col = colors[1]
    } else if (magnitude >= 2 && magnitude < 3){
      col = colors[2]
    } else if (magnitude >= 3 && magnitude < 4){
      col = colors[3]
    } else if (magnitude >= 4 && magnitude < 5){
      col = colors[4]
    } else {
      col = colors[5]
    }
    L.circleMarker([loc[1], loc[0]], {
      fillOpacity: .6,
      color: "black",
      fillColor: col,
      weight: 1,
      radius: markerSize(magnitude)
    }).bindPopup("<h3>Magnitude : " + magnitude + "</h3>"+"<strong>Depth: </strong>" + depth + ' kilometers'+
        '<br>'+new Date(feature.properties.time) )
      .addTo(myMap);
  }
