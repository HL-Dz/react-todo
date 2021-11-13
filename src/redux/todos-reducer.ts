import { Dispatch } from "redux";
import { delay } from "../helpers/helpers";
import {
  ITodo,
  TasksActionTypes,
  TaskAction,
  SetAllTasksAction,
  AddNewTaskAction,
  DeleteTaskAction,
  CompleteTaskAction
} from "../types/todos";

let initialState = {
  tasks: [] as Array<ITodo> | [],
  isLoading: false,
  isVisible: false
};

type TodosInitialState = typeof initialState;


const todosReducer = (state = initialState, action: TaskAction) :TodosInitialState  => {
  switch(action.type) {
    case TasksActionTypes.GET_TASKS:
      return {
        ...state,
        tasks: action.tasks
      }
    case TasksActionTypes.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.task]
      }
    case TasksActionTypes.COMPLETE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if(task.id !== action.id) {
            return task;
          } else {
            return {...task, completed: !task.completed}
          }
        })
      }
    case TasksActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      }
    default:
      return state
  }
};


// Action creators
const setAllTasksAC = (tasks : Array<ITodo> | []): SetAllTasksAction => ({
  type: TasksActionTypes.GET_TASKS,
  tasks
});
const addNewTaskAC = (task: ITodo): AddNewTaskAction => ({
  type: TasksActionTypes.ADD_TASK,
  task
});
const deleteTaskAC = (id:string): DeleteTaskAction => ({
  type: TasksActionTypes.DELETE_TASK,
  id
});
const completeTaskAC = (id: string) :CompleteTaskAction => ({
  type: TasksActionTypes.COMPLETE_TASK,
  id
});


// Thunks
export const getAllTasks = () => async(dispatch: Dispatch<TaskAction>) => {
  dispatch(setAllTasksAC([]));
}

export const addNewTask = (task:ITodo) => async (dispatch: Dispatch<TaskAction>) => {
  dispatch(addNewTaskAC(task));
}

export const completeTask = (id: string) => async (dispatch: Dispatch<TaskAction>) => {
  dispatch(completeTaskAC(id));
}

export const deleteTask = (id:string) => async (dispatch: Dispatch<TaskAction>) => {
  dispatch(deleteTaskAC(id));
}


export default todosReducer;