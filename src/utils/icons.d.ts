declare type StateShape = {
    muted: boolean;
    paused: boolean;
};
declare type IconConfigNotRequired = {
    can?: VideoCan;
    wrapper: HTMLElement;
    onMuteUnmute?: (() => void) | false;
    onPausePlay?: (() => void) | false;
    initialState?: StateShape;
};
declare type IconConfig = {
    can?: {
        unmute: boolean;
        pause: boolean;
    };
    wrapper: HTMLElement;
    onMuteUnmute: (() => void) | false;
    onPausePlay: (() => void) | false;
    initialState?: StateShape;
};
export default class Icons {
    config: IconConfig;
    parent: HTMLElement;
    wrapper: HTMLElement;
    state: StateShape;
    muteUnmute?: HTMLButtonElement;
    muteUnmuteIcon?: HTMLImageElement;
    pausePlay?: HTMLButtonElement;
    pausePlayIcon?: HTMLImageElement;
    toggleMute: (() => void) | false;
    togglePause: (() => void) | false;
    constructor(config: IconConfigNotRequired);
    setupWrapper(): void;
    init(): void;
    updateState(prop: 'muted' | 'paused', val: boolean): void;
    handleStateChange(): void;
    syncMuteState(): void;
    syncPauseState(): void;
    handleMuteUnmuteClick(): void;
    handlePausePlay(): void;
}
export {};
