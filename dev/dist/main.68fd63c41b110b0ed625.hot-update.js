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
/******/ 	__webpack_require__.h = () => ("3a50ff6d5ef3ef900739")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi42OGZkNjNjNDFiMTEwYjBlZDYyNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ21DO0FBQ007QUFDZDtBQUNsRTtBQUNBO0FBQ0EsYUFBYSw0REFBa0I7QUFDL0IsZ0JBQWdCLCtEQUFxQjtBQUNyQyxLQUFLO0FBQ0w7QUFDQSxhQUFhLGdFQUFvQjtBQUNqQyxnQkFBZ0IsbUVBQXVCO0FBQ3ZDO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMERBQWlCLEdBQUcsMkJBQTJCLFVBQVUsZUFBZTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHdEQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG1FQUFxQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxpQkFBaUIsa0JBQWtCLEdBQUcsa0NBQWtDLFdBQVcscUJBQXFCLGFBQWE7QUFDeks7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELDREQUE0RDtBQUN0SDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsK0JBQStCO0FBQ3ZFO0FBQ0EsNkNBQTZDLHNEQUFzRDtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsK0NBQStDLCtCQUErQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxJQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZKQUE2SixLQUFLO0FBQ2xLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDMXFCQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy92aWRlb0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2FuQXV0b1BsYXkgZnJvbSAnY2FuLWF1dG9wbGF5JztcbmltcG9ydCB7IGluaXRpYWxpemVWaW1lb0FQSSwgaW5pdGlhbGl6ZVZpbWVvUGxheWVyIH0gZnJvbSAnLi91dGlscy92aW1lbyc7XG5pbXBvcnQgeyBpbml0aWFsaXplWW91VHViZUFQSSwgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXIgfSBmcm9tICcuL3V0aWxzL3lvdXR1YmUnO1xuaW1wb3J0IHsgZmluZFBsYXllckFzcGVjdFJhdGlvLCBnZXRWaWRlb0lEIH0gZnJvbSAnLi91dGlscy91dGlscyc7XG5jb25zdCB2aWRlb1NvdXJjZU1vZHVsZXMgPSB7XG4gICAgdmltZW86IHtcbiAgICAgICAgYXBpOiBpbml0aWFsaXplVmltZW9BUEksXG4gICAgICAgIHBsYXllcjogaW5pdGlhbGl6ZVZpbWVvUGxheWVyXG4gICAgfSxcbiAgICB5b3V0dWJlOiB7XG4gICAgICAgIGFwaTogaW5pdGlhbGl6ZVlvdVR1YmVBUEksXG4gICAgICAgIHBsYXllcjogaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXJcbiAgICB9XG59O1xuZXhwb3J0IGNsYXNzIFZpZGVvQmFja2dyb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBicmVha3BvaW50cztcbiAgICBicm93c2VyQ2FuQXV0b1BsYXk7XG4gICAgY29udGFpbmVyO1xuICAgIGRlYnVnO1xuICAgIG11dGVCdXR0b247XG4gICAgb3ZlcmxheUVsO1xuICAgIHBhdXNlQnV0dG9uO1xuICAgIHBsYXllcjtcbiAgICBwb3N0ZXJFbDtcbiAgICBzY2FsZUZhY3RvcjtcbiAgICBzaXplO1xuICAgIHN0YXJ0VGltZTtcbiAgICBzb3VyY2VJZDtcbiAgICBzb3VyY2VzO1xuICAgIHNvdXJjZXNSZWFkeTtcbiAgICB0eXBlO1xuICAgIHVybDtcbiAgICB2aWRlb0FzcGVjdFJhdGlvO1xuICAgIHZpZGVvQ2FuQXV0b1BsYXk7XG4gICAgdmlkZW9FbDtcbiAgICB3aWR0aFN0b3JlO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvL1NldHRpbmcgdXAgcHJvcHNcbiAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSB0aGlzO1xuICAgICAgICB0aGlzLmJyb3dzZXJDYW5BdXRvUGxheSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZGVvQ2FuQXV0b1BsYXkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY2FsZUZhY3RvciA9IDE7XG4gICAgICAgIHRoaXMudmlkZW9Bc3BlY3RSYXRpbyA9IC42OTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB7XG4gICAgICAgICAgICByZWFkeTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIC8vU2V0dGluZyB1cCBkZWJ1Z1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYnVnJykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGVidWcnKSA9PSBcInZlcmJvc2VcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IHRydWUsIHZlcmJvc2U6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IHRydWUsIHZlcmJvc2U6IGZhbHNlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnID0geyBlbmFibGVkOiBmYWxzZSwgdmVyYm9zZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZ2dlcihcIkRlYnVnZ2luZyB2aWRlby1iYWNrZ3JvdW5kLlwiKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJ3YWl0aW5nXCI7XG4gICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXModGhpcy5zcmMpO1xuICAgICAgICB0aGlzLmJ1aWxkRE9NKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgIH1cbiAgICBidWlsZERPTSgpIHtcbiAgICAgICAgdGhpcy5idWlsZE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5idWlsZFBvc3RlcigpO1xuICAgICAgICBjYW5BdXRvUGxheS52aWRlbyh7IHRpbWVvdXQ6IDUwMCwgbXV0ZWQ6IHRydWUgfSkudGhlbigoeyByZXN1bHQsIGVycm9yIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUZhbGxiYWNrTm9WaWRlbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5icm93c2VyQ2FuQXV0b1BsYXkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuYnVpbGRWaWRlbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9DaGVjayBmb3Igb3ZlcmxheSB0aGluZ3MuXG4gICAgfVxuICAgIGJ1aWxkVmlkZW8oKSB7XG4gICAgICAgIC8vTmV2ZXIgc2hvdWxkIGhhdmUgbWl4ZWQgc291cmNlcy5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zb3VyY2VzKTtcbiAgICAgICAgaWYgKCF0aGlzLnNvdXJjZXNSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiQnVpbGRpbmcgdmlkZW8gYmFzZWQgb24gdHlwZTogXCIgKyB0aGlzLnR5cGUpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdsb2NhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRMb2NhbFZpZGVvKCk7XG4gICAgICAgICAgICAvL0NoZWNrIHRvIG1ha2Ugc3VyZSB3ZSBoYXZlIHNvdXJjZXNcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVZpZGVvQVBJKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlRmFsbGJhY2tOb1ZpZGVvKCkge1xuICAgICAgICB0aGlzLmxvZ2dlcihcIlZpZGVvIFdvbid0IHBsYXksIGRlZmF1bHRpbmcgdG8gZmFsbGJhY2tcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJmYWxsYmFja1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGluaXRpYWxpemVWaWRlb0FQSSBMb2FkIHRoZSBBUEkgZm9yIHRoZSBhcHByb3ByaWF0ZSBzb3VyY2UuIFRoaXMgYWJzdHJhY3Rpb24gbm9ybWFsaXplcyB0aGVcbiAgICAgKiBpbnRlcmZhY2VzIGZvciBZb3VUdWJlIGFuZCBWaW1lbywgYW5kIHBvdGVudGlhbGx5IG90aGVyIHByb3ZpZGVycy5cbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgaW5pdGlhbGl6ZVZpZGVvQVBJKCkge1xuICAgICAgICBpZiAoIXRoaXMudXJsIHx8ICF0aGlzLnBsYXllciB8fCAodGhpcy50eXBlICE9ICd5b3V0dWJlJyAmJiB0aGlzLnR5cGUgIT0gJ3ZpbWVvJykpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKCdQcm9ibGVtIHdpdGggaW5pdGlhbGl6aW5nIHZpZGVvIEFQSS4gQ29udGFjdCB0aGUgZGV2ZWxvcGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWQgPSBnZXRWaWRlb0lEKHRoaXMudXJsLCB0aGlzLnR5cGUpO1xuICAgICAgICBpZiAodGhpcy5icm93c2VyQ2FuQXV0b1BsYXkgJiYgaWQpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VBUElGdW5jdGlvbiA9IHZpZGVvU291cmNlTW9kdWxlc1t0aGlzLnR5cGVdLmFwaTtcbiAgICAgICAgICAgIGNvbnN0IGFwaVByb21pc2UgPSBzb3VyY2VBUElGdW5jdGlvbih3aW5kb3cpO1xuICAgICAgICAgICAgYXBpUHJvbWlzZS50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVZpZGVvUGxheWVyKCk7XG4gICAgICAgICAgICB9KS5jYXRjaCgobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncmVhZHknKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcihtZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdyZWFkeScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICogQG1ldGhvZCBpbml0aWFsaXplVmlkZW9QbGF5ZXIgSW5pdGlhbGl6ZSB0aGUgdmlkZW8gcGxheWVyIGFuZCByZWdpc3RlciBpdHMgY2FsbGJhY2tzLlxuICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICovXG4gICAgaW5pdGlhbGl6ZVZpZGVvUGxheWVyKCkge1xuICAgICAgICBpZiAoIXRoaXMudXJsIHx8ICF0aGlzLnBsYXllciB8fCAodGhpcy50eXBlICE9ICd5b3V0dWJlJyAmJiB0aGlzLnR5cGUgIT0gJ3ZpbWVvJykpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKCdQcm9ibGVtIHdpdGggaW5pdGlhbGl6aW5nIHZpZGVvIEFQSS4gQ29udGFjdCB0aGUgZGV2ZWxvcGVyJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucGxheWVyLnJlYWR5KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gbm90aGluZyB0byBkZXN0cm95XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZWFkeSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICgodGhpcy50eXBlICE9ICd5b3V0dWJlJyAmJiB0aGlzLnR5cGUgIT0gJ3ZpbWVvJykpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzb3VyY2VQbGF5ZXJGdW5jdGlvbiA9IHZpZGVvU291cmNlTW9kdWxlc1t0aGlzLnR5cGVdLnBsYXllcjtcbiAgICAgICAgY29uc3QgcGxheWVyUHJvbWlzZSA9IHNvdXJjZVBsYXllckZ1bmN0aW9uKHtcbiAgICAgICAgICAgIGluc3RhbmNlOiB0aGlzLFxuICAgICAgICAgICAgY29udGFpbmVyOiB0aGlzLFxuICAgICAgICAgICAgd2luOiB3aW5kb3csXG4gICAgICAgICAgICB2aWRlb0lkOiB0aGlzLmlkLFxuICAgICAgICAgICAgc3BlZWQ6IDEsXG4gICAgICAgICAgICBzdGFydFRpbWU6IHRoaXMuc3RhcnRUaW1lLFxuICAgICAgICAgICAgcmVhZHlDYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllciAmJiB0aGlzLnBsYXllci5pZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaWZyYW1lLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQtdmlkZW8nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0FzcGVjdFJhdGlvID0gZmluZFBsYXllckFzcGVjdFJhdGlvKHRoaXMuY29udGFpbmVyLCB0aGlzLnBsYXllciwgdGhpcy50eXBlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN5bmNQbGF5ZXIoKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkeUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCdyZWFkeScpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLmRpc3BhdGNoRXZlbnQocmVhZHlFdmVudCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjazogKHN0YXRlLCBkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdwbGF5aW5nJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy52aWRlb0NhbkF1dG9QbGF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHZpZGVvIGVsZW1lbnQgYmVnYWluIHRvIGF1dG8gcGxheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcigndmlkZW8gc3RhcnRlZCBwbGF5aW5nJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWRlb0NhbkF1dG9QbGF5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuaWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5pZnJhbWUuY2xhc3NMaXN0LmFkZCgncmVhZHknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdtb2JpbGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIoc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcihkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwbGF5ZXJQcm9taXNlLnRoZW4ocGxheWVyID0+IHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICB9LCByZWFzb24gPT4ge1xuICAgICAgICAgICAgLy8gRWl0aGVyIHRoZSB2aWRlbyBlbWJlZCBmYWlsZWQgdG8gbG9hZCBmb3IgYW55IHJlYXNvbiAoZS5nLiBuZXR3b3JrIGxhdGVuY3ksIGRlbGV0ZWQgdmlkZW8sIGV0Yy4pLFxuICAgICAgICAgICAgLy8gb3IgdGhlIHZpZGVvIGVsZW1lbnQgaW4gdGhlIGVtYmVkIHdhcyBub3QgY29uZmlndXJlZCB0byBwcm9wZXJseSBhdXRvIHBsYXkuXG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihyZWFzb24pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3luY1BsYXllcigpIHtcbiAgICAgICAgdGhpcy5zY2FsZVZpZGVvKDEpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIHNjYWxlVmlkZW8gVGhlIElGUkFNRSB3aWxsIGJlIHRoZSBlbnRpcmUgd2lkdGggYW5kIGhlaWdodCBvZiBpdHMgY29udGFpbmVyLCBidXQgdGhlIHZpZGVvXG4gICAgICogbWF5IGJlIGEgY29tcGxldGVseSBkaWZmZXJlbnQgc2l6ZSBhbmQgcmF0aW8uIFNjYWxlIHVwIHRoZSBJRlJBTUUgc28gdGhlIGlubmVyIHZpZGVvXG4gICAgICogYmVoYXZlcyBpbiB0aGUgcHJvcGVyIGBtb2RlYCwgd2l0aCBvcHRpb25hbCBhZGRpdGlvbmFsIHNjYWxpbmcgdG8gem9vbSBpbi4gQWxzbyBhbGxvd1xuICAgICAqIEltYWdlTG9hZGVyIHRvIHJlbG9hZCB0aGUgY3VzdG9tIGZhbGxiYWNrIGltYWdlLCBpZiBhcHByb3ByaWF0ZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3NjYWxlVmFsdWVdIEEgbXVsdGlwbGllciB1c2VkIHRvIGluY3JlYXNlIHRoZSBzY2FsZWQgc2l6ZSBvZiB0aGUgbWVkaWEuXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIHNjYWxlVmlkZW8oc2NhbGVWYWx1ZSA9IDEpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBsYXllcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBsYXllcklmcmFtZSA9IHRoaXMucGxheWVyLmlmcmFtZTtcbiAgICAgICAgaWYgKCFwbGF5ZXJJZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2NhbGUgPSB0aGlzLnNjYWxlRmFjdG9yID8/IHNjYWxlVmFsdWU7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgIT09ICdmaWxsJykge1xuICAgICAgICAgICAgcGxheWVySWZyYW1lLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgICAgICBwbGF5ZXJJZnJhbWUuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaWZyYW1lUGFyZW50ID0gcGxheWVySWZyYW1lLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIGlmIChpZnJhbWVQYXJlbnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gaWZyYW1lUGFyZW50LmNsaWVudFdpZHRoO1xuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBpZnJhbWVQYXJlbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBjb25zdCBjb250YWluZXJSYXRpbyA9IGNvbnRhaW5lcldpZHRoIC8gY29udGFpbmVySGVpZ2h0O1xuICAgICAgICBsZXQgcFdpZHRoID0gMDtcbiAgICAgICAgbGV0IHBIZWlnaHQgPSAwO1xuICAgICAgICBpZiAoY29udGFpbmVyUmF0aW8gPiB0aGlzLnZpZGVvQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgICAgIC8vIGF0IHRoZSBzYW1lIHdpZHRoLCB0aGUgdmlkZW8gaXMgdGFsbGVyIHRoYW4gdGhlIHdpbmRvd1xuICAgICAgICAgICAgcFdpZHRoID0gY29udGFpbmVyV2lkdGggKiBzY2FsZTtcbiAgICAgICAgICAgIHBIZWlnaHQgPSBjb250YWluZXJXaWR0aCAqIHNjYWxlIC8gdGhpcy52aWRlb0FzcGVjdFJhdGlvO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudmlkZW9Bc3BlY3RSYXRpbyA+IGNvbnRhaW5lclJhdGlvKSB7XG4gICAgICAgICAgICAvLyBhdCB0aGUgc2FtZSB3aWR0aCwgdGhlIHZpZGVvIGlzIHNob3J0ZXIgdGhhbiB0aGUgd2luZG93XG4gICAgICAgICAgICBwV2lkdGggPSBjb250YWluZXJIZWlnaHQgKiBzY2FsZSAqIHRoaXMudmlkZW9Bc3BlY3RSYXRpbztcbiAgICAgICAgICAgIHBIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgKiBzY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoZSB3aW5kb3cgYW5kIHZpZGVvIHJhdGlvcyBtYXRjaFxuICAgICAgICAgICAgcFdpZHRoID0gY29udGFpbmVyV2lkdGggKiBzY2FsZTtcbiAgICAgICAgICAgIHBIZWlnaHQgPSBjb250YWluZXJIZWlnaHQgKiBzY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBwbGF5ZXJJZnJhbWUuc3R5bGUud2lkdGggPSBwV2lkdGggKyAncHgnO1xuICAgICAgICBwbGF5ZXJJZnJhbWUuc3R5bGUuaGVpZ2h0ID0gcEhlaWdodCArICdweCc7XG4gICAgICAgIHBsYXllcklmcmFtZS5zdHlsZS5sZWZ0ID0gMCAtICgocFdpZHRoIC0gY29udGFpbmVyV2lkdGgpIC8gMikgKyAncHgnO1xuICAgICAgICBwbGF5ZXJJZnJhbWUuc3R5bGUudG9wID0gMCAtICgocEhlaWdodCAtIGNvbnRhaW5lckhlaWdodCkgLyAyKSArICdweCc7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgYnVpbGRMb2NhbFZpZGVvIExvYWQgYSB2aWRlbyBlbGVtZW50IHVzaW5nIGxvY2FsIGZpbGVzIG9yIHNldHMgb2YgZmlsZXMuXG4gICAgICogQHRvZG8gYWJzdHJhY3Qgb3V0IHRoZXNlIGZ1bmN0aW9ucywgbWF5YmUgdG8gYSBzZXBhcmF0ZSBjbGFzcz9cbiAgICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGJ1aWxkTG9jYWxWaWRlbygpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoXCJCdWlsZGluZyBsb2NhbCB2aWRlb1wiKTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW9FbCAmJiB0aGlzLnZpZGVvRWwuaGFzQXR0cmlidXRlKCdwbGF5c2lubGluZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMudmlkZW9FbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNvdXJjZXMpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiTm8gc291cmNlcyBmb3IgbG9jYWwgdmlkZW9cIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVGYWxsYmFja05vVmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICAvL1dlIG5lZWQgdG8gZ2V0IHNpemUgd2hlbiBicmVha3BvaW50c1xuICAgICAgICBsZXQgc3JjU2V0ID0gdGhpcy5zb3VyY2VzO1xuICAgICAgICBpZiAodGhpcy5icmVha3BvaW50cyAmJiB0aGlzLmJyZWFrcG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiVmlkZW8gaGFzIGJyZWFrcG9pbnRzXCIpO1xuICAgICAgICAgICAgc3JjU2V0ID0gdGhpcy5nZXRTb3VyY2VzRmlsdGVyZWRCeVNpemUodGhpcy5zb3VyY2VzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNoZWNrSWZQYXNzZWRCcmVha3BvaW50cy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjU2V0ICYmIHNyY1NldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuY2xhc3NMaXN0LmFkZCgndmJnX192aWRlbycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucG9zdGVyID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgncG9zdGVyJywgdGhpcy5wb3N0ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubXV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHNyY1NldC5mb3JFYWNoKHNyYyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcbiAgICAgICAgICAgICAgICBpZiAoJ2ZpbGVUeXBlJyBpbiBzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQudHlwZSA9ICd2aWRlby8nICsgc3JjLmZpbGVUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGlsZC5zcmMgPSBzcmMudXJsO1xuICAgICAgICAgICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW9FbCAmJiBzZWxmLnZpZGVvRWwuY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsPy5hcHBlbmQoY2hpbGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKHRoaXMudmlkZW9FbCk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZGVvRWw/LmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5tdXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubXV0ZVZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXV0ZVZpZGVvKCkge1xuICAgICAgICB0aGlzLmxvZ2dlcignbXV0aW5nIHZpZGVvJyk7XG4gICAgICAgIGNvbnN0IHZpZGVvVG9NdXRlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICBpZiAodmlkZW9Ub011dGUpIHtcbiAgICAgICAgICAgIHZpZGVvVG9NdXRlLnZvbHVtZSA9IDA7XG4gICAgICAgICAgICB2aWRlb1RvTXV0ZS5tdXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U291cmNlc0ZpbHRlcmVkQnlTaXplKHNvdXJjZXMpIHtcbiAgICAgICAgY29uc3Qgd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy53aWR0aFN0b3JlID0gd1c7XG4gICAgICAgIGxldCBzb3J0ZWRCeVNpemUgPSB7ICdtYXgnOiBbXSB9O1xuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCgnbWF4V2lkdGgnIGluIHNvdXJjZSkgJiYgc291cmNlLm1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdyA9IHNvdXJjZS5tYXhXaWR0aC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChzb3J0ZWRCeVNpemUgIT0gdW5kZWZpbmVkICYmICFPYmplY3Qua2V5cyhzb3J0ZWRCeVNpemUpLmluY2x1ZGVzKHcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVt3XSA9IFtzb3VyY2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkQnlTaXplW3ddLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgnbWF4V2lkdGgnIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVsnbWF4J10ucHVzaChzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcignQnJlYWtwb2ludHMgbm90IGRlZmluZWQgYXQgc2l6ZSBmaWx0ZXIuIFNvbWV0aGluZ1xcJ3Mgd3JvbmcnLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQcmVzZW50ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHdXXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQuaW5kZXhPZih3Vyk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPT0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gc29ydGVkQnlTaXplWydtYXgnXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWRCeVNpemVbYnJlYWtwb2ludHNXaXRoUHJlc2VudFtjdXJyZW50SW5kZXggKyAxXS50b1N0cmluZygpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0lmUGFzc2VkQnJlYWtwb2ludHMoKSB7XG4gICAgICAgIGlmICghdGhpcy53aWR0aFN0b3JlIHx8ICF0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFBhc3QgPSBbLi4udGhpcy5icmVha3BvaW50cywgdGhpcy53aWR0aFN0b3JlXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQcmVzZW50ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHdXXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IHBhc3RJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFBhc3QuaW5kZXhPZih0aGlzLndpZHRoU3RvcmUpO1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBicmVha3BvaW50c1dpdGhQcmVzZW50LmluZGV4T2Yod1cpO1xuICAgICAgICB0aGlzLmxvZ2dlcihgY29tcGFyaW5nIHBhc3QgYnJlYWtwb2ludCBvZiAke3RoaXMud2lkdGhTdG9yZX0gd2l0aCBjdXJyZW50IG9mICR7d1d9LiBBcmUgd2UgZ29vZD8gVGhlIHBhc3Qgb25lIHdhcyAke3Bhc3RJbmRleH0gYW5kIGN1cnJlbnRseSBpdCdzICR7Y3VycmVudEluZGV4fWApO1xuICAgICAgICBpZiAocGFzdEluZGV4ICE9IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5idWlsZExvY2FsVmlkZW8oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBidWlsZFBvc3RlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvc3RlclNldCAmJiAhdGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3RlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnX19wb3N0ZXInKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgaWYgKHRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGltYWdlTG9hZGVyRWwgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuc3JjID0gdGhpcy5wb3N0ZXI7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYgJiYgc2VsZi5wb3N0ZXJFbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLnNyYyA9IGltYWdlTG9hZGVyRWwuc3JjO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc3RlclNldCkge1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zcmNzZXQgPSB0aGlzLnBvc3RlclNldDtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc2l6ZXMgPSB0aGlzLnNpemUgfHwgXCIxMDB2d1wiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5wb3N0ZXJFbCk7XG4gICAgfVxuICAgIGJ1aWxkT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuY2xhc3NMaXN0LmFkZCgndmJnX19vdmVybGF5Jyk7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgIH1cbiAgICBidWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0IGF1dG9wbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbG9vcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdsb29wJykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbXV0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbXV0ZWQnKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldCBhdXRvcGxheShpc0F1dG9wbGF5KSB7XG4gICAgICAgIGlmIChpc0F1dG9wbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYXV0b3BsYXknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgbXV0ZWQoaXNNdXRlZCkge1xuICAgICAgICBpZiAoaXNNdXRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ211dGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IGxvb3AoaXNMb29wKSB7XG4gICAgICAgIGlmIChpc0xvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2xvb3AnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgbW9kZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtb2RlJykgPT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJmaWxsXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJmaXRcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgbW9kZShmaXRPckZpbGwpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ21vZGUnLCBmaXRPckZpbGwpO1xuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICBjb25zdCBzdGF0dXNTdHJpbmcgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3RhdHVzJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzU3RyaW5nID09ICdzdHJpbmcnICYmIChzdGF0dXNTdHJpbmcgPT0gXCJsb2FkaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFsbGJhY2tcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJsb2FkZWRcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJidWZmZXJpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJmYWlsZWRcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJ3YWl0aW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibm9uZVwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImVycm9yXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogVXBkYXRlcyBzdGF0dXMgb24gdGhlIGFjdHVhbCBlbGVtZW50IGFzIHdlbGwgYXMgdGhlIHByb3BlcnR5IG9mIHRoZSBjbGFzcyAqL1xuICAgIHNldCBzdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyAgIGNhc2UgKFwid2FpdGluZ1wiIHx8IFwibG9hZGluZ1wiKTpcbiAgICAgICAgICAgIC8vICAgYnJlYWs7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcG9zdGVyKCkge1xuICAgICAgICBjb25zdCBwb3N0ZXJWYWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIGlmIChwb3N0ZXJWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RlclZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcG9zdGVyU2V0KCkge1xuICAgICAgICBjb25zdCBwb3N0ZXJWYWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgncG9zdGVyc2V0Jyk7XG4gICAgICAgIGlmIChwb3N0ZXJWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RlclZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc3JjKCkge1xuICAgICAgICBjb25zdCBzcmMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3JjID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNyYztcbiAgICB9XG4gICAgc2V0IHNyYyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjU3RyaW5nKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXMoc3JjU3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb3N0ZXIgdXJsIHN0cmluZywgYW5kIHNldHMgbG9hZGluZyB0aGF0IHBvc3RlciBpbnRvIG1vdGlvblxuICAgICAqL1xuICAgIHNldCBwb3N0ZXIocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgIGlmIChwb3N0ZXJTdHJpbmcpIHtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyAgIGNhc2UgKFwid2FpdGluZ1wiIHx8IFwibG9hZGluZ1wiKTpcbiAgICAgICAgICAgIC8vICAgYnJlYWs7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zdGVyJywgcG9zdGVyU3RyaW5nKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQb3N0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdwb3N0ZXInKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL1xuICAgIGNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZykge1xuICAgICAgICBpZiAoc3JjU3RyaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiTm8gc291cmNlIHByb3ZpZGVkIGZvciB2aWRlbyBiYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcmMgPSBzcmNTdHJpbmcudHJpbSgpO1xuICAgICAgICBsZXQgc3Jjc1RvUmV0dXJuID0gW107XG4gICAgICAgIGxldCBzcmNTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBzaXplU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgaGFzTXVsdGlwbGVTcmNzID0gZmFsc2UsIGhhc1NpemVzID0gZmFsc2U7XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignLCcpID49IDApIHtcbiAgICAgICAgICAgIC8vTG9va3MgbGlrZSBodHRwczovL3NvbWV0aGluZyAzMDB3LCBodHRwczovL3NvbWV0aGluZyBodHRwczovL2Fub3RoZXIgb25lLCBlbHNlIGV0YyA1MDB3LFxuICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ0hhcyBzaXplcyBzZXBhcmF0ZWQgYnkgY29tbWEnKTtcbiAgICAgICAgICAgIHNpemVTdHJpbmdzID0gc3JjU3RyaW5nLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBpZiAoc2l6ZVN0cmluZ3MubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBzaXplU3RyaW5ncy5mb3JFYWNoKHNpemVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGxpdFN0cmluZyA9IHNpemVTdHJpbmcudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGxpdFN0cmluZy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHNpemVTdHJpbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSBwYXJzZUludChzcGxpdFN0cmluZ1tzcGxpdFN0cmluZy5sZW5ndGggLSAxXS5yZXBsYWNlKCd3JywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiRm91bmQgYSBzaXplOiBcIiArIHNpemUgKyAnIGZyb20gc3RyaW5nICcgKyBzaXplU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwbGl0U3RyaW5nLmZvckVhY2goKHN0cmluZykgPT4geyBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc3RyaW5nLCBzaXplKSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYXNTaXplcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyYy5pbmRleE9mKCcgJykgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ0hhcyBtdWx0aXBsZSBzb3VyY2VzIHNlcGFyYXRlZCBieSBzcGFjZXMnKTtcbiAgICAgICAgICAgIGlmIChzaXplU3RyaW5ncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBzcmNTdHJpbmcuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBhcnJheS5mb3JFYWNoKGl0ZW0gPT4geyBzcmNTdHJpbmdzLnB1c2goaXRlbS50cmltKCkpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNyY1N0cmluZ3MuZm9yRWFjaCgoc3RyaW5nKSA9PiB7IHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzdHJpbmcpKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNTaXplcyAmJiAhaGFzTXVsdGlwbGVTcmNzKSB7XG4gICAgICAgICAgICAvL0J1aWxkIGZyb20gc2luZ2xlIHNvdXJjZVxuICAgICAgICAgICAgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHNyYykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlcyA9IHRoaXMuY2xlYW51cFNvdXJjZXMoc3Jjc1RvUmV0dXJuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjb25mbGljdGluZyBzb3VyY2VzIG9mIGRpZmZlcmVudCB0eXBlcyAoY2FuIG9ubHkgaGF2ZSBvbmUgb2YgZWFjaCB0eXBlKVxuICAgICAqL1xuICAgIGNsZWFudXBTb3VyY2VzKHNvdXJjZXMpIHtcbiAgICAgICAgLy9UeXBlIGZpcnN0XG4gICAgICAgIHRoaXMudHlwZSA9IHNvdXJjZXNbMF0udHlwZTtcbiAgICAgICAgdGhpcy51cmwgPSBzb3VyY2VzWzBdLnVybDtcbiAgICAgICAgLy9SZXR1cm4gb2JqZWN0IGlmIG9ubHkgb25lLlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXMgIT0gJ29iamVjdCcgfHwgc291cmNlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09ICd5b3V0dWJlJyB8fCB0aGlzLnR5cGUgPT0gJ3ZpbWVvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NvdXJjZXNbMF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHNpemVzXG4gICAgICAgICAgICAgICAgbGV0IHNpemVzID0gW107XG4gICAgICAgICAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoJ21heFdpZHRoJyBpbiBzb3VyY2UpIHx8IHR5cGVvZiBzb3VyY2UubWF4V2lkdGggIT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNpemVzLmluY2x1ZGVzKHNvdXJjZS5tYXhXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzLnB1c2goc291cmNlLm1heFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRzID0gc2l6ZXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2VzLmZpbHRlcihzcmMgPT4geyByZXR1cm4gc3JjLnR5cGUgPT0gdGhpcy50eXBlOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcmVwYXJlU2luZ2xlU291cmNlKHVybCwgc2l6ZSA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHVybFR5cGUgPSB0aGlzLmdldFNvdXJjZVR5cGUodXJsKTtcbiAgICAgICAgbGV0IHJldHVybmVyID0ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiB1cmxUeXBlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodXJsVHlwZSA9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgICBjb25zdCBmdCA9IHRoaXMuZ2V0RmlsZVR5cGUodXJsKTtcbiAgICAgICAgICAgIGlmIChmdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnJldHVybmVyLCBtYXhXaWR0aDogc2l6ZSwgZmlsZVR5cGU6IGZ0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJldHVybmVyO1xuICAgIH1cbiAgICBnZXRGaWxlVHlwZSh1cmwpIHtcbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm1wNCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21wNCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLndlYm0nKSkge1xuICAgICAgICAgICAgcmV0dXJuICd3ZWJtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dtJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoYEhhbmRsaW5nIGVycm9yIGZvciAke3VybH1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0U291cmNlVHlwZSh1cmwpIHtcbiAgICAgICAgY29uc3QgeXRUZXN0ID0gbmV3IFJlZ0V4cCgvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KD86eW91dHVcXC5iZVxcL3woPzp3d3dcXC58bVxcLik/eW91dHViZVxcLmNvbVxcLyg/OndhdGNofHZ8ZW1iZWQpKD86XFwucGhwKT8oPzpcXD8uKnY9fFxcLykpKFthLXpBLVowLTlcXF8tXXs3LDE1fSkoPzpbXFw/Jl1bYS16QS1aMC05XFxfLV0rPVthLXpBLVowLTlcXF8tXSspKiQvKTtcbiAgICAgICAgY29uc3QgdmltZW9UZXN0ID0gbmV3IFJlZ0V4cCgvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oWzAtOWEtelxcLV9dKykvaSk7XG4gICAgICAgIGNvbnN0IHZpZGVvVGVzdCA9IG5ldyBSZWdFeHAoLy4qP1xcLy4qKHdlYm18bXA0fG9nZ3xvZ20pLio/L2kpO1xuICAgICAgICBpZiAoeXRUZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICd5b3V0dWJlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aW1lb1Rlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ZpbWVvJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aWRlb1Rlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2xvY2FsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGxvZ2dlciBBIGd1YXJkZWQgY29uc29sZSBsb2dnZXIuXG4gICAgICogQHBhcmFtIG1zZyB0aGUgbWVzc2FnZSB0byBzZW5kXG4gICAgICogQHBhcmFtIGFsd2F5cyBXaGV0aGVyIHRvIGFsd2F5cyBzaG93IGlmIG5vdCB2ZXJib3NlXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGxvZ2dlcihtc2csIGFsd2F5cyA9IGZhbHNlKSB7XG4gICAgICAgIGlmIChhbHdheXMgJiYgdGhpcy5kZWJ1Zy5lbmFibGVkKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRlYnVnLmVuYWJsZWQgfHwgIXRoaXMuZGVidWcudmVyYm9zZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIzYTUwZmY2ZDVlZjNlZjkwMDczOVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==