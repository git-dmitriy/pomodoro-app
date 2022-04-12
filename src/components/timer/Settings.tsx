import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { init, setSettings } from 'features/timer/timerSlice';
import { Config, Session } from 'features/timer/types';
import { InputNumber } from 'components/ui/InputNumber';
import { FaSave } from 'react-icons/fa';
import { Button } from 'components/ui/Button';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Fieldset } from 'components/ui/Fieldset';
import { SettingsContainer } from 'components/ui/SettingsContainer';
import { SettingsHeader } from 'components/ui/SettingsHeader';
import { FlexRow } from 'components/ui/FlexRow';

type P = {
  setShowSettings: Dispatch<SetStateAction<boolean>>;
};

export const Settings = ({ setShowSettings }: P) => {
  const { config } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();
  const firstRender = useRef(true);

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
  }, [sessionsBeforeRest]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    dispatch(setSettings(localConfig));
    dispatch(init(localConfig));
    closeSettings();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localConfig]);

  const generateSessions = (num: number): Session[] => {
    let sessions = [] as Session[];
    for (let i = 0; i < num; i++) {
      sessions.push('focus', 'break');
    }
    sessions.splice(-1, 1, 'rest');
    return sessions;
  };

  const onChangeTimingHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.value.trim().length !== 0 &&
      typeof parseInt(e.target.value, 10) === 'number'
    ) {
      if (parseInt(e.target.value, 10) < 5) {
        setTiming({ ...timing, [e.target.name]: 5 });
      } else if (parseInt(e.target.value, 10) > 60) {
        setTiming({ ...timing, [e.target.name]: 60 });
      } else {
        setTiming({ ...timing, [e.target.name]: parseInt(e.target.value, 10) });
      }
    }
  };

  const onChangeSessionsBeforeRestHandler = (
    e: React.ChangeEvent<HTMLInputElement>
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
  const onSubmitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLocalConfig({
      timing,
      sessionsBeforeRest,
      sessions,
    });
  };

  const closeSettings = () => setShowSettings(false);

  return (
    <SettingsContainer>
      <SettingsHeader>
        <h2>Настройки</h2>
        <FlexRow>
          <Button onClick={onSubmitHandler}>
            <FaSave />
          </Button>
          <Button onClick={closeSettings}>
            <RiCloseCircleFill />
          </Button>
        </FlexRow>
      </SettingsHeader>

      <form>
        <Fieldset legend='Время'>
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
            max={16}
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
