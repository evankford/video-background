/// <reference types="node" />
import Icons from './utils/icons';
import Player from "@vimeo/player";
/**
 * @class VideoBackground creates a custom web component
 * @todo separate statuses and capabilities and stores into their own objects
 * @todo allow unmuting
 */
export declare class VideoBackground extends HTMLElement {
    breakpoints?: number[]; /** Contains an array of breakpoints to reload smaller sources when passed */
    browserCanAutoPlay: boolean; /** Dynamically checks when  */
    container: HTMLElement;
    debug: {
        enabled: boolean;
        verbose: boolean;
    };
    iframe?: HTMLIFrameElement | null;
    can: VideoCan;
    observer?: IntersectionObserver;
    muteButton?: HTMLElement;
    overlayEl?: HTMLElement;
    oldSize?: number;
    pauseButton?: HTMLElement;
    player?: YoutubeAPIPlayer | Player;
    playerReady: boolean;
    isIntersecting: boolean;
    icons?: Icons;
    playerReadyTimeout?: NodeJS.Timeout;
    paused: boolean;
    muted: boolean;
    posterEl?: HTMLImageElement | HTMLPictureElement;
    scaleFactor: number;
    size?: string;
    startTime?: number;
    sourceId?: string;
    hasStarted: boolean;
    sources?: SourcesShape;
    sourcesReady: boolean;
    type?: 'local' | 'youtube' | 'vimeo' | 'error';
    url?: string;
    videoAspectRatio: number;
    videoCanAutoPlay: boolean;
    videoEl?: HTMLVideoElement;
    widthStore?: number;
    constructor();
    init(): void;
    buildDOM(): void;
    buildIcons(): void;
    buildVideo(): false | undefined;
    handleFallbackNoVideo(): void;
    /**
     * @method initializeVideoAPI Load the API for the appropriate source. This abstraction normalizes the
     * interfaces for YouTube and Vimeo, and potentially other providers.
     * @return {undefined}
     */
    initializeVideoAPI(): void;
    /**
    * @method initializeVideoPlayer Initialize the video player and register its callbacks.
    * @return {undefined}
    */
    initializeVideoPlayer(): false | undefined;
    syncPlayer(): void;
    /**
     * @method scaleVideo The IFRAME will be the entire width and height of its container, but the video
     * may be a completely different size and ratio. Scale up the IFRAME so the inner video
     * behaves in the proper `mode`, with optional additional scaling to zoom in. Also allow
     * ImageLoader to reload the custom fallback image, if appropriate.
     * @param {Number} [scaleValue] A multiplier used to increase the scaled size of the media.
     * @return {undefined}
     */
    scaleVideo(scaleValue?: number): void;
    /**
     * @method buildLocalVideo Load a video element using local files or sets of files.
     * @todo abstract out these functions, maybe to a separate class?
     * @returns {undefined}
     */
    buildLocalVideo(): void;
    handlePlayCheck(): void;
    setPlayerReady(isReady?: boolean): void;
    toggleMute(): void;
    togglePause(): void;
    muteVideo(): void;
    unmuteVideo(): void;
    getSourcesFilteredBySize(sources: SourcesShape): SourcesShape;
    checkIfPassedBreakpoints(): void;
    checkForInherentPoster(): HTMLImageElement | HTMLPictureElement | false;
    buildPoster(): false | undefined;
    buildOverlay(): void;
    tryToPlay(): void;
    tryToPause(): void;
    buildIntersectionObserver(): void;
    handleIntersection(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
    get autoplay(): boolean;
    get loop(): boolean;
    set autoplay(isAutoplay: boolean);
    set loop(isLoop: boolean);
    get mode(): "fit" | "fill";
    set mode(fitOrFill: "fit" | "fill");
    get status(): loadingStatus;
    /** Updates status on the actual element as well as the property of the class */
    set status(status: loadingStatus);
    get poster(): string | false;
    get posterSet(): string | false;
    get src(): string | null;
    set src(srcString: string | null);
    /**
     * Sets the poster url string, and sets loading that poster into motion
     */
    set poster(posterString: string | false);
    compileSources(srcString: string | null): false | undefined;
    /**
     * Removes conflicting sources of different types (can only have one of each type)
     */
    cleanupSources(sources: SourcesShape): SourcesShape;
    prepareSingleSource(url: string, size?: number | false): LocalSource | Source;
    getFileType(url: string): FileType | false;
    handleMalformedSource(url: string): Source;
    getSourceType(url: string | null): SourceType;
    connectedCallback(): void;
    /**
     * @method logger A guarded console logger.
     * @param msg the message to send
     * @param always Whether to always show if not verbose
     * @return {undefined}
     */
    logger(msg: any, always?: boolean): void;
}
