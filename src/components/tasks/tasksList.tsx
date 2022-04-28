import { TaskListItem } from 'components/tasks/TaskListItem';
import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { useEffect, useRef } from 'react';
import { loadTasks } from 'features/tasks/tasksSlice';
import { useAppDispatch } from 'app/hooks';

const List = styled.ul`
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 20px;
  padding: 20px 20px 20px 5px;

  @media (max-width: 640px) {
    padding-right: 5px;
  }
`;

export const TasksList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state);
  const [tasksList, setTaskList] = useLocalStorage('tasks', tasks);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      dispatch(loadTasks(tasksList));
      firstRender.current = false;
    }
    setTaskList(tasks);
  }, [tasks]);

  return (
    <List>
      {tasks.map((item) => (
        <li key={item.id}>
          <TaskListItem {...item} />
        </li>
      ))}
    </List>
  );
};
