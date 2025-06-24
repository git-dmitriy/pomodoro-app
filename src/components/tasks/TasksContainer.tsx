import {RemoveCompletedTasks} from '@/components/tasks/RemoveCompletedTasks';
import {TasksList} from '@/components/tasks/tasksList';
import styled from "styled-components";
import {AddTaskForm} from "@/components/tasks/AddTaskForm.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/store";

const Container = styled.article`
    inline-size: 100%;
    block-size: 100%;
    padding: var(--unit-4);
    display: grid;
    gap: var(--unit-2);
    grid-template-rows: auto 1fr;
    overflow: auto;
`;

const TasksHeader = styled.header`
    padding-inline-start: var(--unit-4);
    display: grid;
    grid-template: repeat(2, auto) / 1fr auto;
    grid-template-areas: 'title controls'
                        'add-task-form add-task-form';
    gap: var(--unit-3);
`;

const TaskHeading = styled.h2`
    grid-area: title;
    color: rgba(0, 0, 0, .3);
    font-size: 3rem;
`;

export const TasksContainer = () => {
    // const tasks = useAppSelector((state: Tasks) => state.tasks);

    const showTasks = useSelector((state: RootState) => state.settings.showTasks)
    const {tasks} = useSelector((state:RootState) => state);

    if (!showTasks) {
        return null;
    }

    return (
        <Container>
            <TasksHeader>
                <TaskHeading>Задачи ({tasks.length})</TaskHeading>
                <RemoveCompletedTasks/>
                <AddTaskForm/>
            </TasksHeader>
            <TasksList tasks={tasks} />
        </Container>
    );
};
