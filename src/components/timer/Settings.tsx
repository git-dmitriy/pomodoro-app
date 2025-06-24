import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    SyntheticEvent,
} from 'react';
import {init, setSettings} from '@/features/timer/timerSlice';
import {Config, Session} from '@/features/timer/types';
import {InputNumber} from '@/components/ui/InputNumber';
import {Button} from '@/components/ui/Button';
import {FaSave} from 'react-icons/fa';
import {RiCloseCircleFill} from 'react-icons/ri';
import {Fieldset} from '@/components/ui/Fieldset';
import {SettingsContainer} from '@/components/ui/SettingsContainer';
import {FlexContainer} from '@/components/ui/FlexContainer';
import {useLocalStorage} from "@/hooks/useLocalStorage";
import {useAppSelector} from "@/hooks/useAppSelector";
import {useAppDispatch} from "@/hooks/useAppDispatch";

type P = {
    setShowSettings: Dispatch<SetStateAction<boolean>>;
};

export const Settings = ({setShowSettings}: P) => {
    const {config} = useAppSelector((state) => state.timer);
    const dispatch = useAppDispatch();

    const [timing, setTiming] = useState(config.timing);
    const [sessions, setSessions] = useState(config.sessions);
    const [sessionsBeforeRest, setSessionsBeforeRest] = useState(
        config.sessionsBeforeRest
    );

    const [localConfig, setLocalConfig] = useLocalStorage<Config>('config', {
        timing,
        sessionsBeforeRest,
        sessions,
    });

    useEffect(() => {
        setSessions(generateSessions(sessionsBeforeRest));
        dispatch(setSettings(localConfig));
        dispatch(init(localConfig));


        document.addEventListener("keyup", handleEscEvent);

        return () => {
            document.removeEventListener('keyup', handleEscEvent);
        }
    }, [sessionsBeforeRest, localConfig]);

    const handleEscEvent = (event) => {
        if (event.key === 'Escape') {
            closeSettings();
        }
    }

    const generateSessions = (num: number): Session[] => {
        const sessions = [] as Session[];
        for (let i = 0; i < num; i++) {
            sessions.push('focus', 'break');
        }
        sessions.splice(-1, 1, 'rest');
        return sessions;
    };

    const onChangeTimingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {
            if (parseInt(e.target.value, 10) < 5) {
                setTiming({...timing, [e.target.name]: 5});
            } else if (parseInt(e.target.value, 10) > 60) {
                setTiming({...timing, [e.target.name]: 60});
            } else {
                setTiming({...timing, [e.target.name]: parseInt(e.target.value, 10)});
            }
        }
    };

    const onChangeSessionsBeforeRestHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {
            if (parseInt(e.target.value, 10) < 2) {
                setSessionsBeforeRest(2);
            } else if (parseInt(e.target.value, 10) > 16) {
                setSessionsBeforeRest(16);
            } else {
                setSessionsBeforeRest(parseInt(e.target.value, 10));
            }
        }
    };

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        setLocalConfig({
            timing,
            sessionsBeforeRest,
            sessions,
        });
    };

    const closeSettings = () => {
        setShowSettings(false);
    };

    return (
        <SettingsContainer>
            <FlexContainer $justifyContent='space-between' $alignItems='center'>
                <h2>Настройки</h2>
                <FlexContainer $justifyContent='center' $alignItems='center'>
                    <Button onClick={onSubmitHandler}>
                        <FaSave/>
                    </Button>
                    <Button onClick={closeSettings}>
                        <RiCloseCircleFill/>
                    </Button>
                </FlexContainer>
            </FlexContainer>

            <form>
                <Fieldset legend='Время:'>
                    <InputNumber
                        id='focus'
                        name='focus'
                        min={5}
                        max={60}
                        step={5}
                        label='Фокусировка'
                        value={timing.focus}
                        onChangeHandler={onChangeTimingHandler}
                    />
                    <InputNumber
                        id='break'
                        name='break'
                        min={5}
                        max={60}
                        step={5}
                        label='Перерыв'
                        value={timing.break}
                        onChangeHandler={onChangeTimingHandler}
                    />
                    <InputNumber
                        id='rest'
                        name='rest'
                        min={5}
                        max={60}
                        step={5}
                        label='Отдых'
                        value={timing.rest}
                        onChangeHandler={onChangeTimingHandler}
                    />
                </Fieldset>

                <Fieldset legend='Количество сессий:'>
                    <InputNumber
                        id='sessionsBeforeRest'
                        name='sessionsBeforeRest'
                        min={2}
                        max={4}
                        step={1}
                        label='Помидорки'
                        value={sessionsBeforeRest}
                        onChangeHandler={onChangeSessionsBeforeRestHandler}
                    />
                </Fieldset>
            </form>
        </SettingsContainer>
    );
};
