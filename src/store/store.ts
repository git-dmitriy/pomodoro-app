import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import timerReducer from '@/features/timer/timerSlice';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        timer: timerReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
