import { combineReducers, createStore, applyMiddleware  } from "redux";
import thunk from "redux-thunk";
import auth from './auth';
import interest from './ineterst';
import asset from "./asset";
import puzzle from "./puzzle";
import commitment from "./commitment";

const reducer = combineReducers({
    auth,
    interest,
    asset,
    puzzle,
    commitment
});

export default store = createStore(reducer, applyMiddleware(thunk));