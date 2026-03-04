import {useEffect, useRef} from 'react';
import * as timer from '@/features/timer/timerSlice';
import * as settings from '@/features/settings/settingsSlice';
import {Sessions} from '@/components/timer/Sessions';
import {ClockDial} from '@/components/timer/ClockDial';
import {Controls} from '@/components/timer/Controls';
import {Button} from '@/components/ui/Button';
import {Backdrop} from '@/components/ui/Backdrop';
import {RiSettings4Fill} from 'react-icons/ri';
import {createPortal} from "react-dom";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";
import {getValidatedConfig} from "@/utils/validateConfig";
import {
    getTimerStateFromStorage,
    isTimerState,
} from "@/store/middleware/listeners/timerBroadcastListener";

import {ShowTasksBtn} from "@/components/tasks/ShowTasksBtn";
import {ProgressRing} from "@/components/timer/ProgressRing";
import {Settings} from "@/components/timer/Settings";
import toast from 'react-hot-toast';

let TimerWorker: Worker | null;
if (typeof window !== 'undefined') {
    TimerWorker = window.Worker
        ? new Worker(new URL('../../workers/timerWorker.ts', import.meta.url))
        : null;
}

interface WorkerMessage {
    message: 'tick' | 'start' | 'stop' | 'error';
    error?: ErrorEvent;
}


export const TimerContainer = () => {
    const dispatch = useAppDispatch();
    const firstRender = useRef(true);

    const {
        secondsLeft,
        totalSeconds,
        totalSessions,
        currentSession,
        isRunning
    } = useAppSelector(
        (state) => state.timer
    );
    const {config} = useAppSelector((state) => state.settings);

    const workerRef = useRef<Worker | null>(null);
    const latestStateRef = useRef({isRunning, secondsLeft});
    latestStateRef.current = {isRunning, secondsLeft};

    useEffect(() => {
        if (firstRender.current) {
            const validatedConfig = getValidatedConfig();
            dispatch(settings.loadSettings(validatedConfig));

            const savedState = getTimerStateFromStorage();
            if (savedState !== null && isTimerState(savedState)) {
                dispatch(
                    timer.syncState({
                        ...savedState,
                        isRunning: false,
                    })
                );
            } else {
                dispatch(timer.init(validatedConfig.timer));
            }
            firstRender.current = false;
        }

        if (!TimerWorker) return;
        workerRef.current = TimerWorker;

        workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
            if (event.data.message === 'error') {
                console.error('Timer worker error:', event.data.error);
                toast.error('Ошибка таймера');
                dispatch(timer.pause());
                return;
            }
            if (event.data.message === 'tick') {
                const {isRunning: running, secondsLeft: left} = latestStateRef.current;
                if (running && left > 0) {
                    dispatch(timer.tick());
                }
            }
        };
    }, [dispatch]);

    useEffect(() => {
        if (!isRunning && workerRef.current) {
            workerRef.current.postMessage({message: 'stop'} as WorkerMessage);
        }
    }, [isRunning]);

    const toggleSettings = () => {
        dispatch(settings.openSettings())
    };

    const startHandler = () => {

        if (workerRef.current && !isRunning) {
            workerRef.current.postMessage({message: 'start'} as WorkerMessage);
            dispatch(timer.start());
        }
    };

    const pauseHandler = () => {
        if (workerRef.current) {
            workerRef.current.postMessage({message: 'stop'} as WorkerMessage);
            dispatch(timer.pause());
        }
    };

    const resetHandler = () => {
        if (workerRef.current) {
            workerRef.current.postMessage({message: 'stop'} as WorkerMessage);
            dispatch(timer.reset(config.timer));
        }
    };

    const switchToNextSession = () => {
        if (currentSession === totalSessions) {
            dispatch(timer.cycleComplete(config.timer));
        } else {
            dispatch(timer.nextSession(config.timer));
        }
    };

    return (
        <>
            <ProgressRing
                timeLeft={secondsLeft}
                isRunning={isRunning}
                totalTime={totalSeconds}
            >
                <Button onClick={toggleSettings}>
                    <RiSettings4Fill/>
                </Button>

                <ClockDial time={secondsLeft}/>

                <Sessions/>

                <Controls
                    startHandler={startHandler}
                    pauseHandler={pauseHandler}
                    resetHandler={resetHandler}
                    switchToNextSession={switchToNextSession}
                />

                <ShowTasksBtn/>

                {config.showSettings && createPortal(
                    <Backdrop>
                        <Settings/>
                    </Backdrop>, document.body)}
            </ProgressRing>
        </>
    );
};
