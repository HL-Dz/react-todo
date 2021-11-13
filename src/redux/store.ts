import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';

let rootReducer = combineReducers({});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export type RootState = ReturnType<typeof rootReducer>;

export default store;