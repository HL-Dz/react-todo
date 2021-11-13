export enum TodosActionTypes {
  GET_TASKS = 'GET_TODOS',
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  COMPLETE_TASK = 'COMPLETE_TASK'
}

export interface ITodo {
  id: string
  cls: string
  text: string
  completed: boolean
};

interface SetAllTodosAction {
  type: TodosActionTypes.GET_TASKS
  todos: Array<ITodo> | []
}



export type TodosAction = SetAllTodosAction;