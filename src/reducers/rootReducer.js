import authReducer from './authReducer';
import snackbarReducer from './snackbarReducer';
import {combineReducers} from 'redux';

//Combine all the sub reducers
const rootReducer = combineReducers({
    auth:authReducer,
    snackbar:snackbarReducer,
})

export default rootReducer