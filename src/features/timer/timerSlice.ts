import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Timer, Config} from '@/features/timer/types';

export const timerSlice = createSlice({
    name: 'timer',
    initialState: {
        secondsLeft: 0,
        mode: 'focus',
        totalSessions: 8,
        currentSession: 1,
        isRunning: false,
    } as Timer,

    reducers: {
        init: (state, action: PayloadAction<Timer>) => {
            state.secondsLeft = action.payload.secondsLeft;
            state.mode = action.payload.mode;
            state.totalSessions = action.payload.totalSessions;
            state.currentSession = action.payload.currentSession;
            state.isRunning = action.payload.isRunning;
        },

        start: (state) => {
            state.isRunning = true;
        },

        pause: (state) => {
            state.isRunning = false;
        },

        tick: (state) => {
            if (state.secondsLeft > 0) {
                state.secondsLeft -= 1;
            }
        },

        nextSession: (state, action: PayloadAction<Config>) => {
            if (state.currentSession < state.totalSessions) {
                state.currentSession += 1;
                if (state.currentSession === state.totalSessions) {
                    state.mode = 'rest';
                    state.secondsLeft = action.payload.timing.rest * 60;
                } else if (state.currentSession % 2 === 0) {
                    state.mode = 'break';
                    state.secondsLeft = action.payload.timing.break * 60;
                } else {
                    state.mode = 'focus';
                    state.secondsLeft = action.payload.timing.focus * 60;
                }
            }
        },

        cycleComplete: (state, action: PayloadAction<Timer>) => {
            state.secondsLeft = action.payload.secondsLeft;
            state.mode = action.payload.mode;
            state.totalSessions = action.payload.totalSessions;
            state.currentSession = action.payload.currentSession;
            state.isRunning = false;
        },
    },
});

export const {
    init,
    start,
    tick,
    pause,
    cycleComplete,
    nextSession,
} = timerSlice.actions;

export default timerSlice.reducer;
