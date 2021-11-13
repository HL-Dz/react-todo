import { Dispatch } from "redux";
import { delay } from "../helpers/helpers";
import {
  ITodo,
  TodosActionTypes,
  TodosAction
} from "../types/todos";

let initialState = {
  todos: [
    {id: "1", text: 'fdahg', completed: false, cls: 'task'},
  ] as Array<ITodo> | [],
  isLoading: false,
  isVisible: false
};

type TodosInitialState = typeof initialState;


const todosReducer = (state = initialState, action: TodosAction) :TodosInitialState  => {
  switch(action.type) {
    case TodosActionTypes.GET_TASKS:
      return {
        ...state,
        todos: action.todos
      }
    default:
      return state
  }
};


// Action creators
const setAllTodos = (todos : Array<ITodo> | []) => ({
  type: TodosActionTypes.GET_TASKS,
  todos: todos
});


// Thunks



export default todosReducer;