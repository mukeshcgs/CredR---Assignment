import { connect } from 'react-redux'
import { fetchVehicles, fetchVehiclesSuccess, fetchVehiclesFailure } from '../actions/vihicleSearch';
import VehicleSearchComponent from '../components/VehicleSearchComponent';

const mapStateToProps = (state) => {
  return {
    vehicleSearchData: state.vehicleSearchData
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchVehicles: () => {
      dispatch(fetchVehicles()).then((response) => {
        !response.error ? dispatch(fetchVehiclesSuccess(response.value.data.payload.results)) : dispatch(fetchVehiclesFailure(response.value.data.payload.results));
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleSearchComponent);