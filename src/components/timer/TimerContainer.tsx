import {useState, useEffect, useRef} from 'react';
import * as timer from '@/features/timer/timerSlice';
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

let TimerWorker: unknown;
if (typeof window !== 'undefined') {
    TimerWorker = window.Worker
        ? new Worker(new URL('@/workers/timerWorker.js', import.meta.url))
        : null;
}

export const TimerContainer = () => {
    const dispatch = useAppDispatch();
    const [showSettings, setShowSettings] = useState(false);
    const firstRender = useRef(true);

    const {
        secondsLeft,
        totalSessions,
        currentSession,
        isRunning
    } = useAppSelector(
        (state) => state.timer
    );
    const {config} = useAppSelector((state) => state.settings);

    const workerRef = useRef<unknown>(null);
    const [localConfig ] = useLocalStorage<Config | null>('config', null );

    // const audio = new Audio(process.env.PUBLIC_URL + '/ding.mp3');

    useEffect(() => {

        if (firstRender.current) {
            if (localConfig) {
                dispatch(timer.init({
                    secondsLeft: localConfig.timing.focus * 60,
                    mode: 'focus',
                    totalSessions: localConfig.sessions * 2,
                    currentSession: 1,
                    isRunning: false,
                }));
            } else {
                dispatch(timer.init({
                    secondsLeft: config.timing.focus * 60,
                    mode: 'focus',
                    totalSessions: config.sessions * 2,
                    currentSession: 1,
                    isRunning: false,
                }))
            }
            firstRender.current = false;
        }

        if (!TimerWorker) return;
        workerRef.current = TimerWorker;
        console.log('workerRef.current', workerRef.current);

        workerRef.current.onmessage = (event: MessageEvent) => {
            console.log('message from worker', event.data);
            if (event.data.message === 'tick' && isRunning) {
                if (secondsLeft > 0) {
                    dispatch(timer.tick());
                }
            }
        }
    }, [isRunning, secondsLeft, dispatch]);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const startHandler = () => {

        if (workerRef.current && !isRunning) {
            workerRef.current.postMessage({message: 'start'});
            console.log('worker message post: start')
        }
        dispatch(timer.start());
    };

    const pauseHandler = () => {
        console.log('in pause handler');

        if (workerRef.current) {
            workerRef.current.postMessage({message: 'stop'});
            dispatch(timer.pause());
        }
    };

    const resetHandler = () => {
        if (workerRef.current) {
            workerRef.current.postMessage({message: 'stop'});

            dispatch(timer.init({
                secondsLeft: config.timing.focus * 60,
                mode: 'focus',
                totalSessions: config.sessions * 2,
                currentSession: 1,
                isRunning: false,
            }))
        }
    };

    const switchToNextSession = () => {
        if (currentSession === totalSessions) {
            dispatch(timer.cycleComplete({
                secondsLeft: config.timing.focus * 60,
                mode: 'focus',
                totalSessions: config.sessions * 2,
                currentSession: 1,
                isRunning: false,
            }));
        } else {
            dispatch(timer.nextSession(config));
        }
    };

    return (
        <>
            <ProgressRing timeLeft={secondsLeft}>
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

                {showSettings && createPortal(
                    <Backdrop>
                        <Settings setShowSettings={setShowSettings}/>
                    </Backdrop>, document.body)}
            </ProgressRing>
        </>
    );
};
