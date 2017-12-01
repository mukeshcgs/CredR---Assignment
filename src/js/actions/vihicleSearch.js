import axios from "axios";
import querystring from 'querystring'

//Fetch VehiclesSearch
export const FETCH_VEHICLES = 'FETCH_VEHICLES';
export const FETCH_VEHICLES_SUCCESS = 'FETCH_VEHICLES_SUCCESS';
export const FETCH_VEHICLES_FAILURE = 'FETCH_VEHICLES_FAILURE';
export const RESET_ACTIVE_VEHICLES = 'RESET_ACTIVE_VEHICLES';


/////////////////////////////////////////////////////////////////////////////////////////////////

const ROOT_URL = "https://api.credr.com/v1/product/search/?q=eyJwYWdlIjoxLCJjdXJyZW50X2NpdHlfaWQiOjJ9";
console.log(ROOT_URL);

export function fetchVehicles() {
  console.log("FETCH VEHICLES");
  const request = axios({
    method: 'get',
    url: "https://api.credr.com/v1/product/search/?q=eyJwYWdlIjoxLCJjdXJyZW50X2NpdHlfaWQiOjJ9",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  console.log(request);
  
  return {
    type: FETCH_VEHICLES,
    payload: request
  };
}

export function fetchVehiclesSuccess(vehicleSearchData) {
  console.log("FETCH VEHICLES SUCCESS");

  return {
    type: FETCH_VEHICLES_SUCCESS,
    payload: vehicleSearchData
  };
}

export function fetchVehiclesFailure(error) {
  console.log("FETCH VEHICLES FAILURE");

  return {
    type: FETCH_VEHICLES_FAILURE,
    payload: error
  };
}


