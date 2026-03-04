import {isAnyOf} from '@reduxjs/toolkit';
import {
    init,
    start,
    pause,
    tick,
    nextSession,
    reset,
    cycleComplete,
} from '@/features/timer/timerSlice';
import type {Timer} from '@/features/timer/types';
import {appListener} from '@/store';

export const TIMER_STATE_KEY = 'timerState';
export const TIMER_CHANNEL_NAME = 'pomodoro-timer-sync';

let timerChannel: BroadcastChannel | null = null;

function getChannel(): BroadcastChannel | null {
    if (typeof window === 'undefined' || !('BroadcastChannel' in window)) return null;
    if (!timerChannel) {
        timerChannel = new BroadcastChannel(TIMER_CHANNEL_NAME);
    }
    return timerChannel;
}

/**
 * Broadcasts timer state to other tabs and persists to localStorage so new tabs can restore it.
 */
export function registerTimerBroadcastListener(middleware: typeof appListener) {
    middleware.startListening({
        matcher: isAnyOf(
            init,
            start,
            pause,
            tick,
            nextSession,
            reset,
            cycleComplete
        ),
        effect: (_action, listenerApi) => {
            const state = listenerApi.getState().timer;
            const channel = getChannel();
            if (channel) {
                try {
                    channel.postMessage(state);
                } catch {
                    // ignore
                }
            }
            try {
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(TIMER_STATE_KEY, JSON.stringify(state));
                }
            } catch {
                // ignore
            }
        },
    });
}

export function getTimerStateFromStorage(): unknown {
    if (typeof window === 'undefined') return null;
    try {
        const raw = window.localStorage.getItem(TIMER_STATE_KEY);
        return raw ? (JSON.parse(raw) as unknown) : null;
    } catch {
        return null;
    }
}

export function isTimerState(value: unknown): value is Timer {
    if (!value || typeof value !== 'object') return false;
    const o = value as Record<string, unknown>;
    return (
        typeof o.secondsLeft === 'number' &&
        typeof o.totalSeconds === 'number' &&
        typeof o.isRunning === 'boolean' &&
        (o.mode === 'focus' || o.mode === 'break' || o.mode === 'rest') &&
        typeof o.totalSessions === 'number' &&
        typeof o.currentSession === 'number'
    );
}
