import {createListenerMiddleware} from '@reduxjs/toolkit';
import {cycleComplete, nextSession, tick,} from './timerSlice';

export const timerListener = createListenerMiddleware();

timerListener.startListening({
    actionCreator: tick,
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        console.log('state: ', state)

        // // После каждого тика проверяем, надо ли завершить
        if (state.timer.secondsLeft === 0 && state.timer.isRunning) {

            if (state.timer.currentSession === state.timer.totalSessions) {
                listenerApi.dispatch(cycleComplete(state.settings.config));
            } else {
                listenerApi.dispatch(nextSession(state.settings.config));
            }
        }
    },
});