import {useAppSelector} from "@/hooks/useAppSelector";
import {RemoveCompletedTasks} from '@/components/tasks/RemoveCompletedTasks';
import {TasksList} from '@/components/tasks/tasksList';
import {Tasks} from '@/features/tasks/types';

export const TasksContainer = () => {
    const tasks = useAppSelector((state: Tasks) => state.tasks);

    return (
        <section>
            {tasks.length !== 0 && <RemoveCompletedTasks/>}
            <TasksList/>
        </section>
    );
};
