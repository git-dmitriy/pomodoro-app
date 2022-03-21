import { TaskItem } from 'features/tasks/types';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from 'features/tasks/tasksSlice';

export const TaskListItem = (task: TaskItem) => {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(task.content);
  const isComplete = useRef(task.isComplete);

  const dispatch = useDispatch();

  const onEditHandler = () => {
    setEdit(true);
  };

  const onSaveHandler = () => {
    dispatch(
      updateTask({ id: task.id, content, isComplete: isComplete.current })
    );
    setEdit(false);
  };

  const onRemoveHandler = () => {
    dispatch(removeTask({ id: task.id }));
  };

  const onCompleteHandler = () => {
    dispatch(
      updateTask({ id: task.id, content, isComplete: !isComplete.current })
    );
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  return (
    <div>
      <input
        type='text'
        value={content}
        disabled={edit ? false : true}
        onChange={onChangeHandler}
      />

      <button onClick={onRemoveHandler}>Удалить</button>

      <button onClick={onCompleteHandler}>
        {isComplete.current ? 'Невыполнено' : 'Выполнено'}
      </button>
      {edit ? (
        <button onClick={onSaveHandler}>Сохранить</button>
      ) : (
        <button onClick={onEditHandler}>Изменить</button>
      )}
    </div>
  );
};
