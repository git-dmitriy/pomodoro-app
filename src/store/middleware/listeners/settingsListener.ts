import {appListener} from "@/store";
import {isAnyOf} from "@reduxjs/toolkit";
import {closeTasks, openTasks, setSettings} from "@/features/settings/settingsSlice";
import {localStorageUtil} from "@/utils/localStorageUtil";
import {Config} from "@/features/settings/types";
import {init} from "@/features/timer/timerSlice";
import {Timing} from "@/features/timer/types";
import {isEqualObj} from "@/utils/isEqualObj";

export function settingsListener(middleware: typeof appListener
) {
    middleware.startListening({
        matcher: isAnyOf(
            openTasks,
            closeTasks,
            setSettings
        ),
        effect: async (action, listenerApi) => {
            const state = listenerApi.getState();

            localStorageUtil.setItem<Config>('config', state.settings.config);

            if (action.type === 'settings/setSettings') {
                const prevState = listenerApi.getOriginalState()

                const timerConfig = state.settings.config.timer.timing;
                const prevTimerConfig = prevState.settings.config.timer.timing

                if (!isEqualObj<Timing | null>(prevTimerConfig, timerConfig)) {
                    listenerApi.dispatch(init(state.settings.config.timer));
                }
            }
        },
    });
}
