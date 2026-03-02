import {Action, isAnyOf} from '@reduxjs/toolkit';
import {cycleComplete, nextSession, pause, start, reset} from "@/features/timer/timerSlice";
import {openTasks, closeTasks, openSettings, closeSettings, setSettings} from "@/features/settings/settingsSlice";
import {loadAudio} from "@/utils/loadAudio";
import startAudio from '@/assets/sounds/start.mp3'
import stopAudio from '@/assets/sounds/pause.mp3'
import nextSessionAudio from '@/assets/sounds/next-session.mp3'
import resetAudio from '@/assets/sounds/reset.mp3'
import cycleCompleteAudio from '@/assets/sounds/cycle-complete.mp3'
import buttonSoftAudio from '@/assets/sounds/button_soft.mp3'
import {createTask, removeCompletedTasks, removeTask, updateTask} from "@/features/tasks/tasksSlice";
import toast from 'react-hot-toast';
import {appListener} from "@/store";

const {play: playSound} = loadAudio(startAudio);
const {play: nextSessionSound} = loadAudio(nextSessionAudio);
const {play: pauseSound} = loadAudio(stopAudio);
const {play: resetSound} = loadAudio(resetAudio);
const {play: completeCycleSound} = loadAudio(cycleCompleteAudio);
const {play: buttonSoftSound} = loadAudio(buttonSoftAudio);

function showNotification(title: string, body?: string) {
    if (typeof window === 'undefined') return;
    if (!('Notification' in window)) return;
    if (Notification.permission !== 'granted') return;

    try {
        new Notification(title, body ? {body} : undefined);
    } catch (error) {
        console.error('Notification error:', error);
    }
}


export function registerLoggingListeners(middleware: typeof appListener) {
    middleware.startListening({
        matcher: isAnyOf(
            start,
            pause,
            nextSession,
            reset,
            cycleComplete,
            openTasks,
            closeTasks,
            openSettings,
            closeSettings,
            createTask,
            removeTask,
            updateTask,
            removeCompletedTasks,
            setSettings
        ),
        effect: (action: Action, listenerApi) => {
            const state = listenerApi.getState();

            const isSoundOn = state.settings.config.isSoundOn === true;
            const isNotificationsOn = state.settings.config.isNotificationsOn === true;

            switch (action.type) {
                case 'timer/start':
                    if (isSoundOn) playSound();
                    toast('Таймер запущен', {
                        icon: '🚀'
                    });
                    if (isNotificationsOn) {
                        showNotification('Pomodoro', 'Таймер запущен');
                    }
                    break;
                case 'timer/pause':
                    if (isSoundOn) pauseSound();
                    toast('Таймер остановлен', {
                        icon: '✋'
                    });
                    if (isNotificationsOn) {
                        showNotification('Pomodoro', 'Таймер остановлен');
                    }
                    break;
                case 'timer/nextSession':
                    if (isSoundOn) nextSessionSound();
                    toast('Следующая сессия', {
                        icon: '⏳'
                    });
                    if (isNotificationsOn) {
                        showNotification('Pomodoro', 'Следующая сессия');
                    }
                    break;
                case 'timer/reset':
                    if (isSoundOn) resetSound();
                    toast.error('Таймер сброшен', {
                        icon: '🧹'
                    });
                    if (isNotificationsOn) {
                        showNotification('Pomodoro', 'Таймер сброшен');
                    }
                    break;
                case 'timer/cycleComplete':
                    if (isSoundOn) completeCycleSound();
                    toast.success('Сеанс завершен', {
                        icon: '🏁'
                    });
                    if (isNotificationsOn) {
                        showNotification('Pomodoro', 'Сеанс завершен');
                    }
                    break;
                case 'settings/setSettings':
                    if (isSoundOn) buttonSoftSound();
                    toast('Настройки сохранены', {
                        icon: '💾'
                    });
                    break;
                default:
                    if (isSoundOn) buttonSoftSound();
                    break;
            }
        }
    });
}