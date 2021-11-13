import React, { FC, useState } from 'react';
import "./Task.scss";
import { Button, Checkbox, Typography } from 'antd';
import { ITodo } from '../../types/todos';
import { useDispatch } from 'react-redux';
import { completeTask, deleteTask } from '../../redux/todos-reducer';
import { delay } from '../../helpers/helpers';
const { Text } = Typography;


const Task: FC<ITodo> = ({...task}) => {
  const dispatch = useDispatch();
  const [inActiveTask, setInactiveTask] = useState(false);

  const deleteCurrentTask = async (id:string) => {
    setInactiveTask(true)
    await delay(400);
    dispatch(deleteTask(id));
  }

  const cls = inActiveTask ? `${task.cls} ${task.cls}_inactive` : task.cls; 
  
  return (
    <div className={cls}>
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