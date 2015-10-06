// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require twitter/bootstrap
//= require turbolinks
//= require react
//= require react_ujs
//= require components
//= require_tree .

var ready;
var state_id = "";

ready = (function() {
    reloadAvailableTags();

    $("#state").change(function(){
      state_id = document.getElementById('state').value;
      reloadAvailableTags();      
    })
  });

reloadAvailableTags = function() {
  var availableTags = [];
  var dataPostCodes = getDataPostCode();
  var dataSuburbs = getDataSuburb();

  for (var i = 0; i < dataPostCodes.length; i++) {
    availableTags.push(dataPostCodes[i].poa_code);
  };

  for (var i = 0; i < dataSuburbs.length; i++) {
    availableTags.push(dataSuburbs[i].name);
  };
  
  
  $("#pac-input").autocomplete({
    source: availableTags,
    select: function( event, ui ) {
        search_active(ui);
      },
  });
}

function testFunction(){

  alert("test");
}


getAvailableTags = function(stateId) {
  var availableTags = [];
  var dataPostCodes = getDataPostCodeByStateId(stateId);
  var dataSuburbs = getDataSuburbByStateId(stateId);

  for (var i = 0; i < dataPostCodes.length; i++) {
    availableTags.push(dataPostCodes[i].poa_code);
  };

  for (var i = 0; i < dataSuburbs.length; i++) {
    availableTags.push(dataSuburbs[i].name);
  };
  
  return availableTags;
}

getDataPostCodeByStateId = function(stateId) {
    var pathname = window.location.pathname; // Returns path only
    var url      = window.location.href; 
      var xmlHttp = new XMLHttpRequest();
  
      if (stateId == "") {
        xmlHttp.open( "GET", url + '/postcode.json', false ); // false for synchronous request
      } else {
        xmlHttp.open( "GET", url + '/postcodebystateid.json?stateId=' + stateId, false ); // false for synchronous request
      }
      xmlHttp.send( null );        
      return JSON.parse(xmlHttp.responseText);
};

getDataSuburbByStateId = function(stateId) {
    var pathname = window.location.pathname; // Returns path only
    var url      = window.location.href; 
      var xmlHttp = new XMLHttpRequest();
      if (stateId == "") {
        xmlHttp.open( "GET", url + '/suburb.json', false ); // false for synchronous request
      } else {
        xmlHttp.open( "GET", url + '/suburbbystateid.json?stateId=' + stateId, false ); // false for synchronous request
      }
      xmlHttp.send( null );
      return JSON.parse(xmlHttp.responseText);
};

$(document).ready(ready);
$(document).on('page:change', ready);

getDataPostCode = function() {
    var pathname = window.location.pathname; // Returns path only
    var url      = window.location.href; 
      var xmlHttp = new XMLHttpRequest();
  
      if (state_id == "") {
        xmlHttp.open( "GET", url + '/postcode.json', false ); // false for synchronous request
      } else {
        xmlHttp.open( "GET", url + '/postcodebystateid.json?stateId=' + state_id, false ); // false for synchronous request
      }
      xmlHttp.send( null );        
      return JSON.parse(xmlHttp.responseText);
};

getDataSuburb = function() {
    var pathname = window.location.pathname; // Returns path only
    var url      = window.location.href; 
      var xmlHttp = new XMLHttpRequest();
      if (state_id == "") {
        xmlHttp.open( "GET", url + '/suburb.json', false ); // false for synchronous request
      } else {
        xmlHttp.open( "GET", url + '/suburbbystateid.json?stateId=' + state_id, false ); // false for synchronous request
      }
      xmlHttp.send( null );
      return JSON.parse(xmlHttp.responseText);
};

search_active = function(ui) {
  var url      = window.location.href; 
  $.ajax({
        type: "GET",
        url: url + '/id.json',
        contentType: "application/json; charset=utf-8",
        data : {
          suburb: ui.item.value
        },
        dataType: "json",
        async: false,
        success: function (msg) {
          getCoor(msg);
        },
        error: function (xhr, status, error) { 

        }
    });
};

getPostCodeByTag = function(tag) {
  var x = null;
  var url      = window.location.href; 
  $.ajax({
        type: "GET",
        url: url + '/id.json',
        contentType: "application/json; charset=utf-8",
        data : {
          suburb: tag
        },
        dataType: "json",
        async: false,
        success: function (msg) {
          x = msg;

        },
        error: function (xhr, status, error) { 

        }
    });
  return x;
};

getStates = function () {
  var url      = window.location.href; 
  
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", url + '/states.json', false ); // false for synchronous request
  xmlHttp.send( null );
  return JSON.parse(xmlHttp.responseText);
  
}

getPolygonCoor = function (id) {
  var url      = window.location.href; 
  var x = null;
  $.ajax({
        type: "GET",
        url: url + '/api/post_code_geometries/'+id +'.json',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
          console.log(msg);
          x = msg;
        },
        error: function (xhr, status, error) { 

        }
    });
  return x;
}

getCoor = function (id) {
  var url      = window.location.href; 
  $.ajax({
        type: "GET",
        url: url + '/api/post_code_geometries/'+id +'.json',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function (msg) {
          searchDraw(msg);
        },
        error: function (xhr, status, error) { 

        }
    });
}

var drawingPolygon = [];
function searchDraw(polygon){
  var centerLat = 0;
  var centerLng = 0;
  if (drawingPolygon != [])
  {
      for (var i = 0; i < drawingPolygon.length; i++) {
        drawingPolygon[i].setMap(null);
      };
      drawingPolygon = [];
  }

  //  draw a polygon
  for (var j = 0; j < polygon.length; j++) {
    var sumLat = 0;
    var sumLng = 0;
    latlong = [];
    for (var i = 0; i < polygon[j].length; i++) {
      sumLat += parseFloat(polygon[j][i][1]);
      sumLng += parseFloat(polygon[j][i][0]);
      latlong.push({lat:parseFloat(polygon[j][i][1]), lng:parseFloat(polygon[j][i][0])});
    };

    drawingPolygon.push(new google.maps.Polygon({
      paths: latlong,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    }));

    centerLat += (sumLat / polygon[j].length) ;
    centerLng += (sumLng / polygon[j].length) ;

    drawingPolygon[drawingPolygon.length-1].setMap(gMap);
  };
  centerLat = centerLat / polygon.length;
  centerLng = centerLng / polygon.length;

  // Set Center Google Map after drawing the polygon
  gMap.setCenter(new google.maps.LatLng(centerLat, centerLng));
  gMap.setZoom(14);

}