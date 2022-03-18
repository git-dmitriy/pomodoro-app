import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config, Timer, Session } from 'features/timer/types';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    config: {
      timing: {
        focus: 25,
        rest: 15,
        break: 5,
      },
      sessions: [],
      sessionsBeforeRest: 4,
    },
    time: 0,
    sessionNumber: 0,
    currentSession: 'focus',
    isRunning: false,
    timerId: null,
    completedCycles: 0,
    tomatoes: 0,
    totalTomatoes: 0,
  } as Timer,

  reducers: {
    init: (state, action: PayloadAction<Config>) => {
      state.config = action.payload;
      state.time = state.config.timing[state.currentSession] * 60;
    },

    start: (state, action) => {
      state.isRunning = true;
      state.timerId = action.payload;
    },

    tick: (state) => {
      state.time -= 1;
    },

    pause: (state) => {
      state.timerId = null;
      state.isRunning = false;
    },

    reset: (state) => {
      state.timerId = null;
      state.isRunning = false;
      state.completedCycles = 0;
      state.totalTomatoes = 0;
    },

    nextSession: (state, action: PayloadAction<Session>) => {
      state.time = state.config.timing[action.payload] * 60;
      state.currentSession = action.payload;
      state.sessionNumber += 1;
      if (action.payload === 'break' || action.payload === 'rest') {
        state.tomatoes += 1;
        state.totalTomatoes += 1;
      }
    },

    cycleComplete: (state) => {
      state.currentSession = 'focus';
      state.sessionNumber = 0;
      state.completedCycles += 1;
      state.tomatoes = 0;
      state.timerId = null;
      state.isRunning = false;
    },

    setSettings: (state, action: PayloadAction<Config>) => {
      state.config = action.payload;
    },
  },
});

export const { init, start, tick, pause, cycleComplete, nextSession } =
  timerSlice.actions;

export default timerSlice.reducer;
