import React, { PropTypes, Component } from 'react';
import GoogleMap from 'google-map-react';
import Places from './Places';
import controllable from 'react-controllables';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

export default class Map extends Component {
  
  static propTypes = {
    center: PropTypes.array, // @controllable
    zoom: PropTypes.number, // @controllable
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    greatPlaces: PropTypes.array
  };

  static defaultProps = {
    center: [18.989401, 73.117516],
    zoom: 9,
    greatPlaces: [
      { id: 'Panvel', lat: 18.989401, lng: 73.117516 },
      { id: 'Grant road east, Mumbai', lat: 18.962351, lng: 72.818313 }
    ]
  };
  
  
  constructor(props) {
    super(props);
    }

  _onChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  }

  _onChildClick = (key, childProps) => {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
  }
  
  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  }
  
  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  }
  
  
  render() {
    const places = this.props.greatPlaces
      .map(place => {
        const { id, ...coords } = place;

        return (
          <Places
            key={id}
            {...coords}
            text={id}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === id} />
        );
      });

    return (
      <GoogleMap
      style={{ height: '300px' }}
        // apiKey={YOUR_GOOGLE_MAP_API_KEY} // set if you need stats etc ...
        center={this.props.center}
        zoom={this.props.zoom}
        hoverDistance={K_SIZE / 2}
        onBoundsChange={this._onBoundsChange}
        onChildClick={this._onChildClick}
        onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave}
      >
        {places}
      </GoogleMap>
    );
  }
}

const K_SIZE = 40;
