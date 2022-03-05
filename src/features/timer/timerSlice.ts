import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Config, Timer } from 'features/timer/types';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    config: {
      focus: 25,
      rest: 15,
      break: 5,
    },
    sessions: [
      'focus',
      'break',
      'focus',
      'break',
      'focus',
      'break',
      'focus',
      'rest',
    ],
    time: 0,
    currentSession: 0,
    isRunning: false,
    timerId: null,
    completedCycles: 0,
  } as Timer,

  reducers: {
    init: (state, action: PayloadAction<Config | null>) => {
      /*
        TODO:
          +* create time stamp

          * look into localstorage from component
            if have entries set custom config
            else use default
      */
      if (action.payload) {
        state.config = action.payload;
      }

      state.time = state.config[state.sessions[state.currentSession]] * 60;
    },

    start: (state, action) => {
      state.isRunning = true;
      state.timerId = action.payload;
    },

    tick: (state) => {
      if (state.currentSession === state.sessions.length - 1) {
        state.currentSession = 0;
        state.completedCycles += 1;
      }

      if (state.time === 0) {
        state.currentSession += 1;
        state.time = state.config[state.sessions[state.currentSession]] * 60;
      }

      state.time -= 1;
    },

    pause: (state) => {
      /* 
      TODO: abort setInterval
      save quantity of seconds in time field
      */
      state.timerId = null;
      state.isRunning = false;
    },

    reset: (state) => {
      state.timerId = null;
      state.isRunning = false;
      state.completedCycles = 0;
    },

    rest: (state) => {},

    setSettings: () => {
      /* 
        TODO: set new settings
        TODO: write settings to localstorage
        
        localStorage.setItem('config', action.payload)
      */
    },
  },
});

export const { init, start, tick, pause } = timerSlice.actions;

export default timerSlice.reducer;
