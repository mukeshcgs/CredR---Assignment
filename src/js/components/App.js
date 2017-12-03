import React, { Component } from 'react';
import VehicleSearchContainer from '../containers/VehicleSearchContainer'
import { connect } from 'react-redux'

//import Map from './Map'
import Map2 from './Map2'

class App extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div class="container">
        <br />
        <div class="well">
          <h1>Vehicle List </h1>
        </div>
        <div class="row">
          <div class="col-md-9 col-sm-9">
            <Map2 />
          </div>
          <div class="col-md-3 col-sm-3">
            <VehicleSearchContainer />
          </div>
        </div>
      </div>
    );
  }
}

export default App