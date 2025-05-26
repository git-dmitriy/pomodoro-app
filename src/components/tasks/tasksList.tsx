import {TaskListItem} from '@/components/tasks/TaskListItem';
import styled from 'styled-components';
import {useEffect, useRef} from 'react';
import {loadTasks} from '@/features/tasks/tasksSlice';
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";

const List = styled.ul`
    max-block-size: 80vh;
    overflow-block: auto;
    padding-inline: 5px 20px;
    padding-block: 20px;

    @media (max-width: 640px) {
        padding-inline: 20px 5px;
    }
`;

export const TasksList: React.FC = () => {
    const dispatch = useAppDispatch();
    const {tasks} = useAppSelector((state) => state);
    const [tasksList, setTaskList] = useLocalStorage('tasks', tasks);
    const firstRender = useRef(true);

    useEffect(() => {
        if (firstRender.current) {
            dispatch(loadTasks(tasksList));
            firstRender.current = false;
        }
        setTaskList(tasks);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks]);

    if (!tasksList.length) {
        return null;
    }

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
