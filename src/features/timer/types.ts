export type Session = 'focus' | 'break' | 'rest';
type FocusSession = 25 | number;
type BreakTime = 5 | number;
type RestTime = 15 | number;

export type Timing = {
  focus: FocusSession;
  rest: RestTime;
  break: BreakTime;
};

export type Config = {
  timing: Timing;
  sessionsBeforeRest: number;
  sessions: Session[];
};

export type Timer = {
  config: Config;
  sessionNumber: number;
  currentSession: Session;
  time: number;
  isRunning: boolean;
  timerId: number | null;
  completedCycles: number;
  tomatoes: number;
  totalTomatoes: number;
};
