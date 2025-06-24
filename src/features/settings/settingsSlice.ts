import { createSlice } from '@reduxjs/toolkit'
import {SettingsState} from "@/features/settings/types.ts";



export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        showTasks: false,
    } as SettingsState,
    reducers: {
        showTasks: (state) => {
            state.showTasks = true;
        },
        hideTasks: (state) => {
            state.showTasks = false;
        }
    },
})

export const { showTasks, hideTasks } = settingsSlice.actions

export default settingsSlice.reducer