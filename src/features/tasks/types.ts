export type TaskItem = {
  id: string;
  content: string;
  isComplete: boolean;
};

export type Tasks = {
  tasks: TaskItem[];
};
