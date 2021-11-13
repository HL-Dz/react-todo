export enum TasksActionTypes {
  GET_TASKS = 'GET_TODOS',
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  COMPLETE_TASK = 'COMPLETE_TASK',
  SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface ITodo {
  id: string
  cls: string
  text: string
  completed: boolean
};

export interface SetIsLoadingAction {
  type: TasksActionTypes.SET_IS_LOADING
  isLoading: boolean
}

export interface SetAllTasksAction {
  type: TasksActionTypes.GET_TASKS
  tasks: Array<ITodo> | []
}

export interface AddNewTaskAction {
  type: TasksActionTypes.ADD_TASK
  task: ITodo
}

export interface CompleteTaskAction {
  type: TasksActionTypes.COMPLETE_TASK
  id: string
}

export interface DeleteTaskAction {
  type: TasksActionTypes.DELETE_TASK
  id: string
}



export type TaskAction = 
        SetIsLoadingAction |
        SetAllTasksAction |
        AddNewTaskAction |
        DeleteTaskAction |
        CompleteTaskAction;