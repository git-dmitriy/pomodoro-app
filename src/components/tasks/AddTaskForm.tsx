import { createTask } from 'features/tasks/TasksSlice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
      dispatch(createTask(content, isComplete));
      setTask('');
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='task'>Задача:</label>
        <input
          type='text'
          id='task'
          value={content}
          onChange={onChangeHandler}
        />
        <button>Добавить задач</button>
      </form>
    </>
  );
};
