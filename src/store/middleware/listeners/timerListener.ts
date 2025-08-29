import {cycleComplete, nextSession, tick,} from '@/features/timer/timerSlice.ts';

export function registerTimerListener(middleware) {
    middleware.startListening({
        actionCreator: tick,
        effect: async (action, listenerApi) => {
            const state = listenerApi.getState();

            if (state.timer.secondsLeft === 0 && state.timer.isRunning) {
                if (state.timer.currentSession === state.timer.totalSessions) {
                    listenerApi.dispatch(cycleComplete(state.settings.config));
                } else {
                    listenerApi.dispatch(nextSession(state.settings.config));
                }
            }
        },
    });
}
