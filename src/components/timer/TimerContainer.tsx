import {useEffect, useRef} from 'react';
import * as timer from '@/features/timer/timerSlice';
import * as settings from '@/features/settings/settingsSlice';
import {Sessions} from '@/components/timer/Sessions';
import {ClockDial} from '@/components/timer/ClockDial';
import {Controls} from '@/components/timer/Controls';
import {Button} from '@/components/ui/Button';
import {Backdrop} from '@/components/ui/Backdrop';
import {RiSettings4Fill} from 'react-icons/ri';
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {createPortal} from "react-dom";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {useAppSelector} from "@/hooks/useAppSelector";

import {ShowTasksBtn} from "@/components/tasks/ShowTasksBtn.tsx";
import {ProgressRing} from "@/components/timer/PropgressRing.tsx";
import {Settings} from "@/components/timer/Settings.tsx";
import {Config} from "@/features/settings/types.ts";

let TimerWorker: Worker | null;
if (typeof window !== 'undefined') {
    TimerWorker = window.Worker
        ? new Worker(new URL('@/workers/timerWorker.js', import.meta.url))
        : null;
}

interface WorkerMessage {
    message: 'tick' | 'start' | 'stop';
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

    const workerRef = useRef<Worker>(null);
    const [localConfig] = useLocalStorage<Config | null>('config', null);

    useEffect(() => {

        if (firstRender.current) {

            if (localConfig) {
                dispatch(timer.init(localConfig.timer));
                dispatch(settings.loadSettings(localConfig))
            } else {
                dispatch(timer.init(config.timer))
            }
            firstRender.current = false;
        }

        if (!TimerWorker) return;
        workerRef.current = TimerWorker;

        workerRef.current.onmessage = (event: MessageEvent<WorkerMessage>) => {
            if (event.data.message === 'tick' && isRunning) {
                if (secondsLeft > 0) {
                    dispatch(timer.tick());
                }
            }
        }
    }, [isRunning, secondsLeft, localConfig, config, dispatch]);

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
