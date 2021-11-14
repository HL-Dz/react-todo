import React, { useState } from 'react';
import { Button, Input } from 'antd';
import './AddTaskForm.scss';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../../redux/todos-reducer';
const AddTaskForm = () => {
  const dispatch = useDispatch();
  const [taskValue, setTaskValue] = useState('');

  const createNewTask = () => {
    if(taskValue.trim()) {
      dispatch(addNewTask(taskValue));
      setTaskValue('');
    }
  }

  
  return (
    <div className="todo-form">
      <div className="form">
        <div className="form__wrap">
          <Input 
            placeholder="Add new task..."
            value={taskValue}
            onChange={(e) => {setTaskValue(e.target.value)}}
          />
          <Button type="primary" onClick={createNewTask}>Add task</Button>
        </div>
      </div>
    </div>
  )
}

export default AddTaskForm;