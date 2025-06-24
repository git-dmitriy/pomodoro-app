import {removeCompletedTasks} from '@/features/tasks/tasksSlice';
import {MdDeleteSweep} from 'react-icons/md';
import {Button} from '@/components/ui/Button';
import {Tasks} from '@/features/tasks/types';
import styled from 'styled-components';
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";


const Container = styled.header`
    grid-area: controls;
    display: grid;
    justify-items: end;
    padding-inline: var(--unit-4);
`

export const RemoveCompletedTasks = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state: Tasks) => state.tasks);
    const completed = tasks.filter((task) => task.isComplete === true);
    const removeCompleteTasksHandler = () => dispatch(removeCompletedTasks());

    return (
        <Container>
            {completed.length !== 0 ? (
                <Button onClick={removeCompleteTasksHandler}>
                    <MdDeleteSweep/>
                </Button>
            ) : (
                <Button disabled>
                    <MdDeleteSweep/>
                </Button>
            )}
        </Container>
    );
};
