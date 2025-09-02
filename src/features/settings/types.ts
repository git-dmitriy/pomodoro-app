export type TimerConfig = {
    timing: Timing,
    sessions: number,
}

type Timing = {
    focus: number,
    rest: number,
    break: number,
}

export type Config = {
    timer: TimerConfig,
    showTasks: boolean,
    showSettings: boolean,
    isSoundOn: boolean,
}

export interface SettingsState {
    config: Config,
}
