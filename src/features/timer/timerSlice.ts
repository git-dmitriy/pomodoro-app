import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timing, Timer, Session } from 'features/timer/types';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    config: {
      timing: {
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
    },
    time: 0,
    currentSession: 0,
    isRunning: false,
    timerId: null,
    completedCycles: 0,
    tomatoes: 0,
    totalTomatoes: 0,
  } as Timer,

  reducers: {
    /* 
        Редукторы должны  взаимодействовать с хранилищем
        и вычислять состояние на основе аргументов, не выполняя сайдэффектов

        ИНИЦИАЛИЗАЦИЯ (state, {payload:config})
          - setup timer

        СТАРТ (state, {payload: timerID})
          state.timerID = action.payload;

        ТИК
          - уменьшать количество секунд

        ПАУЗА
          - state.timerID = null;

        СЛЕДУЮЩАЯ СЕССИЯ (state, {payload: session}){
          if (action.payload === 'focus' ) {
            completeTomatoes += 1;
          }
        }
          - проиграть звук
          - определить следующую сессию
          - установить время для следующей сессии

        ЗАВЕРШЕНИЕ ЦИКЛА
          - 

        TODO: ИСПРАВИТЬ ХРАНИЛИЩЕ
              {
                config:{
                  timing:{
                    focus:25,
                    break:5,
                    rest:15,
                  },
                },
                currentSession: 0,
                completeTomatoes: 0,

              }
        TODO:
        TODO:
        TODO:
      */

    init: (state, action: PayloadAction<Timing | null>) => {
      /*
        TODO:
          +* create time stamp

          * look into localstorage from component
            if have entries set custom config
            else use default
      */
      if (action.payload) {
        state.config.timing = action.payload;
      }

      state.time =
        state.config.timing[state.config.sessions[state.currentSession]] * 60;
    },

    start: (state, action) => {
      state.isRunning = true;
      state.timerId = action.payload;
    },

    tick: (state) => {
      // decrease amount of seconds
      state.time -= 1;

      if (state.time === 0) {
        // increase tomatoes
        if (state.config.sessions[state.currentSession] === 'focus') {
          state.tomatoes += 1;
          state.totalTomatoes += 1;
        }
        // next session
        state.currentSession += 1;

        // complete cycle
        if (state.currentSession > state.config.sessions.length - 1) {
          state.currentSession = 0;
          state.completedCycles += 1;
          state.tomatoes = 0;
        }
        state.time =
          state.config.timing[state.config.sessions[state.currentSession]] * 60;
      }
    },

    pause: (state) => {
      state.timerId = null;
      state.isRunning = false;
    },

    reset: (state) => {
      state.timerId = null;
      state.isRunning = false;
      state.completedCycles = 0;
    },

    // nextSession: (state, action: PayloadAction<Session>) => {
    //   // action.payload = 'focus' | 'break' | 'rest'
    //   state.currentSession = action.payload;
    //   state.time = state.config.timing[action.payload] * 60;

    //   if (action.payload === 'break') {
    //     state.tomatoes += 1;
    //     state.totalTomatoes += 1;
    //   }
    // },

    cycleComplete: (state) => {
      state.completedCycles += 1;
      state.tomatoes = 0;
    },

    setSettings: (state, action) => {
      /* 
        TODO: set new settings
        TODO: write settings to localstorage
        
        localStorage.setItem('config', action.payload)
      */

      if (action.payload) {
        state.config = action.payload;
      }
    },
  },
});

export const { init, start, tick, pause, cycleComplete } = timerSlice.actions;

export default timerSlice.reducer;
