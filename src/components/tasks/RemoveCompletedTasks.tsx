import { useDispatch } from 'react-redux';
import { removeCompletedTasks } from 'features/tasks/tasksSlice';
import { useAppSelector } from 'app/hooks';
import { MdDeleteSweep } from 'react-icons/md';
import { Button } from 'components/ui/Button';
import { Tasks } from 'features/tasks/types';
import styled from 'styled-components';

const Container = styled.div`
  text-align: right;
  display: flex;
  justify-content: end;
  padding-right: 20px;

  @media (max-width: 640px) {
    padding-right: 5px;
  }
`;

export const RemoveCompletedTasks = () => {
  const dispatch = useDispatch();
  const tasks = useAppSelector((state: Tasks) => state.tasks);
  const completed = tasks.filter((task) => task.isComplete === true);
  const removeCompleteTasksHandler = () => dispatch(removeCompletedTasks());

  return (
    <Container>
      {completed.length !== 0 ? (
        <Button onClick={removeCompleteTasksHandler}>
          <MdDeleteSweep />
        </Button>
      ) : (
        <Button disabled>
          <MdDeleteSweep />
        </Button>
      )}
    </Container>
  );
};
