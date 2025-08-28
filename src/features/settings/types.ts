export interface SettingsState {
    showTasks: boolean,
    showSettings: boolean,
    isSoundOn: boolean,
    config: Config,
}

export type Config = {
    timing: Timing,
    sessions: number
}

type Timing = {
    focus: number,
    rest: number,
    break: number,
}