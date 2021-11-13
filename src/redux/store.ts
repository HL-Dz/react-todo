import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from 'redux-thunk';
import todosReducer from "./todos-reducer";

let rootReducer = combineReducers({
  todosPage: todosReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


export type RootState = ReturnType<typeof rootReducer>;

export default store;