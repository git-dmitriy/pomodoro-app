import React, { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from 'components/hooks/useLocalsotrage';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { init, setSettings } from 'features/timer/timerSlice';
import { Config, Session } from 'features/timer/types';

export const Settings = () => {
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

  return (
    <div>
      <h2>Настройки</h2>

      <form>
        <fieldset>
          <legend>Время:</legend>

          <label htmlFor='focus'>Фокусировка</label>
          <input
            type='number'
            id='focus'
            name='focus'
            min='5'
            max='60'
            step='5'
            required
            value={timing.focus}
            onChange={onChangeTimingHandler}
          />

          <label htmlFor='break'>Перерыв</label>
          <input
            type='number'
            id='break'
            name='break'
            min='5'
            max='60'
            step='5'
            required
            value={timing.break}
            onChange={onChangeTimingHandler}
          />

          <label htmlFor='rest'>Отдых</label>
          <input
            type='number'
            id='rest'
            name='rest'
            min='5'
            max='60'
            step='5'
            required
            value={timing.rest}
            onChange={onChangeTimingHandler}
          />
        </fieldset>

        <fieldset>
          <legend>Количество сессий:</legend>
          <label htmlFor='sessionsBeforeRest'>Отдых через</label>
          <input
            type='number'
            id='sessionsBeforeRest'
            name='sessionsBeforeRest'
            min='2'
            max='16'
            required
            value={sessionsBeforeRest}
            onChange={onChangeSessionsBeforeRestHandler}
          />
          <button onClick={onSubmitHandler}>Сохранить</button>
        </fieldset>
      </form>
    </div>
  );
};
