import { useSelector } from 'react-redux';
import { AddTaskForm } from 'components/tasks/AddTaskForm';
import { TaskItem } from 'features/tasks/types';
import { TaskListItem } from 'components/tasks/TaskListItem';
import { useDispatch } from 'react-redux';
import { removeCompleteTasks } from 'features/tasks/TasksSlice';

type Tasks = {
  tasks: TaskItem[];
};

export const TasksList: React.FC = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state: Tasks) => state.tasks);
  const completed = tasks.filter((task) => task.isComplete === true);

  const removeCompleteTasksHandler = () => dispatch(removeCompleteTasks());

  return (
    <>
      <AddTaskForm />
      <b>Не выполненные</b>
      <ul>
        pupm-purum
        {tasks.map((item, idx) => {
          if (item.isComplete === false) {
            return (
              <li key={idx}>
                <TaskListItem {...item} />
              </li>
            );
          }
          return null;
        })}
      </ul>
      <b>Выполненные</b>
      <ul>
        {tasks.map((item, idx) => {
          if (item.isComplete === true) {
            return (
              <li key={idx}>
                <TaskListItem {...item} />
              </li>
            );
          }
          return null;
        })}
      </ul>

      {completed.length !== 0 ? (
        <button onClick={removeCompleteTasksHandler}>
          Очистить выполненные задачи
        </button>
      ) : null}
    </>
  );
};
