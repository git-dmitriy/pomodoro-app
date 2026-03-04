import {useEffect} from 'react';
import {useAppDispatch} from '@/hooks/useAppDispatch';
import * as settings from '@/features/settings/settingsSlice';
import * as timer from '@/features/timer/timerSlice';
import * as tasks from '@/features/tasks/tasksSlice';
import {validateConfig} from '@/utils/validateConfig';
import type {TaskItem} from '@/features/tasks/types';

/**
 * Subscribes to localStorage 'storage' events (fired in other tabs) and syncs
 * config and tasks into this tab's Redux store.
 */
export function StorageSync() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleStorage = (e: StorageEvent) => {
            if (e.key === 'config' && e.newValue !== null) {
                try {
                    const parsed = JSON.parse(e.newValue) as unknown;
                    const config = validateConfig(parsed);
                    if (config) {
                        dispatch(settings.loadSettings(config));
                        dispatch(timer.init(config.timer));
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
