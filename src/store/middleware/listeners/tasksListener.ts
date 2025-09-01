import {isAnyOf} from "@reduxjs/toolkit";
import {createTask, removeCompletedTasks, removeTask, updateTask} from "@/features/tasks/tasksSlice.ts";
import {localStorageUtil} from "@/utils/localStorageUtil/localStorageUtil.ts";
import {TaskItem} from "@/features/tasks/types.ts";
import {appListener} from "@/store";

export function tasksListener(middleware: typeof appListener) {
    middleware.startListening({
        matcher: isAnyOf(
            createTask,
            removeTask,
            updateTask,
            removeCompletedTasks
        ),
        effect: async (action, listenerApi) => {
            void action;

            const state = listenerApi.getState();
            localStorageUtil.setItem<TaskItem[]>('tasks', state.tasks);
        },
    });
}
