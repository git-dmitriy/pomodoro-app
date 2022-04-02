import { useSelector } from 'react-redux';
import { AddTaskForm } from 'components/tasks/AddTaskForm';
import { TaskItem } from 'features/tasks/types';
import { TaskListItem } from 'components/tasks/TaskListItem';
import { useDispatch } from 'react-redux';
import { removeCompletedTasks } from 'features/tasks/tasksSlice';
import { MdDeleteSweep } from 'react-icons/md';
import styled from 'styled-components';
import { Button } from 'components/ui/Button';
import { useAppSelector } from 'app/hooks';

type Tasks = {
  tasks: TaskItem[];
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
`;

export const TasksList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useAppSelector((state: Tasks) => state.tasks);
  const completed = tasks.filter((task) => task.isComplete === true);
  const removeCompleteTasksHandler = () => dispatch(removeCompletedTasks());

  return (
    <Section>
      <AddTaskForm />
      {completed.length !== 0 ? (
        <Button onClick={removeCompleteTasksHandler}>
          <MdDeleteSweep />
        </Button>
      ) : (
        <Button disabled>
          <MdDeleteSweep />
        </Button>
      )}
      <Container>
        <ul>
          {tasks.map((item) => (
            <li key={item.id}>
              <TaskListItem {...item} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
