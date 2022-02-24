import { useSelector } from 'react-redux';
import { AddTaskForm } from 'components/tasks/addTaskForm';

type TaskItem = {
  id: number;
  content: string;
  isComplete: boolean;
};

type Tasks = {
  tasks: TaskItem[];
};

export const TasksList: React.FC = () => {
  const tasks = useSelector((state: Tasks) => state.tasks);
  console.log('tasks:', tasks);

  return (
    <>
      <AddTaskForm />
      <ul>
        pupm-purum
        {tasks.map((item) => (
          <li key={item.id}>
            <div>{item.content}</div>
          </li>
        ))}
      </ul>
    </>
  );
};
