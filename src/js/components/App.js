import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import VehicleSearchContainer from '../containers/VehicleSearchContainer'


const AnyReactComponent = ({ img_src }) => <div><img src={img_src} className="YOUR-CLASS-NAME" style={{}} /></div>;


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
    }
  }

  componentDidMount() {
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

  render() {
    return (
      <div class="container">
        <div class="well">
          <h1>Vehicle List </h1>
        </div>
        <div class="row">
          <div class="col-md-9 col-sm-9"><GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            style={{ height: '300px' }}
          >
            {this.state.markers.map((marker, i) => {
              return (
                <AnyReactComponent key={marker.img_src}
                  lat={marker.lat}
                  lng={marker.lng}
                  img_src={marker.img_src}
                />)
            })}
          </GoogleMapReact>
          </div>
          <div class="col-md-3 col-sm-3">
            <VehicleSearchContainer />
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">


          </div>

        </div>
      </div>
    );
  }
}
App.defaultProps = {
  center: { lat: 19.075984, lng: 72.877656 },
  zoom: 2
};
export default App