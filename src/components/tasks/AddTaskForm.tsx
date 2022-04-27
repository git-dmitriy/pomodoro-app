import { createTask } from 'features/tasks/tasksSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TaskInputField } from 'components/ui/TaskInputField';

export const AddTaskForm = () => {
  const [content, setTask] = useState('');
  const isComplete = false;

  const dispatch = useDispatch();

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setTask(e.currentTarget.value);
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim().length !== 0) {
      dispatch(createTask(content.trim(), isComplete));
      setTask('');
    }
    setTask('');
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <TaskInputField value={content} onChange={onChangeHandler} />
      </form>
    </>
  );
};
