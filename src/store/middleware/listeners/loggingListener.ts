import {Action, isAnyOf} from '@reduxjs/toolkit';
import {cycleComplete, nextSession, pause, start, reset} from "@/features/timer/timerSlice.ts";
import {openTasks, closeTasks, openSettings, closeSettings, setSettings} from "@/features/settings/settingsSlice.ts";

import {loadAudio} from "@/utils/loadAudio";
import startAudio from '@/assets/sounds/start.mp3'
import stopAudio from '@/assets/sounds/pause.mp3'
import nextSessionAudio from '@/assets/sounds/next-session.mp3'
import resetAudio from '@/assets/sounds/reset.mp3'
import cycleCompleteAudio from '@/assets/sounds/cycle-complete.mp3'
import buttonSoftAudio from '@/assets/sounds/button_soft.mp3'
import {createTask, removeCompletedTasks, removeTask, updateTask} from "@/features/tasks/tasksSlice.ts";

import toast from 'react-hot-toast';

const {play: playSound} = loadAudio(startAudio);
const {play: nextSessionSound} = loadAudio(nextSessionAudio);
const {play: pauseSound} = loadAudio(stopAudio);
const {play: resetSound} = loadAudio(resetAudio);
const {play: completeCycleSound} = loadAudio(cycleCompleteAudio);
const {play: buttonSoftSound} = loadAudio(buttonSoftAudio);


export function registerLoggingListeners(middleware) {
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

            const isSoundOn = state.settings.isSoundOn === true;

            switch (action.type) {
                case 'timer/start':
                    if (isSoundOn) playSound()
                    toast('Таймер запущен', {
                        icon: '🚀'
                    });
                    break;
                case 'timer/pause':
                    if (isSoundOn) pauseSound();
                    toast('Таймер остановлен', {
                        icon: '✋'
                    });
                    break;
                case 'timer/nextSession':
                    if (isSoundOn) nextSessionSound();
                    toast('Следующая сессия', {
                        icon: '⏳'
                    });
                    break;
                case 'timer/reset':
                    if (isSoundOn) resetSound();
                    toast.error('Таймер сброшен', {
                        icon: '🧹'
                    });
                    break;
                case 'timer/cycleComplete':
                    if (isSoundOn) completeCycleSound();
                    toast.success('Сеанс завершен', {
                        icon: '🏁'
                    });
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