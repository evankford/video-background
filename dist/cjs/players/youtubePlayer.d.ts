import type { YouTubePlayer } from "youtube-player/dist/types";
import VideoPlayer from "./videoPlayer";
export declare class YoutubePlayer extends VideoPlayer {
    source: string;
    id: string | false;
    wrapper: HTMLElement;
    player?: YouTubePlayer;
    looper?: ReturnType<typeof setInterval>;
    constructor(config: PlayerConfigInput);
    setupWrapper(): void;
    unbuild(): void;
    build(): void;
    startPlayLoop(): void;
    clearLoop(): void;
    afterPlayerSetup(): Promise<boolean>;
    getAspectRatio(): Promise<number>;
    get playing(): boolean;
    get buffering(): boolean;
    get aspectRatio(): number;
    get currentTime(): number;
    play(): Promise<boolean>;
    pause(): Promise<boolean>;
    get paused(): boolean;
    get muted(): boolean | undefined;
    mute(): Promise<void>;
    unmute(): Promise<void>;
}
