import {configureStore, ThunkAction, Action, createListenerMiddleware, TypedStartListening} from '@reduxjs/toolkit';
import tasksReducer from '@/features/tasks/tasksSlice';
import timerReducer from '@/features/timer/timerSlice';
import settingsReducer from '@/features/settings/settingsSlice.ts';
import {registerAllListeners} from "@/store/middleware/listeners";

export const listenerMiddleware = createListenerMiddleware();

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        timer: timerReducer,
        settings: settingsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;
export const appListener = { startListening: startAppListening } as const;
registerAllListeners(appListener) ;

