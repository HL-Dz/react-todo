import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import todosReducer from "./todos-reducer"

const rootReducer = combineReducers({
  todosPage: todosReducer
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))


export type RootState = ReturnType<typeof rootReducer>

export default store