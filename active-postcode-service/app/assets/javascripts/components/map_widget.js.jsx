var divStyle = {
  width: '1000px',
  height: '400px',
  
};

var MapWidget = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
    
  },

  componentDidMount: function(){
    var map = this.initMap();
    
    this.setState({map: map})
  },

  getDefaultProps: function(){
    return {
      width: 800,
      height: 400,
    }
  },

  getInitialState: function(){
    return {
      polygonData: null,
      map: null,
      postCodePolygons: null
    }

  },

  componentWillReceiveProps: function(nextProps)
  {
    this.getPolygonByTag(nextProps.shownPolygonByTag);
    this.setState({x: "x"});
    console.log(this.state.x);
  },

  getPolygonByTag: function(tag){
    var temp = getPostCodeByTag(tag);
    var postCodePolygons = getPolygonCoor(temp);
    console.log("tag: "+ tag +", postCodePolygons: " + postCodePolygons);
    this.setState({postCodeId: temp, postCodePolygons: postCodePolygons})
  },

  componentDidUpdate: function(prevProps, prevState){
    this.createNewPolygons(this.state.postCodePolygons)
  },

  createNewPolygons: function(polygonCoords){
    this.deleteAllPolygon();
    if (polygonCoords === null && polygonCoords === 'undefined')
    {
      return;
    }
    centerLat = 0;
    centerLng = 0;
    var drawingPolygon = [];
    for (var j = 0; j < polygonCoords.length; j++) {
      var sumLat = 0;
      var sumLng = 0;
      latlong = [];
      for (var i = 0; i < polygonCoords[j].length; i++) {
        sumLat += parseFloat(polygonCoords[j][i][1]);
        sumLng += parseFloat(polygonCoords[j][i][0]);
        latlong.push({lat:parseFloat(polygonCoords[j][i][1]), lng:parseFloat(polygonCoords[j][i][0])});
      };

      drawingPolygon.push(new google.maps.Polygon({
        paths: latlong,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }));

      centerLat += (sumLat / polygonCoords[j].length) ;
      centerLng += (sumLng / polygonCoords[j].length) ;

      drawingPolygon[drawingPolygon.length-1].setMap(this.state.map);
    };
    
    this.setState({focusLat: (centerLat / polygonCoords.length)});
    this.setState({focusLang: (centerLng / polygonCoords.length)});

    this.setState({polygonData: drawingPolygon});
    console.log(drawingPolygon);
    
  },

  deleteAllPolygon: function()
  {
    var polygons = this.state.polygonData;
    if (polygons !== null)
    {
      for (var i = 0; i < polygons.length; i++) {
        polygons[i].setMap(null);
      }
    }
  },

  initMap: function(){
    var newMap = new google.maps.Map(this.refs.mapCanvas.getDOMNode(), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });
    
    return newMap;
    
  },

  render: function() {
    return (
      <div ref="mapCanvas" style={divStyle} x={this.state.x}>
      </div>
    );
  }
});
