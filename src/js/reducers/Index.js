import { combineReducers } from "redux"
import { reducer as formReducer  } from 'redux-form';

import vehicleSearchData from './vehicleSearch'


export default combineReducers({ vehicleSearchData});
