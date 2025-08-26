import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import timerReducer from '@/features/timer/timerSlice';
import settingsReducer from '@/features/settings/settingsSlice.ts';
import {timerListener} from "@/features/timer/timerListener.ts";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        timer: timerReducer,
        settings: settingsReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(timerListener.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
