import {
    FETCH_VEHICLES,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FAILURE,
    RESET_NEWVEHICLES
} from '../actions/vihicleSearch';

const INITIAL_STATE = {
    vehicleSearchData: [], error: null, loading: false
};

export default function (state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case FETCH_VEHICLES:
            return { ...state, vehicleSearchData, loading: true }
        case FETCH_VEHICLES_SUCCESS:
            return { ...state, vehicleSearchData: action.payload, loading: false }
        case FETCH_VEHICLES_FAILURE:
            error = action.payload || { message: action.payload.message };//2nd one is network or server down errors
            return { ...state, vehicleSearchData: null, error: error, loading: false }

        default: return state;
    }
}