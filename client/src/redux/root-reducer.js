import {combineReducers} from "redux"
import {authReducer} from "./auth-reducer"

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

const appReducer = combineReducers({
    authReducer,
});


export default rootReducer;
