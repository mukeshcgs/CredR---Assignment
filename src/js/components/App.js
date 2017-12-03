import React, { Component } from 'react';
import VehicleSearchContainer from '../containers/VehicleSearchContainer'
//import Map from './Map'
import Script from 'react-load-script'
import scriptLoader from 'react-async-script-loader'

@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyC2fgI8v3-pjcX-Mz-pNw-SjuhA-D1Cjq8'])

class App extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      initialLocation: {
        address: 'London, United Kingdom',
        position: {
          latitude: 51.5085300,
          longitude: -0.1257400
        }
      },
      markers: [],
    }
  }
  componentWillReceiveProps({ isScriptLoaded, isScriptLoadSucceed }) {
    if (isScriptLoaded && !this.props.isScriptLoaded) { // load finished
      if (isScriptLoadSucceed) {

        ////////////////////////////////////////////////
        this.map = new google.maps.Map(this.refs.map, {
          center: { lat: 10.794234, lng: 106.706541 },
          zoom: 6
        });
        /////////////////////////////////////////////////
        var geocoder = new google.maps.Geocoder();

        geocodeAddress(geocoder, this.map);

        function geocodeAddress(geocoder, resultsMap) {
          console.log(resultsMap);

          var address = "Panvel";
          geocoder.geocode({ 'address': address }, function (results, status) {
            if (status === 'OK') {
              const pos = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              };

              //resultsMap.setCenter(pos);
              console.log(results);
              console.log(results[0].geometry.location.lat());
              console.log(results[0].geometry.location.lng());
              
              resultsMap.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                position: pos,
                map: resultsMap,
                title: results[0].formatted_address
              });


            } else {
              alert('Geocode was not successful for the following reason: ' + status);
            }
          });
        }
        ////////////////////////////////////////////
        // if (navigator.geolocation) {
        //   navigator.geolocation.getCurrentPosition((position) => {
        //     const pos = {
        //       lat: position.coords.latitude,
        //       lng: position.coords.longitude
        //     };

        //     this.map.setCenter(pos);

        //     const marker = new google.maps.Marker({
        //       position: pos,
        //       map: this.map,
        //       title: 'Hello World!'
        //     });
        //   }, () => {
        //     console.log('navigator disabled');
        //   });
        // } else {
        //   // Browser doesn't support Geolocation
        //   console.log('navigator disabled');
        // }
        ///////////////////////////////////////////////////////
      }
      else this.props.onError()
    }
  }
  // initMap() {
  //   console.log("asasas1111111111111111111111111111111111");
  //   if(this.state.scriptLoaded){
  //     console.log("ssss");
  //     map = new google.maps.Map(this.refs.map.getDOMNode(), {
  //   });
  //   }    
  // }


  // geocodeAddress(geocoder, resultsMap) {
  //   var address = document.getElementById('address').value;
  //   geocoder.geocode({'address': address}, function(results, status) {
  //     if (status === 'OK') {
  //       resultsMap.setCenter(results[0].geometry.location);
  //       var marker = new google.maps.Marker({
  //         map: resultsMap,
  //         position: results[0].geometry.location
  //       });
  //     } else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  // }
  componentDidMount() {
    //window.initMap = this.initMap;

    //console.log(window.initMap);
    // or you can set markers list somewhere else
    // please also set your correct lat & lng
    // you may only use 1 image for all markers, if then, remove the img_src attribute ^^
    this.setState({
      markers: [{
        lat: 19.075984,
        lng: 72.877656,
        img_src: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
      },
      ],
    });

  }


  // loadScript() {
  //   return <Script
  //     url="https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"
  //     onCreate={this.handleScriptCreate.bind(this)}
  //     onError={this.handleScriptError.bind(this)}
  //     onLoad={this.handleScriptLoad.bind(this)}
  //   />
  // }

  // handleScriptCreate() {
  //   this.setState({ scriptLoaded: false })
  // }

  // handleScriptError() {
  //   this.setState({ scriptError: true })
  // }

  // handleScriptLoad() {
  //   this.setState({ scriptLoaded: true })
  //   this.initMap
  // }
  render() {
    return (

      <div class="container">
        {/* {this.loadScript()} */}
        <br />

        <div class="well">
          <h1>Vehicle List </h1>
        </div>
        <div class="row">
          <div class="col-md-9 col-sm-9">
            {/* <Map /> */}
            <div>
              <div ref="map" style={{ height: '300px', width: '100%' }}></div>
              {!this.map && <div className="center-md">Loading...</div>}
            </div>
          </div>
          <div class="col-md-3 col-sm-3">
            <VehicleSearchContainer />
          </div>
        </div>
        <div class="row">

          <div class="col-md-9 col-sm-9">
          </div>

          <div class="col-md-3">
          </div>

        </div>
      </div>
    );
  }
}

export default App