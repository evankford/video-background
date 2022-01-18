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
        console.log("Constructing~!");
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
        this.logger("Debugging video-background.");
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
/******/ 	__webpack_require__.h = () => ("db69f55c5b50cbebe18d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lYzI0NmZlYTgwY2U3YWYwMjExYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ21DO0FBQ007QUFDZDtBQUNsRTtBQUNBO0FBQ0EsYUFBYSw0REFBa0I7QUFDL0IsZ0JBQWdCLCtEQUFxQjtBQUNyQyxLQUFLO0FBQ0w7QUFDQSxhQUFhLGdFQUFvQjtBQUNqQyxnQkFBZ0IsbUVBQXVCO0FBQ3ZDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwREFBaUIsR0FBRywyQkFBMkIsVUFBVSxlQUFlO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsd0RBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsbUVBQXFCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGlCQUFpQixrQkFBa0IsR0FBRyxrQ0FBa0MsV0FBVyxxQkFBcUIsYUFBYTtBQUN6SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsNERBQTREO0FBQ3RIO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywrQkFBK0I7QUFDdkU7QUFDQSw2Q0FBNkMsc0RBQXNEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSwrQ0FBK0MsK0JBQStCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLElBQUk7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkpBQTZKLEtBQUs7QUFDbEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUMzcUJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3ZpZGVvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYW5BdXRvUGxheSBmcm9tICdjYW4tYXV0b3BsYXknO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVZpbWVvQVBJLCBpbml0aWFsaXplVmltZW9QbGF5ZXIgfSBmcm9tICcuL3V0aWxzL3ZpbWVvJztcbmltcG9ydCB7IGluaXRpYWxpemVZb3VUdWJlQVBJLCBpbml0aWFsaXplWW91VHViZVBsYXllciB9IGZyb20gJy4vdXRpbHMveW91dHViZSc7XG5pbXBvcnQgeyBmaW5kUGxheWVyQXNwZWN0UmF0aW8sIGdldFZpZGVvSUQgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmNvbnN0IHZpZGVvU291cmNlTW9kdWxlcyA9IHtcbiAgICB2aW1lbzoge1xuICAgICAgICBhcGk6IGluaXRpYWxpemVWaW1lb0FQSSxcbiAgICAgICAgcGxheWVyOiBpbml0aWFsaXplVmltZW9QbGF5ZXJcbiAgICB9LFxuICAgIHlvdXR1YmU6IHtcbiAgICAgICAgYXBpOiBpbml0aWFsaXplWW91VHViZUFQSSxcbiAgICAgICAgcGxheWVyOiBpbml0aWFsaXplWW91VHViZVBsYXllclxuICAgIH1cbn07XG5leHBvcnQgY2xhc3MgVmlkZW9CYWNrZ3JvdW5kIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIGJyZWFrcG9pbnRzO1xuICAgIGJyb3dzZXJDYW5BdXRvUGxheTtcbiAgICBjb250YWluZXI7XG4gICAgZGVidWc7XG4gICAgbXV0ZUJ1dHRvbjtcbiAgICBvdmVybGF5RWw7XG4gICAgcGF1c2VCdXR0b247XG4gICAgcGxheWVyO1xuICAgIHBvc3RlckVsO1xuICAgIHNjYWxlRmFjdG9yO1xuICAgIHNpemU7XG4gICAgc3RhcnRUaW1lO1xuICAgIHNvdXJjZUlkO1xuICAgIHNvdXJjZXM7XG4gICAgc291cmNlc1JlYWR5O1xuICAgIHR5cGU7XG4gICAgdXJsO1xuICAgIHZpZGVvQXNwZWN0UmF0aW87XG4gICAgdmlkZW9DYW5BdXRvUGxheTtcbiAgICB2aWRlb0VsO1xuICAgIHdpZHRoU3RvcmU7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29uc3RydWN0aW5nfiFcIik7XG4gICAgICAgIC8vU2V0dGluZyB1cCBwcm9wc1xuICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgIHRoaXMuYnJvd3NlckNhbkF1dG9QbGF5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmlkZW9DYW5BdXRvUGxheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjYWxlRmFjdG9yID0gMTtcbiAgICAgICAgdGhpcy52aWRlb0FzcGVjdFJhdGlvID0gLjY5O1xuICAgICAgICB0aGlzLnBsYXllciA9IHtcbiAgICAgICAgICAgIHJlYWR5OiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgICAgLy9TZXR0aW5nIHVwIGRlYnVnXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGVidWcnKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdkZWJ1ZycpID09IFwidmVyYm9zZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHsgZW5hYmxlZDogdHJ1ZSwgdmVyYm9zZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHsgZW5hYmxlZDogdHJ1ZSwgdmVyYm9zZTogZmFsc2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IGZhbHNlLCB2ZXJib3NlOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiRGVidWdnaW5nIHZpZGVvLWJhY2tncm91bmQuXCIpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcIndhaXRpbmdcIjtcbiAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyh0aGlzLnNyYyk7XG4gICAgICAgIHRoaXMuYnVpbGRET00oKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgfVxuICAgIGJ1aWxkRE9NKCkge1xuICAgICAgICB0aGlzLmJ1aWxkT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIGNhbkF1dG9QbGF5LnZpZGVvKHsgdGltZW91dDogNTAwLCBtdXRlZDogdHJ1ZSB9KS50aGVuKCh7IHJlc3VsdCwgZXJyb3IgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFsbGJhY2tOb1ZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJDYW5BdXRvUGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZFZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL0NoZWNrIGZvciBvdmVybGF5IHRoaW5ncy5cbiAgICB9XG4gICAgYnVpbGRWaWRlbygpIHtcbiAgICAgICAgLy9OZXZlciBzaG91bGQgaGF2ZSBtaXhlZCBzb3VyY2VzLlxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvdXJjZXMpO1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlc1JlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dnZXIoXCJCdWlsZGluZyB2aWRlbyBiYXNlZCBvbiB0eXBlOiBcIiArIHRoaXMudHlwZSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2xvY2FsJykge1xuICAgICAgICAgICAgdGhpcy5idWlsZExvY2FsVmlkZW8oKTtcbiAgICAgICAgICAgIC8vQ2hlY2sgdG8gbWFrZSBzdXJlIHdlIGhhdmUgc291cmNlc1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlkZW9BUEkoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVGYWxsYmFja05vVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiVmlkZW8gV29uJ3QgcGxheSwgZGVmYXVsdGluZyB0byBmYWxsYmFja1wiKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcImZhbGxiYWNrXCI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgaW5pdGlhbGl6ZVZpZGVvQVBJIExvYWQgdGhlIEFQSSBmb3IgdGhlIGFwcHJvcHJpYXRlIHNvdXJjZS4gVGhpcyBhYnN0cmFjdGlvbiBub3JtYWxpemVzIHRoZVxuICAgICAqIGludGVyZmFjZXMgZm9yIFlvdVR1YmUgYW5kIFZpbWVvLCBhbmQgcG90ZW50aWFsbHkgb3RoZXIgcHJvdmlkZXJzLlxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBpbml0aWFsaXplVmlkZW9BUEkoKSB7XG4gICAgICAgIGlmICghdGhpcy51cmwgfHwgIXRoaXMucGxheWVyIHx8ICh0aGlzLnR5cGUgIT0gJ3lvdXR1YmUnICYmIHRoaXMudHlwZSAhPSAndmltZW8nKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ1Byb2JsZW0gd2l0aCBpbml0aWFsaXppbmcgdmlkZW8gQVBJLiBDb250YWN0IHRoZSBkZXZlbG9wZXInLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpZCA9IGdldFZpZGVvSUQodGhpcy51cmwsIHRoaXMudHlwZSk7XG4gICAgICAgIGlmICh0aGlzLmJyb3dzZXJDYW5BdXRvUGxheSAmJiBpZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUFQSUZ1bmN0aW9uID0gdmlkZW9Tb3VyY2VNb2R1bGVzW3RoaXMudHlwZV0uYXBpO1xuICAgICAgICAgICAgY29uc3QgYXBpUHJvbWlzZSA9IHNvdXJjZUFQSUZ1bmN0aW9uKHdpbmRvdyk7XG4gICAgICAgICAgICBhcGlQcm9taXNlLnRoZW4oKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcihtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplVmlkZW9QbGF5ZXIoKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyZWFkeScpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3JlYWR5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgKiBAbWV0aG9kIGluaXRpYWxpemVWaWRlb1BsYXllciBJbml0aWFsaXplIHRoZSB2aWRlbyBwbGF5ZXIgYW5kIHJlZ2lzdGVyIGl0cyBjYWxsYmFja3MuXG4gICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgKi9cbiAgICBpbml0aWFsaXplVmlkZW9QbGF5ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy51cmwgfHwgIXRoaXMucGxheWVyIHx8ICh0aGlzLnR5cGUgIT0gJ3lvdXR1YmUnICYmIHRoaXMudHlwZSAhPSAndmltZW8nKSkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ1Byb2JsZW0gd2l0aCBpbml0aWFsaXppbmcgdmlkZW8gQVBJLiBDb250YWN0IHRoZSBkZXZlbG9wZXInLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wbGF5ZXIucmVhZHkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBub3RoaW5nIHRvIGRlc3Ryb3lcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGxheWVyLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCh0aGlzLnR5cGUgIT0gJ3lvdXR1YmUnICYmIHRoaXMudHlwZSAhPSAndmltZW8nKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNvdXJjZVBsYXllckZ1bmN0aW9uID0gdmlkZW9Tb3VyY2VNb2R1bGVzW3RoaXMudHlwZV0ucGxheWVyO1xuICAgICAgICBjb25zdCBwbGF5ZXJQcm9taXNlID0gc291cmNlUGxheWVyRnVuY3Rpb24oe1xuICAgICAgICAgICAgaW5zdGFuY2U6IHRoaXMsXG4gICAgICAgICAgICBjb250YWluZXI6IHRoaXMsXG4gICAgICAgICAgICB3aW46IHdpbmRvdyxcbiAgICAgICAgICAgIHZpZGVvSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgICBzcGVlZDogMSxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogdGhpcy5zdGFydFRpbWUsXG4gICAgICAgICAgICByZWFkeUNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyICYmIHRoaXMucGxheWVyLmlmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5pZnJhbWUuY2xhc3NMaXN0LmFkZCgnYmFja2dyb3VuZC12aWRlbycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQXNwZWN0UmF0aW8gPSBmaW5kUGxheWVyQXNwZWN0UmF0aW8odGhpcy5jb250YWluZXIsIHRoaXMucGxheWVyLCB0aGlzLnR5cGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3luY1BsYXllcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWR5RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ3JlYWR5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250YWluZXIuZGlzcGF0Y2hFdmVudChyZWFkeUV2ZW50KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrOiAoc3RhdGUsIGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3BsYXlpbmcnOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZpZGVvQ2FuQXV0b1BsYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdmlkZW8gZWxlbWVudCBiZWdhaW4gdG8gYXV0byBwbGF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKCd2aWRlbyBzdGFydGVkIHBsYXlpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZGVvQ2FuQXV0b1BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5pZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmlmcmFtZS5jbGFzc0xpc3QuYWRkKCdyZWFkeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ21vYmlsZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcihzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllclByb21pc2UudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIH0sIHJlYXNvbiA9PiB7XG4gICAgICAgICAgICAvLyBFaXRoZXIgdGhlIHZpZGVvIGVtYmVkIGZhaWxlZCB0byBsb2FkIGZvciBhbnkgcmVhc29uIChlLmcuIG5ldHdvcmsgbGF0ZW5jeSwgZGVsZXRlZCB2aWRlbywgZXRjLiksXG4gICAgICAgICAgICAvLyBvciB0aGUgdmlkZW8gZWxlbWVudCBpbiB0aGUgZW1iZWQgd2FzIG5vdCBjb25maWd1cmVkIHRvIHByb3Blcmx5IGF1dG8gcGxheS5cbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKHJlYXNvbik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzeW5jUGxheWVyKCkge1xuICAgICAgICB0aGlzLnNjYWxlVmlkZW8oMSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZXRob2Qgc2NhbGVWaWRlbyBUaGUgSUZSQU1FIHdpbGwgYmUgdGhlIGVudGlyZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIGl0cyBjb250YWluZXIsIGJ1dCB0aGUgdmlkZW9cbiAgICAgKiBtYXkgYmUgYSBjb21wbGV0ZWx5IGRpZmZlcmVudCBzaXplIGFuZCByYXRpby4gU2NhbGUgdXAgdGhlIElGUkFNRSBzbyB0aGUgaW5uZXIgdmlkZW9cbiAgICAgKiBiZWhhdmVzIGluIHRoZSBwcm9wZXIgYG1vZGVgLCB3aXRoIG9wdGlvbmFsIGFkZGl0aW9uYWwgc2NhbGluZyB0byB6b29tIGluLiBBbHNvIGFsbG93XG4gICAgICogSW1hZ2VMb2FkZXIgdG8gcmVsb2FkIHRoZSBjdXN0b20gZmFsbGJhY2sgaW1hZ2UsIGlmIGFwcHJvcHJpYXRlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbc2NhbGVWYWx1ZV0gQSBtdWx0aXBsaWVyIHVzZWQgdG8gaW5jcmVhc2UgdGhlIHNjYWxlZCBzaXplIG9mIHRoZSBtZWRpYS5cbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgc2NhbGVWaWRlbyhzY2FsZVZhbHVlID0gMSkge1xuICAgICAgICBpZiAoIXRoaXMucGxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGxheWVySWZyYW1lID0gdGhpcy5wbGF5ZXIuaWZyYW1lO1xuICAgICAgICBpZiAoIXBsYXllcklmcmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzY2FsZSA9IHRoaXMuc2NhbGVGYWN0b3IgPz8gc2NhbGVWYWx1ZTtcbiAgICAgICAgaWYgKHRoaXMubW9kZSAhPT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICBwbGF5ZXJJZnJhbWUuc3R5bGUud2lkdGggPSAnJztcbiAgICAgICAgICAgIHBsYXllcklmcmFtZS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpZnJhbWVQYXJlbnQgPSBwbGF5ZXJJZnJhbWUucGFyZW50RWxlbWVudDtcbiAgICAgICAgaWYgKGlmcmFtZVBhcmVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSBpZnJhbWVQYXJlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGlmcmFtZVBhcmVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJhdGlvID0gY29udGFpbmVyV2lkdGggLyBjb250YWluZXJIZWlnaHQ7XG4gICAgICAgIGxldCBwV2lkdGggPSAwO1xuICAgICAgICBsZXQgcEhlaWdodCA9IDA7XG4gICAgICAgIGlmIChjb250YWluZXJSYXRpbyA+IHRoaXMudmlkZW9Bc3BlY3RSYXRpbykge1xuICAgICAgICAgICAgLy8gYXQgdGhlIHNhbWUgd2lkdGgsIHRoZSB2aWRlbyBpcyB0YWxsZXIgdGhhbiB0aGUgd2luZG93XG4gICAgICAgICAgICBwV2lkdGggPSBjb250YWluZXJXaWR0aCAqIHNjYWxlO1xuICAgICAgICAgICAgcEhlaWdodCA9IGNvbnRhaW5lcldpZHRoICogc2NhbGUgLyB0aGlzLnZpZGVvQXNwZWN0UmF0aW87XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy52aWRlb0FzcGVjdFJhdGlvID4gY29udGFpbmVyUmF0aW8pIHtcbiAgICAgICAgICAgIC8vIGF0IHRoZSBzYW1lIHdpZHRoLCB0aGUgdmlkZW8gaXMgc2hvcnRlciB0aGFuIHRoZSB3aW5kb3dcbiAgICAgICAgICAgIHBXaWR0aCA9IGNvbnRhaW5lckhlaWdodCAqIHNjYWxlICogdGhpcy52aWRlb0FzcGVjdFJhdGlvO1xuICAgICAgICAgICAgcEhlaWdodCA9IGNvbnRhaW5lckhlaWdodCAqIHNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhlIHdpbmRvdyBhbmQgdmlkZW8gcmF0aW9zIG1hdGNoXG4gICAgICAgICAgICBwV2lkdGggPSBjb250YWluZXJXaWR0aCAqIHNjYWxlO1xuICAgICAgICAgICAgcEhlaWdodCA9IGNvbnRhaW5lckhlaWdodCAqIHNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIHBsYXllcklmcmFtZS5zdHlsZS53aWR0aCA9IHBXaWR0aCArICdweCc7XG4gICAgICAgIHBsYXllcklmcmFtZS5zdHlsZS5oZWlnaHQgPSBwSGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgcGxheWVySWZyYW1lLnN0eWxlLmxlZnQgPSAwIC0gKChwV2lkdGggLSBjb250YWluZXJXaWR0aCkgLyAyKSArICdweCc7XG4gICAgICAgIHBsYXllcklmcmFtZS5zdHlsZS50b3AgPSAwIC0gKChwSGVpZ2h0IC0gY29udGFpbmVySGVpZ2h0KSAvIDIpICsgJ3B4JztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBidWlsZExvY2FsVmlkZW8gTG9hZCBhIHZpZGVvIGVsZW1lbnQgdXNpbmcgbG9jYWwgZmlsZXMgb3Igc2V0cyBvZiBmaWxlcy5cbiAgICAgKiBAdG9kbyBhYnN0cmFjdCBvdXQgdGhlc2UgZnVuY3Rpb25zLCBtYXliZSB0byBhIHNlcGFyYXRlIGNsYXNzP1xuICAgICAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgYnVpbGRMb2NhbFZpZGVvKCkge1xuICAgICAgICB0aGlzLmxvZ2dlcihcIkJ1aWxkaW5nIGxvY2FsIHZpZGVvXCIpO1xuICAgICAgICBpZiAodGhpcy52aWRlb0VsICYmIHRoaXMudmlkZW9FbC5oYXNBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQodGhpcy52aWRlb0VsKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc291cmNlcykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoXCJObyBzb3VyY2VzIGZvciBsb2NhbCB2aWRlb1wiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZUZhbGxiYWNrTm9WaWRlbygpO1xuICAgICAgICB9XG4gICAgICAgIC8vV2UgbmVlZCB0byBnZXQgc2l6ZSB3aGVuIGJyZWFrcG9pbnRzXG4gICAgICAgIGxldCBzcmNTZXQgPSB0aGlzLnNvdXJjZXM7XG4gICAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzICYmIHRoaXMuYnJlYWtwb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoXCJWaWRlbyBoYXMgYnJlYWtwb2ludHNcIik7XG4gICAgICAgICAgICBzcmNTZXQgPSB0aGlzLmdldFNvdXJjZXNGaWx0ZXJlZEJ5U2l6ZSh0aGlzLnNvdXJjZXMpO1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuY2hlY2tJZlBhc3NlZEJyZWFrcG9pbnRzLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmNTZXQgJiYgc3JjU2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5jbGFzc0xpc3QuYWRkKCd2YmdfX3ZpZGVvJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuY2xhc3NMaXN0LmFkZCgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wb3N0ZXIgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdwb3N0ZXInLCB0aGlzLnBvc3Rlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tdXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgc3JjU2V0LmZvckVhY2goc3JjID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuICAgICAgICAgICAgICAgIGlmICgnZmlsZVR5cGUnIGluIHNyYykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50eXBlID0gJ3ZpZGVvLycgKyBzcmMuZmlsZVR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoaWxkLnNyYyA9IHNyYy51cmw7XG4gICAgICAgICAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb0VsICYmIHNlbGYudmlkZW9FbC5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWw/LmFwcGVuZChjaGlsZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmQodGhpcy52aWRlb0VsKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudmlkZW9FbD8uY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm11dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tdXRlVmlkZW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtdXRlVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKCdtdXRpbmcgdmlkZW8nKTtcbiAgICAgICAgY29uc3QgdmlkZW9Ub011dGUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgIGlmICh2aWRlb1RvTXV0ZSkge1xuICAgICAgICAgICAgdmlkZW9Ub011dGUudm9sdW1lID0gMDtcbiAgICAgICAgICAgIHZpZGVvVG9NdXRlLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTb3VyY2VzRmlsdGVyZWRCeVNpemUoc291cmNlcykge1xuICAgICAgICBjb25zdCB3VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLndpZHRoU3RvcmUgPSB3VztcbiAgICAgICAgbGV0IHNvcnRlZEJ5U2l6ZSA9IHsgJ21heCc6IFtdIH07XG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoKCdtYXhXaWR0aCcgaW4gc291cmNlKSAmJiBzb3VyY2UubWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3ID0gc291cmNlLm1heFdpZHRoLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRlZEJ5U2l6ZSAhPSB1bmRlZmluZWQgJiYgIU9iamVjdC5rZXlzKHNvcnRlZEJ5U2l6ZSkuaW5jbHVkZXModykpIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkQnlTaXplW3ddID0gW3NvdXJjZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRCeVNpemVbd10ucHVzaChzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdtYXhXaWR0aCcgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc29ydGVkQnlTaXplWydtYXgnXS5wdXNoKHNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKCdCcmVha3BvaW50cyBub3QgZGVmaW5lZCBhdCBzaXplIGZpbHRlci4gU29tZXRoaW5nXFwncyB3cm9uZycsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQgPSBbLi4udGhpcy5icmVha3BvaW50cywgd1ddLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5pbmRleE9mKHdXKTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PSBicmVha3BvaW50c1dpdGhQcmVzZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWRCeVNpemVbJ21heCddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvcnRlZEJ5U2l6ZVticmVha3BvaW50c1dpdGhQcmVzZW50W2N1cnJlbnRJbmRleCArIDFdLnRvU3RyaW5nKCldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSWZQYXNzZWRCcmVha3BvaW50cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZHRoU3RvcmUgfHwgIXRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUGFzdCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB0aGlzLndpZHRoU3RvcmVdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQgPSBbLi4udGhpcy5icmVha3BvaW50cywgd1ddLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgY29uc3QgcGFzdEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUGFzdC5pbmRleE9mKHRoaXMud2lkdGhTdG9yZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQuaW5kZXhPZih3Vyk7XG4gICAgICAgIHRoaXMubG9nZ2VyKGBjb21wYXJpbmcgcGFzdCBicmVha3BvaW50IG9mICR7dGhpcy53aWR0aFN0b3JlfSB3aXRoIGN1cnJlbnQgb2YgJHt3V30uIEFyZSB3ZSBnb29kPyBUaGUgcGFzdCBvbmUgd2FzICR7cGFzdEluZGV4fSBhbmQgY3VycmVudGx5IGl0J3MgJHtjdXJyZW50SW5kZXh9YCk7XG4gICAgICAgIGlmIChwYXN0SW5kZXggIT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkTG9jYWxWaWRlbygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ1aWxkUG9zdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9zdGVyU2V0ICYmICF0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zdGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX3Bvc3RlcicpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICBpZiAodGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VMb2FkZXJFbCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5zcmMgPSB0aGlzLnBvc3RlcjtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZiAmJiBzZWxmLnBvc3RlckVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuc3JjID0gaW1hZ2VMb2FkZXJFbC5zcmM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zdGVyU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNyY3NldCA9IHRoaXMucG9zdGVyU2V0O1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zaXplcyA9IHRoaXMuc2l6ZSB8fCBcIjEwMHZ3XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnBvc3RlckVsKTtcbiAgICB9XG4gICAgYnVpbGRPdmVybGF5KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm92ZXJsYXlFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX292ZXJsYXknKTtcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG4gICAgfVxuICAgIGJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgYXV0b3BsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBsb29wKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2xvb3AnKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBtdXRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtdXRlZCcpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGF1dG9wbGF5KGlzQXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzQXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhdXRvcGxheScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBtdXRlZChpc011dGVkKSB7XG4gICAgICAgIGlmIChpc011dGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbXV0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgbG9vcChpc0xvb3ApIHtcbiAgICAgICAgaWYgKGlzTG9vcCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbG9vcCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBtb2RlKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ21vZGUnKSA9PSAnZmlsbCcpIHtcbiAgICAgICAgICAgIHJldHVybiBcImZpbGxcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcImZpdFwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBtb2RlKGZpdE9yRmlsbCkge1xuICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbW9kZScsIGZpdE9yRmlsbCk7XG4gICAgfVxuICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1N0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzdGF0dXMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0dXNTdHJpbmcgPT0gJ3N0cmluZycgJiYgKHN0YXR1c1N0cmluZyA9PSBcImxvYWRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJmYWxsYmFja1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImxvYWRlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImJ1ZmZlcmluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhaWxlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcIndhaXRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJub25lXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBVcGRhdGVzIHN0YXR1cyBvbiB0aGUgYWN0dWFsIGVsZW1lbnQgYXMgd2VsbCBhcyB0aGUgcHJvcGVydHkgb2YgdGhlIGNsYXNzICovXG4gICAgc2V0IHN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsICdlcnJvcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXInKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXJTZXQoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXJzZXQnKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzcmMoKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXMoc3JjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3JjO1xuICAgIH1cbiAgICBzZXQgc3JjKHNyY1N0cmluZykge1xuICAgICAgICBpZiAoc3JjU3RyaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmNTdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmNTdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvc3RlciB1cmwgc3RyaW5nLCBhbmQgc2V0cyBsb2FkaW5nIHRoYXQgcG9zdGVyIGludG8gbW90aW9uXG4gICAgICovXG4gICAgc2V0IHBvc3Rlcihwb3N0ZXJTdHJpbmcpIHtcbiAgICAgICAgaWYgKHBvc3RlclN0cmluZykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3N0ZXInLCBwb3N0ZXJTdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFBvc3RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vXG4gICAgY29tcGlsZVNvdXJjZXMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoXCJObyBzb3VyY2UgcHJvdmlkZWQgZm9yIHZpZGVvIGJhY2tncm91bmRcIik7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNyYyA9IHNyY1N0cmluZy50cmltKCk7XG4gICAgICAgIGxldCBzcmNzVG9SZXR1cm4gPSBbXTtcbiAgICAgICAgbGV0IHNyY1N0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IHNpemVTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBoYXNNdWx0aXBsZVNyY3MgPSBmYWxzZSwgaGFzU2l6ZXMgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNyYy5pbmRleE9mKCcsJykgPj0gMCkge1xuICAgICAgICAgICAgLy9Mb29rcyBsaWtlIGh0dHBzOi8vc29tZXRoaW5nIDMwMHcsIGh0dHBzOi8vc29tZXRoaW5nIGh0dHBzOi8vYW5vdGhlciBvbmUsIGVsc2UgZXRjIDUwMHcsXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcignSGFzIHNpemVzIHNlcGFyYXRlZCBieSBjb21tYScpO1xuICAgICAgICAgICAgc2l6ZVN0cmluZ3MgPSBzcmNTdHJpbmcuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGlmIChzaXplU3RyaW5ncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIHNpemVTdHJpbmdzLmZvckVhY2goc2l6ZVN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0U3RyaW5nID0gc2l6ZVN0cmluZy50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0U3RyaW5nLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc2l6ZVN0cmluZykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHNwbGl0U3RyaW5nW3NwbGl0U3RyaW5nLmxlbmd0aCAtIDFdLnJlcGxhY2UoJ3cnLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIoXCJGb3VuZCBhIHNpemU6IFwiICsgc2l6ZSArICcgZnJvbSBzdHJpbmcgJyArIHNpemVTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BsaXRTdHJpbmcuZm9yRWFjaCgoc3RyaW5nKSA9PiB7IHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzdHJpbmcsIHNpemUpKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhc1NpemVzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjLmluZGV4T2YoJyAnKSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcignSGFzIG11bHRpcGxlIHNvdXJjZXMgc2VwYXJhdGVkIGJ5IHNwYWNlcycpO1xuICAgICAgICAgICAgaWYgKHNpemVTdHJpbmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IHNyY1N0cmluZy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGFycmF5LmZvckVhY2goaXRlbSA9PiB7IHNyY1N0cmluZ3MucHVzaChpdGVtLnRyaW0oKSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JjU3RyaW5ncy5mb3JFYWNoKChzdHJpbmcpID0+IHsgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHN0cmluZykpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhc1NpemVzICYmICFoYXNNdWx0aXBsZVNyY3MpIHtcbiAgICAgICAgICAgIC8vQnVpbGQgZnJvbSBzaW5nbGUgc291cmNlXG4gICAgICAgICAgICBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc3JjKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3VyY2VzID0gdGhpcy5jbGVhbnVwU291cmNlcyhzcmNzVG9SZXR1cm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNvbmZsaWN0aW5nIHNvdXJjZXMgb2YgZGlmZmVyZW50IHR5cGVzIChjYW4gb25seSBoYXZlIG9uZSBvZiBlYWNoIHR5cGUpXG4gICAgICovXG4gICAgY2xlYW51cFNvdXJjZXMoc291cmNlcykge1xuICAgICAgICAvL1R5cGUgZmlyc3RcbiAgICAgICAgdGhpcy50eXBlID0gc291cmNlc1swXS50eXBlO1xuICAgICAgICB0aGlzLnVybCA9IHNvdXJjZXNbMF0udXJsO1xuICAgICAgICAvL1JldHVybiBvYmplY3QgaWYgb25seSBvbmUuXG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlcyAhPSAnb2JqZWN0JyB8fCBzb3VyY2VzLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ3lvdXR1YmUnIHx8IHRoaXMudHlwZSA9PSAndmltZW8nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBbc291cmNlc1swXV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHZXQgc2l6ZXNcbiAgICAgICAgICAgICAgICBsZXQgc2l6ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoISgnbWF4V2lkdGgnIGluIHNvdXJjZSkgfHwgdHlwZW9mIHNvdXJjZS5tYXhXaWR0aCAhPSAnbnVtYmVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghc2l6ZXMuaW5jbHVkZXMoc291cmNlLm1heFdpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXMucHVzaChzb3VyY2UubWF4V2lkdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJlYWtwb2ludHMgPSBzaXplcztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXMuZmlsdGVyKHNyYyA9PiB7IHJldHVybiBzcmMudHlwZSA9PSB0aGlzLnR5cGU7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHByZXBhcmVTaW5nbGVTb3VyY2UodXJsLCBzaXplID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgdXJsVHlwZSA9IHRoaXMuZ2V0U291cmNlVHlwZSh1cmwpO1xuICAgICAgICBsZXQgcmV0dXJuZXIgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHR5cGU6IHVybFR5cGUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh1cmxUeXBlID09ICdsb2NhbCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGZ0ID0gdGhpcy5nZXRGaWxlVHlwZSh1cmwpO1xuICAgICAgICAgICAgaWYgKGZ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsIG1heFdpZHRoOiBzaXplLCBmaWxlVHlwZTogZnQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0dXJuZXI7XG4gICAgfVxuICAgIGdldEZpbGVUeXBlKHVybCkge1xuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcubXA0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAnbXA0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcud2VibScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dlYm0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5vZ2cnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdvZ2cnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5vZ20nKSkge1xuICAgICAgICAgICAgcmV0dXJuICdvZ20nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlTWFsZm9ybWVkU291cmNlKHVybCkge1xuICAgICAgICB0aGlzLmxvZ2dlcihgSGFuZGxpbmcgZXJyb3IgZm9yICR7dXJsfWApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRTb3VyY2VUeXBlKHVybCkge1xuICAgICAgICBjb25zdCB5dFRlc3QgPSBuZXcgUmVnRXhwKC9eKD86aHR0cHM/Oik/KD86XFwvXFwvKT8oPzp5b3V0dVxcLmJlXFwvfCg/Ond3d1xcLnxtXFwuKT95b3V0dWJlXFwuY29tXFwvKD86d2F0Y2h8dnxlbWJlZCkoPzpcXC5waHApPyg/OlxcPy4qdj18XFwvKSkoW2EtekEtWjAtOVxcXy1dezcsMTV9KSg/OltcXD8mXVthLXpBLVowLTlcXF8tXSs9W2EtekEtWjAtOVxcXy1dKykqJC8pO1xuICAgICAgICBjb25zdCB2aW1lb1Rlc3QgPSBuZXcgUmVnRXhwKC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbMC05YS16XFwtX10rKS9pKTtcbiAgICAgICAgY29uc3QgdmlkZW9UZXN0ID0gbmV3IFJlZ0V4cCgvLio/XFwvLiood2VibXxtcDR8b2dnfG9nbSkuKj8vaSk7XG4gICAgICAgIGlmICh5dFRlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3lvdXR1YmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpbWVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAndmltZW8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZGVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbG9nZ2VyIEEgZ3VhcmRlZCBjb25zb2xlIGxvZ2dlci5cbiAgICAgKiBAcGFyYW0gbXNnIHRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgKiBAcGFyYW0gYWx3YXlzIFdoZXRoZXIgdG8gYWx3YXlzIHNob3cgaWYgbm90IHZlcmJvc2VcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgbG9nZ2VyKG1zZywgYWx3YXlzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGFsd2F5cyAmJiB0aGlzLmRlYnVnLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVidWcuZW5hYmxlZCB8fCAhdGhpcy5kZWJ1Zy52ZXJib3NlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImRiNjlmNTVjNWI1MGNiZWJlMThkXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9