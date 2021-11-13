import React, { FC, useState } from 'react';
import "./Task.scss";
import { Button, Checkbox, Typography } from 'antd';
import { ITodo } from '../../types/todos';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../../redux/todos-reducer';
const { Text } = Typography;


const Task: FC<ITodo> = ({...task}) => {
  const dispatch = useDispatch();
  const deleteCurrentTask = (id:string) => {
    dispatch(deleteTask(id));
  }
  
  return (
    <div className={task.cls}>
      <Checkbox
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={() => {dispatch(completeTask(task.id))}}
        id="checkbox-elem"
      />
      <Text
        disabled={task.completed}
      >{task.text}</Text>
      <Button
        className="task__remove"
        onClick={() => {deleteCurrentTask(task.id)}}
        danger={true}
        type="primary"
      >Delete</Button>
    </div>
  )
}

export default Task;