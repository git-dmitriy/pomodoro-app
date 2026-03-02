import {
    useState,
    useEffect,
    useCallback,
    ChangeEvent,
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
import {Checkbox} from "@/components/ui/Checkbox";
import {Config} from "@/features/settings/types";
import {validateConfig} from "@/utils/validateConfig";
import toast from "react-hot-toast";
import {MAX_SESSIONS, MAX_TIME, MIN_SESSIONS, MIN_TIME} from "@/utils/validateConfig/validateConfig.ts";

export const Settings = () => {
    const {config} = useAppSelector((state) => state.settings);
    const dispatch = useAppDispatch();

    const [rawConfig] = useLocalStorage<Config>('config', config);
    const safeConfig = validateConfig(rawConfig) ?? config;
    const [timing, setTiming] = useState(safeConfig.timer.timing);
    const [sessions, setSessions] = useState(safeConfig.timer.sessions);
    const [sounds, setSounds] = useState(safeConfig.isSoundOn);
    const [notifications, setNotifications] = useState(safeConfig.isNotificationsOn);

    const closeSettings = useCallback(() => {
        dispatch(settings.closeSettings());
    }, [dispatch]);

    useEffect(() => {
        const handleEscEvent = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeSettings();
            }
        };
        document.addEventListener("keyup", handleEscEvent);
        return () => {
            document.removeEventListener('keyup', handleEscEvent);
        };
    }, [closeSettings]);

    const onChangeTimingHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (
            e.target.value.trim().length !== 0 &&
            typeof parseInt(e.target.value, 10) === 'number'
        ) {
            setTiming({
                ...timing,
                [e.target.name]: checkLimits({
                    value: parseInt(e.target.value, 10),
                    min: MIN_TIME,
                    max: MAX_TIME
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
                max: MAX_SESSIONS,
                min: MIN_SESSIONS,
            }));
        }
    };

    const onSubmitHandler = async () => {

        let notificationsEnabled = notifications;

        if (notifications) {
            if (typeof window === 'undefined' || !('Notification' in window)) {
                toast.error('Браузер не поддерживает системные уведомления');
                notificationsEnabled = false;
            } else {
                try {
                    const permission = await Notification.requestPermission();
                    if (permission !== 'granted') {
                        toast.error('Уведомления не разрешены в браузере');
                        notificationsEnabled = false;
                    }
                } catch (error) {
                    console.error('Notification permission error:', error);
                    notificationsEnabled = false;
                }
            }
        }

        dispatch(settings.setSettings({
            timer: {
                timing,
                sessions,
            },
            isSoundOn: sounds,
            isNotificationsOn: notificationsEnabled,
            showTasks: config.showTasks,
            showSettings: false
        }))
    };

    function onChangeSounds() {
        setSounds(!sounds);
    }

    function onChangeNotifications() {
        setNotifications(!notifications);
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

            <form className='overflow-auto h-100'>
                <Fieldset legend='Время:'>
                    <InputNumber
                        id='focus'
                        name='focus'
                        min={MIN_TIME}
                        max={MAX_TIME}
                        step={5}
                        label='Фокусировка'
                        value={timing.focus}
                        onChangeHandler={onChangeTimingHandler}
                    />
                    <InputNumber
                        id='break'
                        name='break'
                        min={MIN_TIME}
                        max={MAX_TIME}
                        step={5}
                        label='Перерыв'
                        value={timing.break}
                        onChangeHandler={onChangeTimingHandler}
                    />
                    <InputNumber
                        id='rest'
                        name='rest'
                        min={MIN_TIME}
                        max={MAX_TIME}
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
                        min={MIN_SESSIONS}
                        max={MAX_SESSIONS}
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
                <Fieldset legend='Уведомления:'>
                    <FlexContainer $gap={'var(--unit-2)'}>
                        <Checkbox
                            $isChecked={notifications}
                            onClickHandler={onChangeNotifications}
                        />
                        <p>Включить системные уведомления</p>
                    </FlexContainer>
                </Fieldset>
            </form>
        </SettingsContainer>
    );
};
