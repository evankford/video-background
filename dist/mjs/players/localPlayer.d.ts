import VideoPlayer from "../players/videoPlayer";
export declare class LocalPlayer extends VideoPlayer {
    source: LocalSource[];
    el?: HTMLVideoElement;
    lastWindowWidth: number;
    constructor(config: PlayerConfigInput);
    get playing(): boolean;
    get paused(): boolean;
    checkResize(): void;
    get currentTime(): number;
    get aspectRatio(): number;
    get muted(): boolean;
    build(): void;
    destroy(): void;
    mute(): Promise<void>;
    unmute(): Promise<void>;
    play(): Promise<boolean>;
    pause(): Promise<boolean>;
    resize(ratio?: number): boolean;
}
