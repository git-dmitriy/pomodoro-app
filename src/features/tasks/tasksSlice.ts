import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TaskItem} from '@/features/tasks/types';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [] as TaskItem[],
    reducers: {
        createTask: (state, action: PayloadAction<TaskItem>) => {
            state.push(action.payload);
        },

        removeTask: (state, action: PayloadAction<{ id: string }>) =>
            state.filter((task) => task.id !== action.payload.id),

        updateTask: (state, action: PayloadAction<TaskItem>) => {
            const {id, content, isComplete} = action.payload;
            const existingTask = state.find((task) => task.id === id);

            if (existingTask) {
                existingTask.content = content;
                existingTask.isComplete = isComplete;
            }
        },
        loadTasks: (state, action: PayloadAction<TaskItem[]>) => {
            void state;
            return action.payload;
        },
        removeCompletedTasks: (state) =>
            state.filter((task) => task.isComplete === false),
    },
});

export const {
    createTask,
    removeTask,
    updateTask,
    removeCompletedTasks,
    loadTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
