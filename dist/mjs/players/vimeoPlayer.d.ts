import Player from "@vimeo/player";
import VideoPlayer from "./videoPlayer";
export declare class VimeoPlayer extends VideoPlayer {
    source: string;
    player?: Player;
    wrapper: HTMLElement;
    constructor(config: PlayerConfigInput);
    unbuild(): void;
    build(): void;
    setupWrapper(): void;
    afterPlayerSetup(): Promise<boolean>;
    getAspectRatio(): Promise<number>;
    getPlayState(): Promise<boolean>;
    get paused(): boolean;
    set paused(paused: boolean);
    set muted(isMuted: boolean);
    get muted(): boolean;
    get playing(): boolean;
    get aspectRatio(): number;
    get currentTime(): number;
    setPlayStatuses(): void;
    play(): Promise<boolean>;
    pause(): Promise<boolean>;
    mute(): Promise<void>;
    unmute(): Promise<void>;
}
