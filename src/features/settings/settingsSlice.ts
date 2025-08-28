import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Config, SettingsState} from "@/features/settings/types.ts";


export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        showTasks: false,
        showSettings: false,
        isSoundOn: true,
        config: {
            timing: {
                focus: 25,
                rest: 15,
                break: 5,
            },
            sessions: 4,
        },
    } as SettingsState,
    reducers: {
        openTasks: (state) => {
            state.showTasks = true;
        },
        closeTasks: (state) => {
            state.showTasks = false;
        },
        openSettings: (state) => {
            state.showSettings = true;
        },
        closeSettings: (state) => {
            state.showSettings = false;
        },
        setSettings: (state, action: PayloadAction<Config>) => {
            state.config = action.payload;
        },
        loadSettings: (state, action: PayloadAction<Config>) => {
            state.config = action.payload;
        },
        setSoundSettings: (state, action: PayloadAction<boolean>) => {
            state.isSoundOn = action.payload;
        }
    },
})

export const {
    openTasks,
    closeTasks,
    openSettings,
    closeSettings,
    setSettings,
    loadSettings,
    setSoundSettings,
} = settingsSlice.actions

export default settingsSlice.reducer