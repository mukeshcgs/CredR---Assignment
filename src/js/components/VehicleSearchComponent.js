import React, { Component } from 'react';
import { Link } from 'react-router';

import { fetchVehicles, fetchVehiclesSuccess, fetchVehiclesFailure } from '../actions/vihicleSearch';

class VehicleSearchComponent extends Component {
    componentWillMount() {
        this.props.fetchVehicles();
    }



    renderVehicles(vehicleSearchData) {
        return vehicleSearchData.map((vehicle) => {
            return (
                <li className="list-group-item" key={vehicle.vehicle_id}>
                    <h3 className="list-group-item-heading">{vehicle.display_name}</h3>
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
