import { createSlice } from '@reduxjs/toolkit';
import { Timer } from './types';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    config: {
      work: 25,
      rest: 15,
      break: 5,
    },
    session: 'work',
    time: 0,
    completedSessions: 0,
    isRunning: false,
    timerId: null,
  } as Timer,
  reducers: {
    init: (state, action) => {
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

      state.time = state.config[state.session] * 60;
    },

    start: (state, action) => {
      /* 
        start timer;
        ? Is this thing needed

      */
      state.isRunning = true;
      state.timerId = action.payload;
    },

    tick: (state) => {
      /* 

      TODO: 
        * reduce seconds on tick
        ! get timer id for aborting
        * when the time runs out set completed session + 1
        and change session to 'break'

      */

      state.time -= 1;
    },

    pause: (state) => {
      /* 
      TODO: abort setInterval
      save quantity of seconds in time filed
      */
      state.timerId = null;
      state.isRunning = false;
    },

    reset: (state) => {
      state.timerId = null;
      state.isRunning = false;
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
