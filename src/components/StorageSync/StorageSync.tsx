import {useEffect, useRef} from 'react';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import {useAppSelector} from '@/hooks/useAppSelector';
import * as settings from '@/features/settings/settingsSlice';
import * as timer from '@/features/timer/timerSlice';
import * as tasks from '@/features/tasks/tasksSlice';
import {validateConfig} from '@/utils/validateConfig';
import {isEqualObj} from '@/utils/isEqualObj';
import type {TaskItem} from '@/features/tasks/types';
import type {Timer} from '@/features/timer/types';
import type {TimerConfig} from '@/features/settings/types';
import {
    TIMER_CHANNEL_NAME,
    isTimerState,
} from '@/store/middleware/listeners/timerBroadcastListener';

/**
 * Subscribes to localStorage 'storage' events and BroadcastChannel for timer,
 * syncs config, tasks and timer state from other tabs into this tab's Redux store.
 */
export function StorageSync() {
    const dispatch = useAppDispatch();
    const currentTimerConfig = useAppSelector((state) => state.settings.config.timer);
    const timerConfigRef = useRef<TimerConfig>(currentTimerConfig);

    useEffect(() => {
        timerConfigRef.current = currentTimerConfig;
    }, [currentTimerConfig]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (!('BroadcastChannel' in window)) return;

        const channel = new BroadcastChannel(TIMER_CHANNEL_NAME);
        channel.onmessage = (e: MessageEvent<Timer>) => {
            if (isTimerState(e.data)) {
                dispatch(timer.syncState(e.data));
            }
        };
        return () => channel.close();
    }, [dispatch]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'config' && e.newValue !== null) {
                try {
                    const parsed = JSON.parse(e.newValue) as unknown;
                    const config = validateConfig(parsed);
                    if (config) {
                        dispatch(settings.loadSettings(config));
                        if (!isEqualObj(timerConfigRef.current, config.timer)) {
                            dispatch(timer.init(config.timer));
                        }
                    }
                } catch {
                    // ignore invalid config from other tab
                }
                return;
            }

            if (e.key === 'tasks' && e.newValue !== null) {
                try {
                    const parsed = JSON.parse(e.newValue) as TaskItem[];
                    if (Array.isArray(parsed)) {
                        dispatch(tasks.loadTasks(parsed));
                    }
                } catch {
                    // ignore invalid tasks from other tab
                }
            }
        };

        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [dispatch]);

    return null;
}
