import { Dispatch } from "redux";
import { delay } from "../helpers/helpers";
import {
  ITodo,
  TasksActionTypes,
  TaskAction,
  SetAllTasksAction,
  AddNewTaskAction,
  DeleteTaskAction,
  CompleteTaskAction,
  SetIsLoadingAction,
} from "../types/todos";

let initialState = {
  tasks: [] as Array<ITodo> | [],
  isLoading: false,
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
          if(task.id !== action.task.id) {
            return task;
          } else {
            return {...task, ...action.task}
          }
        })
      }
    case TasksActionTypes.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id)
      }
    case TasksActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    default:
      return state
  }
};


// Action creators
const setIsLoading = (isLoading: boolean): SetIsLoadingAction => ({
  type: TasksActionTypes.SET_IS_LOADING,
  isLoading
})
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
const completeTaskAC = (task: ITodo) :CompleteTaskAction => ({
  type: TasksActionTypes.COMPLETE_TASK,
  task
});


// Thunks
export const getAllTasks = () => async (dispatch: Dispatch<TaskAction>) => {
  dispatch(setIsLoading(true));
  await delay(700);
  const response = await fetch('/tasks', {
    method: "GET",
    headers: {
      "Accept": "application/json"
    }
  });
  if(response.ok === true) {
    const tasks = await response.json();
    dispatch(setAllTasksAC(tasks));
    dispatch(setIsLoading(false));
  }
  dispatch(setIsLoading(false));
}

export const addNewTask = (text: string) => async (dispatch: Dispatch<TaskAction>) => {
  const response = await  fetch('/tasks', {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text
    })
  });
  if(response.ok === true) {
    const task = await response.json();
    dispatch(addNewTaskAC(task));
  }
}

export const completeTask = (id: string) => async (dispatch: Dispatch<TaskAction>) => {
  const res = await fetch('/tasks', {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: id
    })
  })

  if(res.ok === true) {
    const task = await res.json();
    dispatch(completeTaskAC(task));
  }
}

export const deleteTask = (id:string) => async (dispatch: Dispatch<TaskAction>) => {
  const res = await fetch('/tasks/' + id, {
    method: "DELETE",
    headers: { "Accept": "application/json" }
  });

  if(res.ok === true) {
    const task = await res.json();
    if(task) {
      dispatch(deleteTaskAC(task.id));
    }
  }
}


export default todosReducer;