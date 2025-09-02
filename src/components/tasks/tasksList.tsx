import {TaskListItem} from '@/components/tasks/TaskListItem';
import styled from 'styled-components';
import {TaskItem} from '@/features/tasks/types';

const List = styled.ul`
    scrollbar-gutter: stable;
    overflow-block: auto;
`;

type Props = {
    tasks: TaskItem[]
}

export const TasksList: React.FC<Props> = ({tasks}) => {

    return (
        <List>
            {tasks.map((item) => <TaskListItem key={item.id} {...item} />)}
        </List>
    );
};
