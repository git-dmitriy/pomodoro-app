import { useAppDispatch } from 'app/hooks';
import { removeCompletedTasks } from 'features/tasks/tasksSlice';
import { useAppSelector } from 'app/hooks';
import { MdDeleteSweep } from 'react-icons/md';
import { Button } from 'components/ui/Button';
import { Tasks } from 'features/tasks/types';
import { FlexContainer } from 'components/ui/FlexContainer';
import styled from 'styled-components';

const Container = styled(FlexContainer)`
  padding-inline-end: 5px;

  @media ${({ theme }) => theme.media.sm} {
    padding-inline-end: 20px;
  }
`;

export const RemoveCompletedTasks = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state: Tasks) => state.tasks);
  const completed = tasks.filter((task) => task.isComplete === true);
  const removeCompleteTasksHandler = () => dispatch(removeCompletedTasks());

  return (
    <Container justifyContent='flex-end'>
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
