"use strict";
self["webpackHotUpdate_atmtfy_video_background"]("main",{

/***/ "./src/videoBackground.ts":
/*!********************************!*\
  !*** ./src/videoBackground.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoBackground": () => (/* binding */ VideoBackground)
/* harmony export */ });
/* harmony import */ var can_autoplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! can-autoplay */ "./node_modules/.pnpm/can-autoplay@3.0.2/node_modules/can-autoplay/build/can-autoplay.es.js");
/* harmony import */ var _utils_vimeo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/vimeo */ "./src/utils/vimeo.js");
/* harmony import */ var _utils_youtube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/youtube */ "./src/utils/youtube.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");




const videoSourceModules = {
    vimeo: {
        api: _utils_vimeo__WEBPACK_IMPORTED_MODULE_1__.initializeVimeoAPI,
        player: _utils_vimeo__WEBPACK_IMPORTED_MODULE_1__.initializeVimeoPlayer
    },
    youtube: {
        api: _utils_youtube__WEBPACK_IMPORTED_MODULE_2__.initializeYouTubeAPI,
        player: _utils_youtube__WEBPACK_IMPORTED_MODULE_2__.initializeYouTubePlayer
    }
};
class VideoBackground extends HTMLElement {
    breakpoints;
    browserCanAutoPlay;
    container;
    debug;
    muteButton;
    overlayEl;
    pauseButton;
    player;
    posterEl;
    scaleFactor;
    size;
    startTime;
    sourceId;
    sources;
    sourcesReady;
    type;
    url;
    videoAspectRatio;
    videoCanAutoPlay;
    videoEl;
    widthStore;
    constructor() {
        super();
        //Setting up props
        this.sourcesReady = false;
        this.container = this;
        this.browserCanAutoPlay = false;
        this.videoCanAutoPlay = false;
        this.scaleFactor = 1;
        this.videoAspectRatio = .69;
        this.player = {
            ready: false,
        };
        //Setting up debug
        if (this.getAttribute('debug')) {
            if (this.getAttribute('debug') == "verbose") {
                this.debug = { enabled: true, verbose: true };
            }
            else {
                this.debug = { enabled: true, verbose: false };
            }
        }
        else {
            this.debug = { enabled: false, verbose: false };
        }
        if (this.debug) {
            console.log("Debugging video-background.");
        }
        this.init();
    }
    init() {
        this.status = "waiting";
        this.compileSources(this.src);
        this.buildDOM();
        this.buildIntersectionObserver();
    }
    buildDOM() {
        this.buildOverlay();
        this.buildPoster();
        can_autoplay__WEBPACK_IMPORTED_MODULE_0__["default"].video({ timeout: 500, muted: true }).then(({ result, error }) => {
            if (result == false) {
                this.handleFallbackNoVideo();
            }
            else {
                this.browserCanAutoPlay = true;
                this.buildVideo();
            }
        });
        //Check for overlay things.
    }
    buildVideo() {
        //Never should have mixed sources.
        console.log(this.sources);
        if (!this.sourcesReady) {
            return false;
        }
        this.logger("Building video based on type: " + this.type);
        if (this.type == 'local') {
            this.buildLocalVideo();
            //Check to make sure we have sources
        }
        else {
            this.initializeVideoAPI();
        }
    }
    handleFallbackNoVideo() {
        this.logger("Video Won't play, defaulting to fallback");
        this.status = "fallback";
    }
    /**
     * @method initializeVideoAPI Load the API for the appropriate source. This abstraction normalizes the
     * interfaces for YouTube and Vimeo, and potentially other providers.
     * @return {undefined}
     */
    initializeVideoAPI() {
        if (!this.url || !this.player || (this.type != 'youtube' && this.type != 'vimeo')) {
            this.logger('Problem with initializing video API. Contact the developer', true);
            return;
        }
        const id = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.getVideoID)(this.url, this.type);
        if (this.browserCanAutoPlay && id) {
            this.player.ready = false;
            const sourceAPIFunction = videoSourceModules[this.type].api;
            const apiPromise = sourceAPIFunction(window);
            apiPromise.then((message) => {
                this.logger(message);
                if (this.player) {
                    this.player.ready = false;
                }
                this.initializeVideoPlayer();
            }).catch((message) => {
                document.body.classList.add('ready');
                this.logger(message);
            });
        }
        else {
            document.body.classList.add('ready');
        }
    }
    /**
    * @method initializeVideoPlayer Initialize the video player and register its callbacks.
    * @return {undefined}
    */
    initializeVideoPlayer() {
        if (!this.url || !this.player || (this.type != 'youtube' && this.type != 'vimeo')) {
            this.logger('Problem with initializing video API. Contact the developer', true);
            return;
        }
        if (this.player.ready) {
            try {
                this.player.destroy();
            }
            catch (e) {
                // nothing to destroy
            }
            this.player.ready = false;
        }
        if ((this.type != 'youtube' && this.type != 'vimeo')) {
            return false;
        }
        const sourcePlayerFunction = videoSourceModules[this.type].player;
        const playerPromise = sourcePlayerFunction({
            instance: this,
            container: this,
            win: window,
            videoId: this.id,
            speed: 1,
            startTime: this.startTime,
            readyCallback: () => {
                if (this.player && this.player.iframe) {
                    this.player.iframe.classList.add('background-video');
                }
                this.videoAspectRatio = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.findPlayerAspectRatio)(this.container, this.player, this.type);
                this.syncPlayer();
                const readyEvent = new CustomEvent('ready');
                this.container.dispatchEvent(readyEvent);
            },
            stateChangeCallback: (state, data) => {
                switch (state) {
                    case 'playing':
                        if (!this.videoCanAutoPlay) {
                            // The video element begain to auto play.
                            this.logger('video started playing');
                            this.videoCanAutoPlay = true;
                            if (this.player) {
                                this.player.ready = true;
                                if (this.player.iframe) {
                                    this.player.iframe.classList.add('ready');
                                }
                            }
                            this.container.classList.remove('mobile');
                        }
                        break;
                }
                if (state) {
                    this.logger(state);
                }
                if (data) {
                    this.logger(data);
                }
            }
        });
        playerPromise.then(player => {
            this.player = player;
        }, reason => {
            // Either the video embed failed to load for any reason (e.g. network latency, deleted video, etc.),
            // or the video element in the embed was not configured to properly auto play.
            this.logger(reason);
        });
    }
    syncPlayer() {
        this.scaleVideo(1);
    }
    /**
     * @method scaleVideo The IFRAME will be the entire width and height of its container, but the video
     * may be a completely different size and ratio. Scale up the IFRAME so the inner video
     * behaves in the proper `mode`, with optional additional scaling to zoom in. Also allow
     * ImageLoader to reload the custom fallback image, if appropriate.
     * @param {Number} [scaleValue] A multiplier used to increase the scaled size of the media.
     * @return {undefined}
     */
    scaleVideo(scaleValue = 1) {
        if (!this.player) {
            return;
        }
        const playerIframe = this.player.iframe;
        if (!playerIframe) {
            return;
        }
        let scale = this.scaleFactor ?? scaleValue;
        if (this.mode !== 'fill') {
            playerIframe.style.width = '';
            playerIframe.style.height = '';
            return;
        }
        const iframeParent = playerIframe.parentElement;
        if (iframeParent == null) {
            return;
        }
        const containerWidth = iframeParent.clientWidth;
        const containerHeight = iframeParent.clientHeight;
        const containerRatio = containerWidth / containerHeight;
        let pWidth = 0;
        let pHeight = 0;
        if (containerRatio > this.videoAspectRatio) {
            // at the same width, the video is taller than the window
            pWidth = containerWidth * scale;
            pHeight = containerWidth * scale / this.videoAspectRatio;
        }
        else if (this.videoAspectRatio > containerRatio) {
            // at the same width, the video is shorter than the window
            pWidth = containerHeight * scale * this.videoAspectRatio;
            pHeight = containerHeight * scale;
        }
        else {
            // the window and video ratios match
            pWidth = containerWidth * scale;
            pHeight = containerHeight * scale;
        }
        playerIframe.style.width = pWidth + 'px';
        playerIframe.style.height = pHeight + 'px';
        playerIframe.style.left = 0 - ((pWidth - containerWidth) / 2) + 'px';
        playerIframe.style.top = 0 - ((pHeight - containerHeight) / 2) + 'px';
    }
    /**
     * @method buildLocalVideo Load a video element using local files or sets of files.
     * @todo abstract out these functions, maybe to a separate class?
     * @returns {undefined}
     */
    buildLocalVideo() {
        this.logger("Building local video");
        if (this.videoEl && this.videoEl.hasAttribute('playsinline')) {
            this.removeChild(this.videoEl);
        }
        if (!this.sources) {
            this.logger("No sources for local video");
            return this.handleFallbackNoVideo();
        }
        //We need to get size when breakpoints
        let srcSet = this.sources;
        if (this.breakpoints && this.breakpoints.length > 0) {
            this.logger("Video has breakpoints");
            srcSet = this.getSourcesFilteredBySize(this.sources);
            window.addEventListener('resize', this.checkIfPassedBreakpoints.bind(this));
        }
        if (srcSet && srcSet.length) {
            this.videoEl = document.createElement('video');
            this.videoEl.classList.add('vbg__video');
            this.videoEl.classList.add('vbg--loading');
            this.videoEl.setAttribute('playsinline', '');
            if (typeof this.poster == 'string') {
                this.videoEl.setAttribute('poster', this.poster);
            }
            if (this.autoplay) {
                this.videoEl.setAttribute('autoplay', '');
            }
            if (this.loop) {
                this.videoEl.setAttribute('loop', '');
            }
            if (this.muted) {
                this.videoEl.setAttribute('muted', '');
            }
            this.videoEl.innerHTML = '';
            srcSet.forEach(src => {
                const child = document.createElement('source');
                if ('fileType' in src) {
                    child.type = 'video/' + src.fileType;
                }
                child.src = src.url;
                child.addEventListener('loadeddata', function () {
                    self.videoEl && self.videoEl.classList.remove('vbg--loading');
                });
                this.videoEl?.append(child);
            });
            const self = this;
            this.append(this.videoEl);
            this.videoEl.addEventListener('canplay', () => {
                self.videoEl?.classList.remove('vbg--loading');
            });
            if (this.muted) {
                this.muteVideo();
            }
        }
    }
    muteVideo() {
        this.logger('muting video');
        const videoToMute = this.querySelector('video');
        if (videoToMute) {
            videoToMute.volume = 0;
            videoToMute.muted = true;
        }
    }
    getSourcesFilteredBySize(sources) {
        const wW = window.innerWidth;
        this.widthStore = wW;
        let sortedBySize = { 'max': [] };
        sources.forEach((source) => {
            if (('maxWidth' in source) && source.maxWidth) {
                const w = source.maxWidth.toString();
                if (sortedBySize != undefined && !Object.keys(sortedBySize).includes(w)) {
                    sortedBySize[w] = [source];
                }
                else {
                    sortedBySize[w].push(source);
                }
            }
            else if ('maxWidth' in source) {
                sortedBySize['max'].push(source);
            }
        });
        if (!this.breakpoints) {
            this.logger('Breakpoints not defined at size filter. Something\'s wrong', true);
            return sources;
        }
        let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b);
        const currentIndex = breakpointsWithPresent.indexOf(wW);
        if (currentIndex == breakpointsWithPresent.length - 1) {
            return sortedBySize['max'];
        }
        else {
            return sortedBySize[breakpointsWithPresent[currentIndex + 1].toString()];
        }
    }
    checkIfPassedBreakpoints() {
        if (!this.widthStore || !this.breakpoints) {
            return;
        }
        const wW = window.innerWidth;
        let breakpointsWithPast = [...this.breakpoints, this.widthStore].sort((a, b) => a - b);
        let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b);
        const pastIndex = breakpointsWithPast.indexOf(this.widthStore);
        const currentIndex = breakpointsWithPresent.indexOf(wW);
        this.logger(`comparing past breakpoint of ${this.widthStore} with current of ${wW}. Are we good? The past one was ${pastIndex} and currently it's ${currentIndex}`);
        if (pastIndex != currentIndex) {
            this.buildLocalVideo();
        }
    }
    buildPoster() {
        if (!this.posterSet && !this.poster) {
            return false;
        }
        this.posterEl = document.createElement('img');
        this.posterEl.classList.add('vbg__poster');
        this.posterEl.classList.add('vbg--loading');
        if (this.poster) {
            const self = this;
            const imageLoaderEl = new Image();
            imageLoaderEl.src = this.poster;
            imageLoaderEl.addEventListener('load', function () {
                if (self && self.posterEl) {
                    self.posterEl.src = imageLoaderEl.src;
                    self.posterEl.classList.remove('vbg--loading');
                }
            });
        }
        if (this.posterSet) {
            this.posterEl.srcset = this.posterSet;
            this.posterEl.sizes = this.size || "100vw";
        }
        this.appendChild(this.posterEl);
    }
    buildOverlay() {
        this.overlayEl = document.createElement('div');
        this.overlayEl.classList.add('vbg__overlay');
        this.appendChild(this.overlayEl);
    }
    buildIntersectionObserver() {
        const options = {
            threshold: 0.5
        };
    }
    get autoplay() {
        if (this.getAttribute('autoplay') != 'false') {
            return true;
        }
        return false;
    }
    get loop() {
        if (this.getAttribute('loop') != 'false') {
            return true;
        }
        return false;
    }
    get muted() {
        if (this.getAttribute('muted') != 'false') {
            return true;
        }
        return false;
    }
    set autoplay(isAutoplay) {
        if (isAutoplay) {
            this.setAttribute('autoplay', '');
        }
        else {
            this.removeAttribute('autoplay');
        }
    }
    set muted(isMuted) {
        if (isMuted) {
            this.setAttribute('muted', '');
        }
        else {
            this.removeAttribute('muted');
        }
    }
    set loop(isLoop) {
        if (isLoop) {
            this.setAttribute('loop', '');
        }
        else {
            this.removeAttribute('loop');
        }
    }
    get mode() {
        if (this.getAttribute('mode') == 'fill') {
            return "fill";
        }
        else {
            return "fit";
        }
    }
    set mode(fitOrFill) {
        this.setAttribute('mode', fitOrFill);
    }
    get status() {
        const statusString = this.getAttribute('status');
        if (typeof statusString == 'string' && (statusString == "loading" || statusString == "fallback" || statusString == "loaded" || statusString == "buffering" || statusString == "failed" || statusString == "waiting" || statusString == "none" || statusString == "error")) {
            return statusString;
        }
        else {
            this.status = "none";
            return "none";
        }
    }
    /** Updates status on the actual element as well as the property of the class */
    set status(status) {
        if (status) {
            // switch (status) {
            //   case ("waiting" || "loading"):
            //   break;
            // }
            this.setAttribute('status', status);
        }
        else {
            this.setAttribute('status', 'error');
        }
    }
    get poster() {
        const posterVal = this.getAttribute('poster');
        if (posterVal != null) {
            return posterVal;
        }
        else {
            return false;
        }
    }
    get posterSet() {
        const posterVal = this.getAttribute('posterset');
        if (posterVal != null) {
            return posterVal;
        }
        else {
            return false;
        }
    }
    get src() {
        const src = this.getAttribute('src');
        if (typeof src == 'string') {
            this.compileSources(src);
        }
        return src;
    }
    set src(srcString) {
        if (srcString == null) {
            this.removeAttribute('src');
        }
        else {
            this.setAttribute('src', srcString);
            this.compileSources(srcString);
        }
    }
    /**
     * Sets the poster url string, and sets loading that poster into motion
     */
    set poster(posterString) {
        if (posterString) {
            // switch (status) {
            //   case ("waiting" || "loading"):
            //   break;
            // }
            this.setAttribute('poster', posterString);
            this.buildPoster();
        }
        else {
            this.removeAttribute('poster');
        }
    }
    //
    compileSources(srcString) {
        if (srcString == null) {
            this.logger("No source provided for video background");
            return false;
        }
        let src = srcString.trim();
        let srcsToReturn = [];
        let srcStrings = [];
        let sizeStrings = [];
        let hasMultipleSrcs = false, hasSizes = false;
        if (src.indexOf(',') >= 0) {
            //Looks like https://something 300w, https://something https://another one, else etc 500w,
            this.logger('Has sizes separated by comma');
            sizeStrings = srcString.split(',');
            if (sizeStrings.length >= 2) {
                sizeStrings.forEach(sizeString => {
                    const splitString = sizeString.trim().split(' ');
                    if (splitString.length <= 1) {
                        srcsToReturn.push(this.prepareSingleSource(sizeString));
                    }
                    else {
                        const size = parseInt(splitString[splitString.length - 1].replace('w', ''));
                        this.logger("Found a size: " + size + ' from string ' + sizeString);
                        splitString.forEach((string) => { srcsToReturn.push(this.prepareSingleSource(string, size)); });
                    }
                });
            }
            hasSizes = true;
        }
        if (src.indexOf(' ') >= 0) {
            this.logger('Has multiple sources separated by spaces');
            if (sizeStrings.length >= 2) {
            }
            else {
                const array = srcString.split(' ');
                array.forEach(item => { srcStrings.push(item.trim()); });
            }
            srcStrings.forEach((string) => { srcsToReturn.push(this.prepareSingleSource(string)); });
        }
        if (!hasSizes && !hasMultipleSrcs) {
            //Build from single source
            srcsToReturn.push(this.prepareSingleSource(src));
        }
        this.sources = this.cleanupSources(srcsToReturn);
    }
    /**
     * Removes conflicting sources of different types (can only have one of each type)
     */
    cleanupSources(sources) {
        //Type first
        this.type = sources[0].type;
        this.url = sources[0].url;
        //Return object if only one.
        if (typeof sources != 'object' || sources.length <= 1) {
            this.sourcesReady = true;
            return sources;
        }
        else {
            if (this.type == 'youtube' || this.type == 'vimeo') {
                this.sourcesReady = true;
                return [sources[0]];
            }
            else {
                // Get sizes
                let sizes = [];
                sources.forEach((source) => {
                    if (!('maxWidth' in source) || typeof source.maxWidth != 'number') {
                        return;
                    }
                    if (!sizes.includes(source.maxWidth)) {
                        sizes.push(source.maxWidth);
                    }
                    this.breakpoints = sizes;
                });
                this.sourcesReady = true;
                return sources.filter(src => { return src.type == this.type; });
            }
        }
    }
    prepareSingleSource(url, size = false) {
        const urlType = this.getSourceType(url);
        let returner = {
            url: url,
            type: urlType,
        };
        if (urlType == 'local') {
            const ft = this.getFileType(url);
            if (ft) {
                return { ...returner, maxWidth: size, fileType: ft };
            }
        }
        return returner;
    }
    getFileType(url) {
        if (url.includes('.mp4')) {
            return 'mp4';
        }
        if (url.includes('.webm')) {
            return 'webm';
        }
        if (url.includes('.ogg')) {
            return 'ogg';
        }
        if (url.includes('.ogm')) {
            return 'ogm';
        }
        return false;
    }
    handleMalformedSource(url) {
        this.logger(`Handling error for ${url}`);
        return {
            url: url,
            type: 'error',
        };
    }
    getSourceType(url) {
        const ytTest = new RegExp(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/);
        const vimeoTest = new RegExp(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
        const videoTest = new RegExp(/.*?\/.*(webm|mp4|ogg|ogm).*?/i);
        if (ytTest.test(url)) {
            return 'youtube';
        }
        else if (vimeoTest.test(url)) {
            return 'vimeo';
        }
        else if (videoTest.test(url)) {
            return 'local';
        }
        else {
            return 'error';
        }
    }
    connectedCallback() {
    }
    /**
     * @method logger A guarded console logger.
     * @param msg the message to send
     * @param always Whether to always show if not verbose
     * @return {undefined}
     */
    logger(msg, always = false) {
        if (always && this.debug.enabled) {
            console.log(msg);
        }
        else {
            if (!this.debug.enabled || !this.debug.verbose) {
                return;
            }
            console.log(msg);
        }
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("efb3a675f06a58b95748")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4zN2IzYTQ5ZDFkMTZhMzMxOTY0Ny5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ21DO0FBQ007QUFDZDtBQUNsRTtBQUNBO0FBQ0EsYUFBYSw0REFBa0I7QUFDL0IsZ0JBQWdCLCtEQUFxQjtBQUNyQyxLQUFLO0FBQ0w7QUFDQSxhQUFhLGdFQUFvQjtBQUNqQyxnQkFBZ0IsbUVBQXVCO0FBQ3ZDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBEQUFpQixHQUFHLDJCQUEyQixVQUFVLGVBQWU7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix3REFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxtRUFBcUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCLGtCQUFrQixHQUFHLGtDQUFrQyxXQUFXLHFCQUFxQixhQUFhO0FBQ3pLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCw0REFBNEQ7QUFDdEg7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLCtCQUErQjtBQUN2RTtBQUNBLDZDQUE2QyxzREFBc0Q7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLCtDQUErQywrQkFBK0I7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsSUFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SkFBNkosS0FBSztBQUNsSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQzVxQkEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdmlkZW9CYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhbkF1dG9QbGF5IGZyb20gJ2Nhbi1hdXRvcGxheSc7XG5pbXBvcnQgeyBpbml0aWFsaXplVmltZW9BUEksIGluaXRpYWxpemVWaW1lb1BsYXllciB9IGZyb20gJy4vdXRpbHMvdmltZW8nO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVlvdVR1YmVBUEksIGluaXRpYWxpemVZb3VUdWJlUGxheWVyIH0gZnJvbSAnLi91dGlscy95b3V0dWJlJztcbmltcG9ydCB7IGZpbmRQbGF5ZXJBc3BlY3RSYXRpbywgZ2V0VmlkZW9JRCB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuY29uc3QgdmlkZW9Tb3VyY2VNb2R1bGVzID0ge1xuICAgIHZpbWVvOiB7XG4gICAgICAgIGFwaTogaW5pdGlhbGl6ZVZpbWVvQVBJLFxuICAgICAgICBwbGF5ZXI6IGluaXRpYWxpemVWaW1lb1BsYXllclxuICAgIH0sXG4gICAgeW91dHViZToge1xuICAgICAgICBhcGk6IGluaXRpYWxpemVZb3VUdWJlQVBJLFxuICAgICAgICBwbGF5ZXI6IGluaXRpYWxpemVZb3VUdWJlUGxheWVyXG4gICAgfVxufTtcbmV4cG9ydCBjbGFzcyBWaWRlb0JhY2tncm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgYnJlYWtwb2ludHM7XG4gICAgYnJvd3NlckNhbkF1dG9QbGF5O1xuICAgIGNvbnRhaW5lcjtcbiAgICBkZWJ1ZztcbiAgICBtdXRlQnV0dG9uO1xuICAgIG92ZXJsYXlFbDtcbiAgICBwYXVzZUJ1dHRvbjtcbiAgICBwbGF5ZXI7XG4gICAgcG9zdGVyRWw7XG4gICAgc2NhbGVGYWN0b3I7XG4gICAgc2l6ZTtcbiAgICBzdGFydFRpbWU7XG4gICAgc291cmNlSWQ7XG4gICAgc291cmNlcztcbiAgICBzb3VyY2VzUmVhZHk7XG4gICAgdHlwZTtcbiAgICB1cmw7XG4gICAgdmlkZW9Bc3BlY3RSYXRpbztcbiAgICB2aWRlb0NhbkF1dG9QbGF5O1xuICAgIHZpZGVvRWw7XG4gICAgd2lkdGhTdG9yZTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLy9TZXR0aW5nIHVwIHByb3BzXG4gICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gdGhpcztcbiAgICAgICAgdGhpcy5icm93c2VyQ2FuQXV0b1BsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy52aWRlb0NhbkF1dG9QbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NhbGVGYWN0b3IgPSAxO1xuICAgICAgICB0aGlzLnZpZGVvQXNwZWN0UmF0aW8gPSAuNjk7XG4gICAgICAgIHRoaXMucGxheWVyID0ge1xuICAgICAgICAgICAgcmVhZHk6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICAvL1NldHRpbmcgdXAgZGVidWdcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdkZWJ1ZycpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYnVnJykgPT0gXCJ2ZXJib3NlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnID0geyBlbmFibGVkOiB0cnVlLCB2ZXJib3NlOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRlYnVnID0geyBlbmFibGVkOiB0cnVlLCB2ZXJib3NlOiBmYWxzZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHsgZW5hYmxlZDogZmFsc2UsIHZlcmJvc2U6IGZhbHNlIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnaW5nIHZpZGVvLWJhY2tncm91bmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwid2FpdGluZ1wiO1xuICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHRoaXMuc3JjKTtcbiAgICAgICAgdGhpcy5idWlsZERPTSgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9XG4gICAgYnVpbGRET00oKSB7XG4gICAgICAgIHRoaXMuYnVpbGRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuYnVpbGRQb3N0ZXIoKTtcbiAgICAgICAgY2FuQXV0b1BsYXkudmlkZW8oeyB0aW1lb3V0OiA1MDAsIG11dGVkOiB0cnVlIH0pLnRoZW4oKHsgcmVzdWx0LCBlcnJvciB9KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVGYWxsYmFja05vVmlkZW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYnJvd3NlckNhbkF1dG9QbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1aWxkVmlkZW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vQ2hlY2sgZm9yIG92ZXJsYXkgdGhpbmdzLlxuICAgIH1cbiAgICBidWlsZFZpZGVvKCkge1xuICAgICAgICAvL05ldmVyIHNob3VsZCBoYXZlIG1peGVkIHNvdXJjZXMuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc291cmNlcyk7XG4gICAgICAgIGlmICghdGhpcy5zb3VyY2VzUmVhZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ2dlcihcIkJ1aWxkaW5nIHZpZGVvIGJhc2VkIG9uIHR5cGU6IFwiICsgdGhpcy50eXBlKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkTG9jYWxWaWRlbygpO1xuICAgICAgICAgICAgLy9DaGVjayB0byBtYWtlIHN1cmUgd2UgaGF2ZSBzb3VyY2VzXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmluaXRpYWxpemVWaWRlb0FQSSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZUZhbGxiYWNrTm9WaWRlbygpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoXCJWaWRlbyBXb24ndCBwbGF5LCBkZWZhdWx0aW5nIHRvIGZhbGxiYWNrXCIpO1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwiZmFsbGJhY2tcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBpbml0aWFsaXplVmlkZW9BUEkgTG9hZCB0aGUgQVBJIGZvciB0aGUgYXBwcm9wcmlhdGUgc291cmNlLiBUaGlzIGFic3RyYWN0aW9uIG5vcm1hbGl6ZXMgdGhlXG4gICAgICogaW50ZXJmYWNlcyBmb3IgWW91VHViZSBhbmQgVmltZW8sIGFuZCBwb3RlbnRpYWxseSBvdGhlciBwcm92aWRlcnMuXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGluaXRpYWxpemVWaWRlb0FQSSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVybCB8fCAhdGhpcy5wbGF5ZXIgfHwgKHRoaXMudHlwZSAhPSAneW91dHViZScgJiYgdGhpcy50eXBlICE9ICd2aW1lbycpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcignUHJvYmxlbSB3aXRoIGluaXRpYWxpemluZyB2aWRlbyBBUEkuIENvbnRhY3QgdGhlIGRldmVsb3BlcicsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlkID0gZ2V0VmlkZW9JRCh0aGlzLnVybCwgdGhpcy50eXBlKTtcbiAgICAgICAgaWYgKHRoaXMuYnJvd3NlckNhbkF1dG9QbGF5ICYmIGlkKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlQVBJRnVuY3Rpb24gPSB2aWRlb1NvdXJjZU1vZHVsZXNbdGhpcy50eXBlXS5hcGk7XG4gICAgICAgICAgICBjb25zdCBhcGlQcm9taXNlID0gc291cmNlQVBJRnVuY3Rpb24od2luZG93KTtcbiAgICAgICAgICAgIGFwaVByb21pc2UudGhlbigobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZWFkeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVWaWRlb1BsYXllcigpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3JlYWR5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIobWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncmVhZHknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAqIEBtZXRob2QgaW5pdGlhbGl6ZVZpZGVvUGxheWVyIEluaXRpYWxpemUgdGhlIHZpZGVvIHBsYXllciBhbmQgcmVnaXN0ZXIgaXRzIGNhbGxiYWNrcy5cbiAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAqL1xuICAgIGluaXRpYWxpemVWaWRlb1BsYXllcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnVybCB8fCAhdGhpcy5wbGF5ZXIgfHwgKHRoaXMudHlwZSAhPSAneW91dHViZScgJiYgdGhpcy50eXBlICE9ICd2aW1lbycpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcignUHJvYmxlbSB3aXRoIGluaXRpYWxpemluZyB2aWRlbyBBUEkuIENvbnRhY3QgdGhlIGRldmVsb3BlcicsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBsYXllci5yZWFkeSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIG5vdGhpbmcgdG8gZGVzdHJveVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHRoaXMudHlwZSAhPSAneW91dHViZScgJiYgdGhpcy50eXBlICE9ICd2aW1lbycpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc291cmNlUGxheWVyRnVuY3Rpb24gPSB2aWRlb1NvdXJjZU1vZHVsZXNbdGhpcy50eXBlXS5wbGF5ZXI7XG4gICAgICAgIGNvbnN0IHBsYXllclByb21pc2UgPSBzb3VyY2VQbGF5ZXJGdW5jdGlvbih7XG4gICAgICAgICAgICBpbnN0YW5jZTogdGhpcyxcbiAgICAgICAgICAgIGNvbnRhaW5lcjogdGhpcyxcbiAgICAgICAgICAgIHdpbjogd2luZG93LFxuICAgICAgICAgICAgdmlkZW9JZDogdGhpcy5pZCxcbiAgICAgICAgICAgIHNwZWVkOiAxLFxuICAgICAgICAgICAgc3RhcnRUaW1lOiB0aGlzLnN0YXJ0VGltZSxcbiAgICAgICAgICAgIHJlYWR5Q2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIgJiYgdGhpcy5wbGF5ZXIuaWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdiYWNrZ3JvdW5kLXZpZGVvJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9Bc3BlY3RSYXRpbyA9IGZpbmRQbGF5ZXJBc3BlY3RSYXRpbyh0aGlzLmNvbnRhaW5lciwgdGhpcy5wbGF5ZXIsIHRoaXMudHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zeW5jUGxheWVyKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZHlFdmVudCA9IG5ldyBDdXN0b21FdmVudCgncmVhZHknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5kaXNwYXRjaEV2ZW50KHJlYWR5RXZlbnQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2s6IChzdGF0ZSwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncGxheWluZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmlkZW9DYW5BdXRvUGxheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB2aWRlbyBlbGVtZW50IGJlZ2FpbiB0byBhdXRvIHBsYXkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ3ZpZGVvIHN0YXJ0ZWQgcGxheWluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlkZW9DYW5BdXRvUGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyLmlmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ3JlYWR5Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnbW9iaWxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIoZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGxheWVyUHJvbWlzZS50aGVuKHBsYXllciA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgfSwgcmVhc29uID0+IHtcbiAgICAgICAgICAgIC8vIEVpdGhlciB0aGUgdmlkZW8gZW1iZWQgZmFpbGVkIHRvIGxvYWQgZm9yIGFueSByZWFzb24gKGUuZy4gbmV0d29yayBsYXRlbmN5LCBkZWxldGVkIHZpZGVvLCBldGMuKSxcbiAgICAgICAgICAgIC8vIG9yIHRoZSB2aWRlbyBlbGVtZW50IGluIHRoZSBlbWJlZCB3YXMgbm90IGNvbmZpZ3VyZWQgdG8gcHJvcGVybHkgYXV0byBwbGF5LlxuICAgICAgICAgICAgdGhpcy5sb2dnZXIocmVhc29uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN5bmNQbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMuc2NhbGVWaWRlbygxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBzY2FsZVZpZGVvIFRoZSBJRlJBTUUgd2lsbCBiZSB0aGUgZW50aXJlIHdpZHRoIGFuZCBoZWlnaHQgb2YgaXRzIGNvbnRhaW5lciwgYnV0IHRoZSB2aWRlb1xuICAgICAqIG1heSBiZSBhIGNvbXBsZXRlbHkgZGlmZmVyZW50IHNpemUgYW5kIHJhdGlvLiBTY2FsZSB1cCB0aGUgSUZSQU1FIHNvIHRoZSBpbm5lciB2aWRlb1xuICAgICAqIGJlaGF2ZXMgaW4gdGhlIHByb3BlciBgbW9kZWAsIHdpdGggb3B0aW9uYWwgYWRkaXRpb25hbCBzY2FsaW5nIHRvIHpvb20gaW4uIEFsc28gYWxsb3dcbiAgICAgKiBJbWFnZUxvYWRlciB0byByZWxvYWQgdGhlIGN1c3RvbSBmYWxsYmFjayBpbWFnZSwgaWYgYXBwcm9wcmlhdGUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzY2FsZVZhbHVlXSBBIG11bHRpcGxpZXIgdXNlZCB0byBpbmNyZWFzZSB0aGUgc2NhbGVkIHNpemUgb2YgdGhlIG1lZGlhLlxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBzY2FsZVZpZGVvKHNjYWxlVmFsdWUgPSAxKSB7XG4gICAgICAgIGlmICghdGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwbGF5ZXJJZnJhbWUgPSB0aGlzLnBsYXllci5pZnJhbWU7XG4gICAgICAgIGlmICghcGxheWVySWZyYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNjYWxlID0gdGhpcy5zY2FsZUZhY3RvciA/PyBzY2FsZVZhbHVlO1xuICAgICAgICBpZiAodGhpcy5tb2RlICE9PSAnZmlsbCcpIHtcbiAgICAgICAgICAgIHBsYXllcklmcmFtZS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICAgICAgcGxheWVySWZyYW1lLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlmcmFtZVBhcmVudCA9IHBsYXllcklmcmFtZS5wYXJlbnRFbGVtZW50O1xuICAgICAgICBpZiAoaWZyYW1lUGFyZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IGlmcmFtZVBhcmVudC5jbGllbnRXaWR0aDtcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gaWZyYW1lUGFyZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmF0aW8gPSBjb250YWluZXJXaWR0aCAvIGNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgbGV0IHBXaWR0aCA9IDA7XG4gICAgICAgIGxldCBwSGVpZ2h0ID0gMDtcbiAgICAgICAgaWYgKGNvbnRhaW5lclJhdGlvID4gdGhpcy52aWRlb0FzcGVjdFJhdGlvKSB7XG4gICAgICAgICAgICAvLyBhdCB0aGUgc2FtZSB3aWR0aCwgdGhlIHZpZGVvIGlzIHRhbGxlciB0aGFuIHRoZSB3aW5kb3dcbiAgICAgICAgICAgIHBXaWR0aCA9IGNvbnRhaW5lcldpZHRoICogc2NhbGU7XG4gICAgICAgICAgICBwSGVpZ2h0ID0gY29udGFpbmVyV2lkdGggKiBzY2FsZSAvIHRoaXMudmlkZW9Bc3BlY3RSYXRpbztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnZpZGVvQXNwZWN0UmF0aW8gPiBjb250YWluZXJSYXRpbykge1xuICAgICAgICAgICAgLy8gYXQgdGhlIHNhbWUgd2lkdGgsIHRoZSB2aWRlbyBpcyBzaG9ydGVyIHRoYW4gdGhlIHdpbmRvd1xuICAgICAgICAgICAgcFdpZHRoID0gY29udGFpbmVySGVpZ2h0ICogc2NhbGUgKiB0aGlzLnZpZGVvQXNwZWN0UmF0aW87XG4gICAgICAgICAgICBwSGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0ICogc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyB0aGUgd2luZG93IGFuZCB2aWRlbyByYXRpb3MgbWF0Y2hcbiAgICAgICAgICAgIHBXaWR0aCA9IGNvbnRhaW5lcldpZHRoICogc2NhbGU7XG4gICAgICAgICAgICBwSGVpZ2h0ID0gY29udGFpbmVySGVpZ2h0ICogc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgcGxheWVySWZyYW1lLnN0eWxlLndpZHRoID0gcFdpZHRoICsgJ3B4JztcbiAgICAgICAgcGxheWVySWZyYW1lLnN0eWxlLmhlaWdodCA9IHBIZWlnaHQgKyAncHgnO1xuICAgICAgICBwbGF5ZXJJZnJhbWUuc3R5bGUubGVmdCA9IDAgLSAoKHBXaWR0aCAtIGNvbnRhaW5lcldpZHRoKSAvIDIpICsgJ3B4JztcbiAgICAgICAgcGxheWVySWZyYW1lLnN0eWxlLnRvcCA9IDAgLSAoKHBIZWlnaHQgLSBjb250YWluZXJIZWlnaHQpIC8gMikgKyAncHgnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGJ1aWxkTG9jYWxWaWRlbyBMb2FkIGEgdmlkZW8gZWxlbWVudCB1c2luZyBsb2NhbCBmaWxlcyBvciBzZXRzIG9mIGZpbGVzLlxuICAgICAqIEB0b2RvIGFic3RyYWN0IG91dCB0aGVzZSBmdW5jdGlvbnMsIG1heWJlIHRvIGEgc2VwYXJhdGUgY2xhc3M/XG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBidWlsZExvY2FsVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiQnVpbGRpbmcgbG9jYWwgdmlkZW9cIik7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvRWwgJiYgdGhpcy52aWRlb0VsLmhhc0F0dHJpYnV0ZSgncGxheXNpbmxpbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnZpZGVvRWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zb3VyY2VzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIk5vIHNvdXJjZXMgZm9yIGxvY2FsIHZpZGVvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRmFsbGJhY2tOb1ZpZGVvKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9XZSBuZWVkIHRvIGdldCBzaXplIHdoZW4gYnJlYWtwb2ludHNcbiAgICAgICAgbGV0IHNyY1NldCA9IHRoaXMuc291cmNlcztcbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMgJiYgdGhpcy5icmVha3BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIlZpZGVvIGhhcyBicmVha3BvaW50c1wiKTtcbiAgICAgICAgICAgIHNyY1NldCA9IHRoaXMuZ2V0U291cmNlc0ZpbHRlcmVkQnlTaXplKHRoaXMuc291cmNlcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jaGVja0lmUGFzc2VkQnJlYWtwb2ludHMuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyY1NldCAmJiBzcmNTZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fdmlkZW8nKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBvc3RlciA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHRoaXMucG9zdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm11dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBzcmNTZXQuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCdmaWxlVHlwZScgaW4gc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnR5cGUgPSAndmlkZW8vJyArIHNyYy5maWxlVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hpbGQuc3JjID0gc3JjLnVybDtcbiAgICAgICAgICAgICAgICBjaGlsZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZGVvRWwgJiYgc2VsZi52aWRlb0VsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbD8uYXBwZW5kKGNoaWxkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZCh0aGlzLnZpZGVvRWwpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWRlb0VsPy5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMubXV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm11dGVWaWRlbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG11dGVWaWRlbygpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoJ211dGluZyB2aWRlbycpO1xuICAgICAgICBjb25zdCB2aWRlb1RvTXV0ZSA9IHRoaXMucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgaWYgKHZpZGVvVG9NdXRlKSB7XG4gICAgICAgICAgICB2aWRlb1RvTXV0ZS52b2x1bWUgPSAwO1xuICAgICAgICAgICAgdmlkZW9Ub011dGUubXV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNvdXJjZXNGaWx0ZXJlZEJ5U2l6ZShzb3VyY2VzKSB7XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMud2lkdGhTdG9yZSA9IHdXO1xuICAgICAgICBsZXQgc29ydGVkQnlTaXplID0geyAnbWF4JzogW10gfTtcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIGlmICgoJ21heFdpZHRoJyBpbiBzb3VyY2UpICYmIHNvdXJjZS5tYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHcgPSBzb3VyY2UubWF4V2lkdGgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoc29ydGVkQnlTaXplICE9IHVuZGVmaW5lZCAmJiAhT2JqZWN0LmtleXMoc29ydGVkQnlTaXplKS5pbmNsdWRlcyh3KSkge1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRCeVNpemVbd10gPSBbc291cmNlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVt3XS5wdXNoKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJ21heFdpZHRoJyBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3J0ZWRCeVNpemVbJ21heCddLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ0JyZWFrcG9pbnRzIG5vdCBkZWZpbmVkIGF0IHNpemUgZmlsdGVyLiBTb21ldGhpbmdcXCdzIHdyb25nJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlcztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUHJlc2VudCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB3V10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBicmVha3BvaW50c1dpdGhQcmVzZW50LmluZGV4T2Yod1cpO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID09IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvcnRlZEJ5U2l6ZVsnbWF4J107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc29ydGVkQnlTaXplW2JyZWFrcG9pbnRzV2l0aFByZXNlbnRbY3VycmVudEluZGV4ICsgMV0udG9TdHJpbmcoKV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tJZlBhc3NlZEJyZWFrcG9pbnRzKCkge1xuICAgICAgICBpZiAoIXRoaXMud2lkdGhTdG9yZSB8fCAhdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQYXN0ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHRoaXMud2lkdGhTdG9yZV0uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUHJlc2VudCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB3V10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBjb25zdCBwYXN0SW5kZXggPSBicmVha3BvaW50c1dpdGhQYXN0LmluZGV4T2YodGhpcy53aWR0aFN0b3JlKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5pbmRleE9mKHdXKTtcbiAgICAgICAgdGhpcy5sb2dnZXIoYGNvbXBhcmluZyBwYXN0IGJyZWFrcG9pbnQgb2YgJHt0aGlzLndpZHRoU3RvcmV9IHdpdGggY3VycmVudCBvZiAke3dXfS4gQXJlIHdlIGdvb2Q/IFRoZSBwYXN0IG9uZSB3YXMgJHtwYXN0SW5kZXh9IGFuZCBjdXJyZW50bHkgaXQncyAke2N1cnJlbnRJbmRleH1gKTtcbiAgICAgICAgaWYgKHBhc3RJbmRleCAhPSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRMb2NhbFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYnVpbGRQb3N0ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5wb3N0ZXJTZXQgJiYgIXRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3N0ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fcG9zdGVyJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgIGlmICh0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUxvYWRlckVsID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLnNyYyA9IHRoaXMucG9zdGVyO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmICYmIHNlbGYucG9zdGVyRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0ZXJFbC5zcmMgPSBpbWFnZUxvYWRlckVsLnNyYztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wb3N0ZXJTZXQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc3Jjc2V0ID0gdGhpcy5wb3N0ZXJTZXQ7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNpemVzID0gdGhpcy5zaXplIHx8IFwiMTAwdndcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMucG9zdGVyRWwpO1xuICAgIH1cbiAgICBidWlsZE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fb3ZlcmxheScpO1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICB9XG4gICAgYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBhdXRvcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IGxvb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbG9vcCcpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IG11dGVkKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ211dGVkJykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXQgYXV0b3BsYXkoaXNBdXRvcGxheSkge1xuICAgICAgICBpZiAoaXNBdXRvcGxheSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IG11dGVkKGlzTXV0ZWQpIHtcbiAgICAgICAgaWYgKGlzTXV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBsb29wKGlzTG9vcCkge1xuICAgICAgICBpZiAoaXNMb29wKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdsb29wJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IG1vZGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbW9kZScpID09ICdmaWxsJykge1xuICAgICAgICAgICAgcmV0dXJuIFwiZmlsbFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFwiZml0XCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IG1vZGUoZml0T3JGaWxsKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtb2RlJywgZml0T3JGaWxsKTtcbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzU3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpO1xuICAgICAgICBpZiAodHlwZW9mIHN0YXR1c1N0cmluZyA9PSAnc3RyaW5nJyAmJiAoc3RhdHVzU3RyaW5nID09IFwibG9hZGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhbGxiYWNrXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcIm5vbmVcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJub25lXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIFVwZGF0ZXMgc3RhdHVzIG9uIHRoZSBhY3R1YWwgZWxlbWVudCBhcyB3ZWxsIGFzIHRoZSBwcm9wZXJ0eSBvZiB0aGUgY2xhc3MgKi9cbiAgICBzZXQgc3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlcigpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlclNldCgpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcnNldCcpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHNyYygpIHtcbiAgICAgICAgY29uc3Qgc3JjID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICBpZiAodHlwZW9mIHNyYyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuICAgIHNldCBzcmMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyY1N0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zdGVyIHVybCBzdHJpbmcsIGFuZCBzZXRzIGxvYWRpbmcgdGhhdCBwb3N0ZXIgaW50byBtb3Rpb25cbiAgICAgKi9cbiAgICBzZXQgcG9zdGVyKHBvc3RlclN0cmluZykge1xuICAgICAgICBpZiAocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHBvc3RlclN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9cbiAgICBjb21waWxlU291cmNlcyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIk5vIHNvdXJjZSBwcm92aWRlZCBmb3IgdmlkZW8gYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3JjID0gc3JjU3RyaW5nLnRyaW0oKTtcbiAgICAgICAgbGV0IHNyY3NUb1JldHVybiA9IFtdO1xuICAgICAgICBsZXQgc3JjU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgc2l6ZVN0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IGhhc011bHRpcGxlU3JjcyA9IGZhbHNlLCBoYXNTaXplcyA9IGZhbHNlO1xuICAgICAgICBpZiAoc3JjLmluZGV4T2YoJywnKSA+PSAwKSB7XG4gICAgICAgICAgICAvL0xvb2tzIGxpa2UgaHR0cHM6Ly9zb21ldGhpbmcgMzAwdywgaHR0cHM6Ly9zb21ldGhpbmcgaHR0cHM6Ly9hbm90aGVyIG9uZSwgZWxzZSBldGMgNTAwdyxcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKCdIYXMgc2l6ZXMgc2VwYXJhdGVkIGJ5IGNvbW1hJyk7XG4gICAgICAgICAgICBzaXplU3RyaW5ncyA9IHNyY1N0cmluZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgaWYgKHNpemVTdHJpbmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgc2l6ZVN0cmluZ3MuZm9yRWFjaChzaXplU3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRTdHJpbmcgPSBzaXplU3RyaW5nLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRTdHJpbmcubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzaXplU3RyaW5nKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gcGFyc2VJbnQoc3BsaXRTdHJpbmdbc3BsaXRTdHJpbmcubGVuZ3RoIC0gMV0ucmVwbGFjZSgndycsICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcihcIkZvdW5kIGEgc2l6ZTogXCIgKyBzaXplICsgJyBmcm9tIHN0cmluZyAnICsgc2l6ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxpdFN0cmluZy5mb3JFYWNoKChzdHJpbmcpID0+IHsgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHN0cmluZywgc2l6ZSkpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFzU2l6ZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKCdIYXMgbXVsdGlwbGUgc291cmNlcyBzZXBhcmF0ZWQgYnkgc3BhY2VzJyk7XG4gICAgICAgICAgICBpZiAoc2l6ZVN0cmluZ3MubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gc3JjU3RyaW5nLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChpdGVtID0+IHsgc3JjU3RyaW5ncy5wdXNoKGl0ZW0udHJpbSgpKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcmNTdHJpbmdzLmZvckVhY2goKHN0cmluZykgPT4geyBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc3RyaW5nKSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzU2l6ZXMgJiYgIWhhc011bHRpcGxlU3Jjcykge1xuICAgICAgICAgICAgLy9CdWlsZCBmcm9tIHNpbmdsZSBzb3VyY2VcbiAgICAgICAgICAgIHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzcmMpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZXMgPSB0aGlzLmNsZWFudXBTb3VyY2VzKHNyY3NUb1JldHVybik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY29uZmxpY3Rpbmcgc291cmNlcyBvZiBkaWZmZXJlbnQgdHlwZXMgKGNhbiBvbmx5IGhhdmUgb25lIG9mIGVhY2ggdHlwZSlcbiAgICAgKi9cbiAgICBjbGVhbnVwU291cmNlcyhzb3VyY2VzKSB7XG4gICAgICAgIC8vVHlwZSBmaXJzdFxuICAgICAgICB0aGlzLnR5cGUgPSBzb3VyY2VzWzBdLnR5cGU7XG4gICAgICAgIHRoaXMudXJsID0gc291cmNlc1swXS51cmw7XG4gICAgICAgIC8vUmV0dXJuIG9iamVjdCBpZiBvbmx5IG9uZS5cbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzICE9ICdvYmplY3QnIHx8IHNvdXJjZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAneW91dHViZScgfHwgdGhpcy50eXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzb3VyY2VzWzBdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdldCBzaXplc1xuICAgICAgICAgICAgICAgIGxldCBzaXplcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCdtYXhXaWR0aCcgaW4gc291cmNlKSB8fCB0eXBlb2Ygc291cmNlLm1heFdpZHRoICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaXplcy5pbmNsdWRlcyhzb3VyY2UubWF4V2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplcy5wdXNoKHNvdXJjZS5tYXhXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IHNpemVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlcy5maWx0ZXIoc3JjID0+IHsgcmV0dXJuIHNyYy50eXBlID09IHRoaXMudHlwZTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJlcGFyZVNpbmdsZVNvdXJjZSh1cmwsIHNpemUgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCB1cmxUeXBlID0gdGhpcy5nZXRTb3VyY2VUeXBlKHVybCk7XG4gICAgICAgIGxldCByZXR1cm5lciA9IHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogdXJsVHlwZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHVybFR5cGUgPT0gJ2xvY2FsJykge1xuICAgICAgICAgICAgY29uc3QgZnQgPSB0aGlzLmdldEZpbGVUeXBlKHVybCk7XG4gICAgICAgICAgICBpZiAoZnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lciwgbWF4V2lkdGg6IHNpemUsIGZpbGVUeXBlOiBmdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXR1cm5lcjtcbiAgICB9XG4gICAgZ2V0RmlsZVR5cGUodXJsKSB7XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5tcDQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdtcDQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy53ZWJtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnd2VibSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm9nZycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29nZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm9nbScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29nbSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYW5kbGVNYWxmb3JtZWRTb3VyY2UodXJsKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKGBIYW5kbGluZyBlcnJvciBmb3IgJHt1cmx9YCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHR5cGU6ICdlcnJvcicsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldFNvdXJjZVR5cGUodXJsKSB7XG4gICAgICAgIGNvbnN0IHl0VGVzdCA9IG5ldyBSZWdFeHAoL14oPzpodHRwcz86KT8oPzpcXC9cXC8pPyg/OnlvdXR1XFwuYmVcXC98KD86d3d3XFwufG1cXC4pP3lvdXR1YmVcXC5jb21cXC8oPzp3YXRjaHx2fGVtYmVkKSg/OlxcLnBocCk/KD86XFw/Lip2PXxcXC8pKShbYS16QS1aMC05XFxfLV17NywxNX0pKD86W1xcPyZdW2EtekEtWjAtOVxcXy1dKz1bYS16QS1aMC05XFxfLV0rKSokLyk7XG4gICAgICAgIGNvbnN0IHZpbWVvVGVzdCA9IG5ldyBSZWdFeHAoL1xcL1xcLyg/Ond3d1xcLik/dmltZW8uY29tXFwvKFswLTlhLXpcXC1fXSspL2kpO1xuICAgICAgICBjb25zdCB2aWRlb1Rlc3QgPSBuZXcgUmVnRXhwKC8uKj9cXC8uKih3ZWJtfG1wNHxvZ2d8b2dtKS4qPy9pKTtcbiAgICAgICAgaWYgKHl0VGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAneW91dHViZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmltZW9UZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICd2aW1lbyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmlkZW9UZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICdsb2NhbCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBsb2dnZXIgQSBndWFyZGVkIGNvbnNvbGUgbG9nZ2VyLlxuICAgICAqIEBwYXJhbSBtc2cgdGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgICAqIEBwYXJhbSBhbHdheXMgV2hldGhlciB0byBhbHdheXMgc2hvdyBpZiBub3QgdmVyYm9zZVxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBsb2dnZXIobXNnLCBhbHdheXMgPSBmYWxzZSkge1xuICAgICAgICBpZiAoYWx3YXlzICYmIHRoaXMuZGVidWcuZW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWJ1Zy5lbmFibGVkIHx8ICF0aGlzLmRlYnVnLnZlcmJvc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZWZiM2E2NzVmMDZhNThiOTU3NDhcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=