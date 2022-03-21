import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TaskItem } from 'features/tasks/types';

export const tasksSlice = createSlice({
  name: 'taskList',
  initialState: [] as TaskItem[],
  reducers: {
    createTask: {
      reducer: (state, action: PayloadAction<TaskItem>) => {
        state.push(action.payload);
      },
      prepare(content: string, isComplete: boolean) {
        return {
          payload: {
            id: nanoid(),
            content,
            isComplete,
          },
        };
      },
    },
    removeTask: (state, action: PayloadAction<{ id: string }>) =>
      state.filter((task) => task.id !== action.payload.id),

    updateTask: (state, action: PayloadAction<TaskItem>) => {
      const { id, content, isComplete } = action.payload;
      const existingTask = state.find((task) => task.id === id);

      if (existingTask) {
        existingTask.content = content;
        existingTask.isComplete = isComplete;
      }
    },
    removeCompleteTasks: (state) =>
      state.filter((task) => task.isComplete === false),
  },
});

export const { createTask, removeTask, updateTask, removeCompleteTasks } =
  tasksSlice.actions;

export default tasksSlice.reducer;
