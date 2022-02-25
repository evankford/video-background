/// <reference types="node" />
import Icons from './utils/icons';
import Logger from './utils/logger';
import { LocalPlayer } from "./players/localPlayer";
import { VimeoPlayer } from "./players/vimeoPlayer";
import { YoutubePlayer } from "./players/youtubePlayer";
interface CanAutoPlayShape {
    video: boolean;
    audio: boolean;
}
export declare class VideoBackground extends HTMLElement {
    initialized?: boolean;
    breakpoints?: number[];
    container: HTMLElement;
    can: VideoCan;
    canAutoplay?: CanAutoPlayShape;
    muteButton?: HTMLElement;
    overlayEl?: HTMLElement;
    pauseButton?: HTMLElement;
    player?: YoutubePlayer | VimeoPlayer | LocalPlayer;
    icons?: Icons;
    playerReadyTimeout?: NodeJS.Timeout;
    paused: boolean;
    size?: string;
    muted: boolean;
    posterEl?: HTMLImageElement | HTMLPictureElement;
    startTime?: number;
    sourceId?: string;
    sources?: SourcesShape;
    type?: 'local' | 'youtube' | 'vimeo' | 'error';
    url?: string;
    videoEl?: HTMLVideoElement;
    logger: Logger;
    constructor();
    init(): void;
    initSync(): void;
    afterAutoplay(): void;
    buildDOM(): Promise<void>;
    buildIcons(): void;
    buildVideo(): Promise<void>;
    handleFallbackNoVideo(): void;
    toggleMute(): void;
    togglePause(): void;
    muteVideo(): void;
    unmuteVideo(): void;
    checkForInherentPoster(): HTMLImageElement | HTMLPictureElement | false;
    buildPoster(): false | undefined;
    buildOverlay(): void;
    get status(): loadingStatus;
    set status(status: loadingStatus);
    get poster(): string | false;
    get posterSet(): string | false;
    get src(): string | null;
    set src(srcString: string | null);
    set poster(posterString: string | false);
    handleMalformedSource(url: string): Source;
    reset(): void;
    attributeChangedCallback(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
}
export {};
