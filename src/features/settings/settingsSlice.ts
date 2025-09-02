import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Config, SettingsState} from "@/features/settings/types.ts";


export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        config: {
            showTasks: false,
            showSettings: false,
            isSoundOn: true,
            timer: {

                timing: {
                    focus: 25,
                    rest: 15,
                    break: 5,
                },
                sessions: 4,
            }
        },
    } as SettingsState,
    reducers: {
        openTasks: (state) => {
            state.config.showTasks = true;
        },
        closeTasks: (state) => {
            state.config.showTasks = false;
        },
        openSettings: (state) => {
            state.config.showSettings = true;
        },
        closeSettings: (state) => {
            state.config.showSettings = false;
        },
        setSettings: (state, action: PayloadAction<Config>) => {
            state.config = action.payload;
        },
        loadSettings: (state, action: PayloadAction<Config>) => {
            state.config = action.payload;
        },
    },
})

export const {
    openTasks,
    closeTasks,
    openSettings,
    closeSettings,
    setSettings,
    loadSettings,
} = settingsSlice.actions

export default settingsSlice.reducer