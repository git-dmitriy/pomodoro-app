export type Session = number
type FocusSession = 25 | number;
type BreakTime = 5 | number;
type RestTime = 15 | number;

export type Timing = {
    focus: FocusSession;
    rest: RestTime;
    break: BreakTime;
};

export type Timer = {

    secondsLeft: number,
    mode: 'focus' | 'break' | 'rest',
    totalSessions: number,
    currentSession: number,
    isRunning: boolean,
};

export type Config = {
    timing: Timing,
    sessions: number,
}
