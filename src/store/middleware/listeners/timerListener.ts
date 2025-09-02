import {cycleComplete, nextSession, tick,} from '@/features/timer/timerSlice.ts';
import {appListener} from "@/store";

export function registerTimerListener(middleware: typeof appListener
) {
    middleware.startListening({
        actionCreator: tick,
        effect: async (action, listenerApi) => {
            void action;

            const state = listenerApi.getState();

            if (state.timer.secondsLeft === 0 && state.timer.isRunning) {
                if (state.timer.currentSession === state.timer.totalSessions) {
                    listenerApi.dispatch(cycleComplete(state.settings.config.timer));
                } else {
                    listenerApi.dispatch(nextSession(state.settings.config.timer));
                }
            }
        },
    });
}
