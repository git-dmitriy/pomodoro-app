import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Config, SettingsState} from "@/features/settings/types.ts";


export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        showTasks: false,
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
        showTasks: (state) => {
            state.showTasks = true;
        },
        hideTasks: (state) => {
            state.showTasks = false;
        },
        setSettings: (state, action: PayloadAction<Config>) => {
            state.config = action.payload;
        },
    },
})

export const {showTasks, hideTasks, setSettings} = settingsSlice.actions

export default settingsSlice.reducer