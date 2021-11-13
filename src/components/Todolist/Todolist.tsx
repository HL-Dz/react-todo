import React from 'react';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import Tasks from '../Tasks/Tasks';
import "./Todolist.scss";

const Todolist = () => {
  return (
    <div className="todolist">
      <h1 className="todolist__title">Todolist</h1>
      <AddTaskForm/>
      <Tasks/>
    </div>
  )
}

export default Todolist;