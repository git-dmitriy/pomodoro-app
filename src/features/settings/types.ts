export interface SettingsState {
    config: Config,
}

export type Config = {
    timer: {
        timing: Timing,
        sessions: number,
    }
    showTasks: boolean,
    showSettings: boolean,
    isSoundOn: boolean,

}

type Timing = {
    focus: number,
    rest: number,
    break: number,
}