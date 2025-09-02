import {
    useState,
    useEffect,
    ChangeEvent,
    SyntheticEvent,
} from 'react';
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
import {checkLimits} from "@/utils/checkLimits";
import {Checkbox} from "@/components/ui/Checkbox.tsx";
import {Config} from "@/features/settings/types.ts";

export const Settings = () => {
    const {config} = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    const maxSessionsLimit = 4;
    const minSessionsLimit = 2;
    const minTimeLimit = 5;
    const maxTimeLimit = 60;

    const [localConfig] = useLocalStorage<Config>('config', config);
    const [timing, setTiming] = useState(localConfig.timer.timing);
    const [sessions, setSessions] = useState(config.timer.sessions);
    const [sounds, setSounds] = useState(localConfig.isSoundOn);

    useEffect(() => {
        document.addEventListener("keyup", handleEscEvent);

        return () => {
            document.removeEventListener('keyup', handleEscEvent);
        }
    }, []);

    const handleEscEvent = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeSettings();
        }
    }

    const onChangeTimingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {
            setTiming({
                ...timing,
                [e.target.name]: checkLimits({
                    value: parseInt(e.target.value, 10),
                    min: minTimeLimit,
                    max: maxTimeLimit
                })
            })
        }
    };

    const onChangeSessionsHandler = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {
            setSessions(checkLimits({
                value: parseInt(e.target.value, 10),
                max: maxSessionsLimit,
                min: minSessionsLimit,
            }));
        }
    };

    const onSubmitHandler = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(settings.setSettings({
            timer: {
                timing,
                sessions,
            },
            isSoundOn: sounds,
            showTasks: config.showTasks,
            showSettings: false
        }))
    };

    const closeSettings = () => {
        dispatch(settings.closeSettings());
    };

    function onChangeSounds() {
        setSounds(!sounds);
    }

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
                <Fieldset legend='Звук:'>
                    <FlexContainer $gap={'var(--unit-2)'}>
                        <Checkbox
                            $isChecked={sounds}
                            onClickHandler={onChangeSounds}
                        />
                        <p>Включить звук</p>
                    </FlexContainer>
                </Fieldset>
            </form>
        </SettingsContainer>
    );
};
