import React, { PropTypes, Component } from 'react';
import scriptLoader from 'react-async-script-loader'
import { connect } from 'react-redux'

@scriptLoader(['https://maps.googleapis.com/maps/api/js?key=AIzaSyC2fgI8v3-pjcX-Mz-pNw-SjuhA-D1Cjq8'])

class Map2 extends Component {
    constructor(props) {
        super(props);
        this.map = null;
        this.state = { filtered: ["Mumbai"] }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isScriptLoaded && !this.props.isScriptLoaded) { // load finished
            if (nextProps.isScriptLoadSucceed) {
                let address = []
                if (this.props.vehicleSearchData.vehicleSearchData) {
                    const raw = this.props.vehicleSearchData.vehicleSearchData
                    var filtered = [];
                    for (var i = 0; i < raw.length; i++) {
                        if (raw[i].current_location_name) {
                            filtered.push(raw[i].current_location_name);
                        }
                        filtered = filtered.filter(function (item, index, inputArray) {
                            return inputArray.indexOf(item) == index;
                        });
                    }

                    address = filtered;

                    this.map = new google.maps.Map(this.refs.map, {
                        center: { lat: 10.794234, lng: 106.706541 },
                        zoom: 1
                    });
                    var geocoder = new google.maps.Geocoder();
                    geocodeAddress(geocoder, this.map);
                    function geocodeAddress(geocoder, resultsMap) {
                        for (var i = 0; i < address.length; i++) {
                            console.log(i)
                            geocoder.geocode({ 'address': address[i] }, function (results, status) {
                                console.log(results);

                                // if (results.length > 1) {
                                //     for (var ind = 0; ind < results.length; ind++) {
                                //         if (results[ind].address_components[4].long_name === "India") {
                                //             console.log("results India")
                                //         }
                                //     }
                                // }

                                if (status === 'OK') {
                                    const pos = {
                                        lat: results[0].geometry.location.lat(),
                                        lng: results[0].geometry.location.lng()
                                    };

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
                    }
                }
            }
            else this.props.onError()
        }
    }


    render() {

        return (
            <div>
                <div ref="map" style={{ height: '600px', width: '100%' }}></div>
                {!this.map && <div className="center-md">Loading...</div>}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        vehicleSearchData: state.vehicleSearchData,
        filtered: state.filtered
    };
}

export default connect(mapStateToProps)(Map2);
