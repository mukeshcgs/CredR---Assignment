import React, { Component } from 'react';
import { Link, Route } from "react-router-dom"
import { fetchVehicles, fetchVehiclesSuccess, fetchVehiclesFailure } from '../actions/vihicleSearch';
import { connect } from 'react-redux';
import _ from 'lodash';

class VehicleSearchComponent extends Component {
    constructor() {
        super()
        this.state = { hover: false, address: '' }
        this.mouseOver = this.mouseOver.bind(this)
        this.mouseOut = this.mouseOut.bind(this)
    }
    componentWillMount() {
        this.props.fetchVehicles();
    }
    mouseOver = (address, dispatch) => {
        this.setState({ hover: true, address: address })
        console.log(address);
    }

    mouseOut = (id) => {
        this.setState({ hover: false, address: address })
    }

    renderVehicles(vehicleSearchData) {
        return vehicleSearchData.map((vehicle) => {
            return (
                <li
                    className="list-group-item"
                    key={vehicle.product_id}
                    onMouseEnter={() => this.mouseOver(vehicle.current_location_name)}
                >
                    <Link to={'/' + vehicle.product_id} >
                        <small>{vehicle.display_name}</small>
                        <p>{vehicle.current_location_name}</p>
                    </Link>
                </li>
            );
        });
    }

    render() {
        const { vehicleSearchData, loading, error } = this.props.vehicleSearchData;
        if (loading) {
            return <div className="container"><h1>Posts</h1><h3>Loading...</h3></div>
        } else if (error) {
            return <div className="alert alert-danger">Error: {error.message}</div>
        }
        return (<ul className="list-group">
            {this.renderVehicles(vehicleSearchData)}
        </ul>);
    }
}

export default VehicleSearchComponent;
