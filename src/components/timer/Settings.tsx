import {
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
    ChangeEvent,
    SyntheticEvent,
} from 'react';
import {Config} from '@/features/timer/types';
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
import * as settings from '@/features/settings/settingsSlice';
import * as timer from "@/features/timer/timerSlice.ts";

type P = {
    setShowSettings: Dispatch<SetStateAction<boolean>>;
};

export const Settings = ({setShowSettings}: P) => {
    const {config} = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    const maxSessionsLimit = 4;
    const minSessionsLimit = 2;
    const minTimeLimit = 5;
    const maxTimeLimit = 60;

    const [localConfig, setLocalConfig] = useLocalStorage<Config>('config', config);
    const [timing, setTiming] = useState(localConfig.timing);
    const [sessions, setSessions] = useState(config.sessions);

    useEffect(() => {
        document.addEventListener("keyup", handleEscEvent);

        return () => {
            document.removeEventListener('keyup', handleEscEvent);
        }
    }, []);

    const handleEscEvent = (event:KeyboardEvent) => {
        if (event.key === 'Escape') {
            closeSettings();
        }
    }

    const onChangeTimingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {
            if (parseInt(e.target.value, 10) < minTimeLimit) {
                setTiming({...timing, [e.target.name]: minTimeLimit});
            } else if (parseInt(e.target.value, 10) > maxTimeLimit) {
                setTiming({...timing, [e.target.name]: maxTimeLimit});
            } else {
                setTiming({...timing, [e.target.name]: parseInt(e.target.value, 10)});
            }
        }
    };

    const onChangeSessionsHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {

            // todo: create checkLimits helper
            /* checkLimits({value, max, min})
            *
            * */
            if (parseInt(e.target.value, 10) < minSessionsLimit) {
                setSessions(minSessionsLimit);
            } else if (parseInt(e.target.value, 10) > maxSessionsLimit) {
                setSessions(maxSessionsLimit);
            } else {
                setSessions(parseInt(e.target.value, 10));
            }
        }
    };

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(settings.setSettings({
            timing,
            sessions
        }))

        // todo: возможно, лучше перенести это в listener middleware
        setLocalConfig({
            timing,
            sessions,
        });

        dispatch(timer.init({
            timing,
            sessions
        }))
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
                        min={minTimeLimit}
                        max={maxTimeLimit}
                        step={5}
                        label='Фокусировка'
                        value={timing.focus}
                        onChangeHandler={onChangeTimingHandler}
                    />
                    <InputNumber
                        id='break'
                        name='break'
                        min={minTimeLimit}
                        max={maxTimeLimit}
                        step={5}
                        label='Перерыв'
                        value={timing.break}
                        onChangeHandler={onChangeTimingHandler}
                    />
                    <InputNumber
                        id='rest'
                        name='rest'
                        min={minTimeLimit}
                        max={maxTimeLimit}
                        step={5}
                        label='Отдых'
                        value={timing.rest}
                        onChangeHandler={onChangeTimingHandler}
                    />
                </Fieldset>

                <Fieldset legend='Количество сессий:'>
                    <InputNumber
                        id='sessions'
                        name='sessions'
                        min={minSessionsLimit}
                        max={maxSessionsLimit}
                        step={1}
                        label='Помидорки'
                        value={sessions}
                        onChangeHandler={onChangeSessionsHandler}
                    />
                </Fieldset>
            </form>
        </SettingsContainer>
    );
};
