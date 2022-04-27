import { TaskListItem } from 'components/tasks/TaskListItem';
import { useAppSelector } from 'app/hooks';
import styled from 'styled-components';
import { Tasks } from 'features/tasks/types';

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
  const tasks = useAppSelector((state: Tasks) => state.tasks);

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
