declare const getVideoID: (srcs: SourcesShape | undefined) => string | false;
declare function checkForAutoplay(): Promise<{
    video: boolean;
    audio: boolean;
}>;
export { getVideoID, checkForAutoplay };
