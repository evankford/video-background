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
    overlayEl;
    posterEl;
    browserCanAutoPlay;
    player;
    videoEl;
    muteButton;
    pauseButton;
    size;
    type;
    breakpoints;
    widthStore;
    sourcesReady;
    sources;
    debug;
    constructor() {
        super();
        this.sourcesReady = false;
        this.browserCanAutoPlay = false;
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
        if (!this.sources || ('id' in this.sources[0])) {
            return;
        }
        if (this.browserCanAutoPlay && this.sources[0].id) {
            this.player.ready = false;
            const sourceAPIFunction = videoSourceModules[this.videoSource].api;
            const apiPromise = sourceAPIFunction(this.windowContext);
            apiPromise.then((message) => {
                this.logger(message);
                this.player.ready = false;
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
        console.log(breakpointsWithPresent);
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
            if (this.debug) {
                console.log("No source provided for video background");
            }
            return false;
        }
        let src = srcString.trim();
        let srcsToReturn = [];
        let srcStrings = [];
        let sizeStrings = [];
        let hasMultipleSrcs = false, hasSizes = false;
        if (src.indexOf(',') >= 0) {
            //Looks like https://something 300w, https://something https://another one, else etc 500w,
            this.debug && console.log('Has sizes separated by comma');
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
            this.debug && console.log('Has multiple sources separated by spaces');
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
        ;
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
    prepareSingleSource(url, size) {
        const urlType = this.getSourceType(url);
        let returner = {
            url: url,
            type: urlType,
        };
        if (urlType == 'youtube') {
            const startTime = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.getStartTime)(url, 'youtube');
            if (startTime) {
                returner.startTime = startTime;
            }
            return { ...returner,
                id: this.getYoutubeIdFromSource(url),
            };
        }
        else if (urlType == 'vimeo') {
            const startTime = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.getStartTime)(url, 'vimeo');
            if (startTime) {
                returner.startTime = startTime;
            }
            return { ...returner,
                id: this.getVimeoIdFromSource(url)
            };
        }
        else {
            const ft = this.getFileType(url);
            if (size) {
                returner.maxWidth = size;
            }
            else {
                returner.maxWidth = false;
            }
            if (ft) {
                return { ...returner, fileType: ft };
            }
        }
        return this.handleMalformedSource(url);
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
    getYoutubeIdFromSource(url) {
        var re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i;
        var matches = re.exec(url);
        if (matches && matches[1]) {
            return matches[1];
        }
        return false;
    }
    getVimeoIdFromSource(url) {
        var re = /\/\/(?:www\.)?vimeo.com\/([a-z0-9_\-]+)/i;
        var matches = re.exec(url);
        if (matches && matches[1]) {
            return matches[1];
        }
        return false;
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
/******/ 	__webpack_require__.h = () => ("3ae7f7cf089945b52aec")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCw0REFBNEQ7QUFDdEg7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLCtCQUErQjtBQUN2RTtBQUNBLDZDQUE2QyxzREFBc0Q7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLCtDQUErQywrQkFBK0I7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMERBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxJQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZKQUE2SixLQUFLO0FBQ2xLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUMzakJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3ZpZGVvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYW5BdXRvUGxheSBmcm9tICdjYW4tYXV0b3BsYXknO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVZpbWVvQVBJLCBpbml0aWFsaXplVmltZW9QbGF5ZXIgfSBmcm9tICcuL3V0aWxzL3ZpbWVvJztcbmltcG9ydCB7IGluaXRpYWxpemVZb3VUdWJlQVBJLCBpbml0aWFsaXplWW91VHViZVBsYXllciB9IGZyb20gJy4vdXRpbHMveW91dHViZSc7XG5pbXBvcnQgeyBnZXRTdGFydFRpbWUgfSBmcm9tICcuL3V0aWxzL3V0aWxzJztcbmNvbnN0IHZpZGVvU291cmNlTW9kdWxlcyA9IHtcbiAgICB2aW1lbzoge1xuICAgICAgICBhcGk6IGluaXRpYWxpemVWaW1lb0FQSSxcbiAgICAgICAgcGxheWVyOiBpbml0aWFsaXplVmltZW9QbGF5ZXJcbiAgICB9LFxuICAgIHlvdXR1YmU6IHtcbiAgICAgICAgYXBpOiBpbml0aWFsaXplWW91VHViZUFQSSxcbiAgICAgICAgcGxheWVyOiBpbml0aWFsaXplWW91VHViZVBsYXllclxuICAgIH1cbn07XG5leHBvcnQgY2xhc3MgVmlkZW9CYWNrZ3JvdW5kIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIG92ZXJsYXlFbDtcbiAgICBwb3N0ZXJFbDtcbiAgICBicm93c2VyQ2FuQXV0b1BsYXk7XG4gICAgcGxheWVyO1xuICAgIHZpZGVvRWw7XG4gICAgbXV0ZUJ1dHRvbjtcbiAgICBwYXVzZUJ1dHRvbjtcbiAgICBzaXplO1xuICAgIHR5cGU7XG4gICAgYnJlYWtwb2ludHM7XG4gICAgd2lkdGhTdG9yZTtcbiAgICBzb3VyY2VzUmVhZHk7XG4gICAgc291cmNlcztcbiAgICBkZWJ1ZztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5icm93c2VyQ2FuQXV0b1BsYXkgPSBmYWxzZTtcbiAgICAgICAgLy9TZXR0aW5nIHVwIGRlYnVnXG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGVidWcnKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdkZWJ1ZycpID09IFwidmVyYm9zZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHsgZW5hYmxlZDogdHJ1ZSwgdmVyYm9zZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyA9IHsgZW5hYmxlZDogdHJ1ZSwgdmVyYm9zZTogZmFsc2UgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IGZhbHNlLCB2ZXJib3NlOiBmYWxzZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlYnVnZ2luZyB2aWRlby1iYWNrZ3JvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcIndhaXRpbmdcIjtcbiAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyh0aGlzLnNyYyk7XG4gICAgICAgIHRoaXMuYnVpbGRET00oKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgfVxuICAgIGJ1aWxkRE9NKCkge1xuICAgICAgICB0aGlzLmJ1aWxkT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIGNhbkF1dG9QbGF5LnZpZGVvKHsgdGltZW91dDogNTAwLCBtdXRlZDogdHJ1ZSB9KS50aGVuKCh7IHJlc3VsdCwgZXJyb3IgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlRmFsbGJhY2tOb1ZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJyb3dzZXJDYW5BdXRvUGxheSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZFZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL0NoZWNrIGZvciBvdmVybGF5IHRoaW5ncy5cbiAgICB9XG4gICAgYnVpbGRWaWRlbygpIHtcbiAgICAgICAgLy9OZXZlciBzaG91bGQgaGF2ZSBtaXhlZCBzb3VyY2VzLlxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvdXJjZXMpO1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlc1JlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dnZXIoXCJCdWlsZGluZyB2aWRlbyBiYXNlZCBvbiB0eXBlOiBcIiArIHRoaXMudHlwZSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2xvY2FsJykge1xuICAgICAgICAgICAgdGhpcy5idWlsZExvY2FsVmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdGlhbGl6ZVZpZGVvQVBJKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlRmFsbGJhY2tOb1ZpZGVvKCkge1xuICAgICAgICB0aGlzLmxvZ2dlcihcIlZpZGVvIFdvbid0IHBsYXksIGRlZmF1bHRpbmcgdG8gZmFsbGJhY2tcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJmYWxsYmFja1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGluaXRpYWxpemVWaWRlb0FQSSBMb2FkIHRoZSBBUEkgZm9yIHRoZSBhcHByb3ByaWF0ZSBzb3VyY2UuIFRoaXMgYWJzdHJhY3Rpb24gbm9ybWFsaXplcyB0aGVcbiAgICAgKiBpbnRlcmZhY2VzIGZvciBZb3VUdWJlIGFuZCBWaW1lbywgYW5kIHBvdGVudGlhbGx5IG90aGVyIHByb3ZpZGVycy5cbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgaW5pdGlhbGl6ZVZpZGVvQVBJKCkge1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlcyB8fCAoJ2lkJyBpbiB0aGlzLnNvdXJjZXNbMF0pKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYnJvd3NlckNhbkF1dG9QbGF5ICYmIHRoaXMuc291cmNlc1swXS5pZCkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZUFQSUZ1bmN0aW9uID0gdmlkZW9Tb3VyY2VNb2R1bGVzW3RoaXMudmlkZW9Tb3VyY2VdLmFwaTtcbiAgICAgICAgICAgIGNvbnN0IGFwaVByb21pc2UgPSBzb3VyY2VBUElGdW5jdGlvbih0aGlzLndpbmRvd0NvbnRleHQpO1xuICAgICAgICAgICAgYXBpUHJvbWlzZS50aGVuKChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVWaWRlb1BsYXllcigpO1xuICAgICAgICAgICAgfSkuY2F0Y2goKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3JlYWR5Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIobWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncmVhZHknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBAbWV0aG9kIGJ1aWxkTG9jYWxWaWRlbyBMb2FkIGEgdmlkZW8gZWxlbWVudCB1c2luZyBsb2NhbCBmaWxlcyBvciBzZXRzIG9mIGZpbGVzLlxuICAgICAqIEB0b2RvIGFic3RyYWN0IG91dCB0aGVzZSBmdW5jdGlvbnMsIG1heWJlIHRvIGEgc2VwYXJhdGUgY2xhc3M/XG4gICAgICogQHJldHVybnMge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBidWlsZExvY2FsVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiQnVpbGRpbmcgbG9jYWwgdmlkZW9cIik7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvRWwgJiYgdGhpcy52aWRlb0VsLmhhc0F0dHJpYnV0ZSgncGxheXNpbmxpbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnZpZGVvRWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zb3VyY2VzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIk5vIHNvdXJjZXMgZm9yIGxvY2FsIHZpZGVvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRmFsbGJhY2tOb1ZpZGVvKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9XZSBuZWVkIHRvIGdldCBzaXplIHdoZW4gYnJlYWtwb2ludHNcbiAgICAgICAgbGV0IHNyY1NldCA9IHRoaXMuc291cmNlcztcbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMgJiYgdGhpcy5icmVha3BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIlZpZGVvIGhhcyBicmVha3BvaW50c1wiKTtcbiAgICAgICAgICAgIHNyY1NldCA9IHRoaXMuZ2V0U291cmNlc0ZpbHRlcmVkQnlTaXplKHRoaXMuc291cmNlcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jaGVja0lmUGFzc2VkQnJlYWtwb2ludHMuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyY1NldCAmJiBzcmNTZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fdmlkZW8nKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnBvc3RlciA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHRoaXMucG9zdGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm11dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBzcmNTZXQuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gICAgICAgICAgICAgICAgaWYgKCdmaWxlVHlwZScgaW4gc3JjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkLnR5cGUgPSAndmlkZW8vJyArIHNyYy5maWxlVHlwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hpbGQuc3JjID0gc3JjLnVybDtcbiAgICAgICAgICAgICAgICBjaGlsZC5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnZpZGVvRWwgJiYgc2VsZi52aWRlb0VsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbD8uYXBwZW5kKGNoaWxkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZCh0aGlzLnZpZGVvRWwpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NhbnBsYXknLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VsZi52aWRlb0VsPy5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHRoaXMubXV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm11dGVWaWRlbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG11dGVWaWRlbygpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoJ211dGluZyB2aWRlbycpO1xuICAgICAgICBjb25zdCB2aWRlb1RvTXV0ZSA9IHRoaXMucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgaWYgKHZpZGVvVG9NdXRlKSB7XG4gICAgICAgICAgICB2aWRlb1RvTXV0ZS52b2x1bWUgPSAwO1xuICAgICAgICAgICAgdmlkZW9Ub011dGUubXV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNvdXJjZXNGaWx0ZXJlZEJ5U2l6ZShzb3VyY2VzKSB7XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMud2lkdGhTdG9yZSA9IHdXO1xuICAgICAgICBsZXQgc29ydGVkQnlTaXplID0geyAnbWF4JzogW10gfTtcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgIGlmICgoJ21heFdpZHRoJyBpbiBzb3VyY2UpICYmIHNvdXJjZS5tYXhXaWR0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHcgPSBzb3VyY2UubWF4V2lkdGgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBpZiAoc29ydGVkQnlTaXplICE9IHVuZGVmaW5lZCAmJiAhT2JqZWN0LmtleXMoc29ydGVkQnlTaXplKS5pbmNsdWRlcyh3KSkge1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRCeVNpemVbd10gPSBbc291cmNlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVt3XS5wdXNoKHNvdXJjZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoJ21heFdpZHRoJyBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzb3J0ZWRCeVNpemVbJ21heCddLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIoJ0JyZWFrcG9pbnRzIG5vdCBkZWZpbmVkIGF0IHNpemUgZmlsdGVyLiBTb21ldGhpbmdcXCdzIHdyb25nJywgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gc291cmNlcztcbiAgICAgICAgfVxuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUHJlc2VudCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB3V10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBicmVha3BvaW50c1dpdGhQcmVzZW50LmluZGV4T2Yod1cpO1xuICAgICAgICBjb25zb2xlLmxvZyhicmVha3BvaW50c1dpdGhQcmVzZW50KTtcbiAgICAgICAgaWYgKGN1cnJlbnRJbmRleCA9PSBicmVha3BvaW50c1dpdGhQcmVzZW50Lmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWRCeVNpemVbJ21heCddO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNvcnRlZEJ5U2l6ZVticmVha3BvaW50c1dpdGhQcmVzZW50W2N1cnJlbnRJbmRleCArIDFdLnRvU3RyaW5nKCldO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNoZWNrSWZQYXNzZWRCcmVha3BvaW50cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZHRoU3RvcmUgfHwgIXRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUGFzdCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB0aGlzLndpZHRoU3RvcmVdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQgPSBbLi4udGhpcy5icmVha3BvaW50cywgd1ddLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgY29uc3QgcGFzdEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUGFzdC5pbmRleE9mKHRoaXMud2lkdGhTdG9yZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQuaW5kZXhPZih3Vyk7XG4gICAgICAgIHRoaXMubG9nZ2VyKGBjb21wYXJpbmcgcGFzdCBicmVha3BvaW50IG9mICR7dGhpcy53aWR0aFN0b3JlfSB3aXRoIGN1cnJlbnQgb2YgJHt3V30uIEFyZSB3ZSBnb29kPyBUaGUgcGFzdCBvbmUgd2FzICR7cGFzdEluZGV4fSBhbmQgY3VycmVudGx5IGl0J3MgJHtjdXJyZW50SW5kZXh9YCk7XG4gICAgICAgIGlmIChwYXN0SW5kZXggIT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkTG9jYWxWaWRlbygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ1aWxkUG9zdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9zdGVyU2V0ICYmICF0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zdGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX3Bvc3RlcicpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICBpZiAodGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VMb2FkZXJFbCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5zcmMgPSB0aGlzLnBvc3RlcjtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZiAmJiBzZWxmLnBvc3RlckVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuc3JjID0gaW1hZ2VMb2FkZXJFbC5zcmM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zdGVyU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNyY3NldCA9IHRoaXMucG9zdGVyU2V0O1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zaXplcyA9IHRoaXMuc2l6ZSB8fCBcIjEwMHZ3XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnBvc3RlckVsKTtcbiAgICB9XG4gICAgYnVpbGRPdmVybGF5KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm92ZXJsYXlFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX292ZXJsYXknKTtcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG4gICAgfVxuICAgIGJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgYXV0b3BsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBsb29wKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2xvb3AnKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBtdXRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtdXRlZCcpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGF1dG9wbGF5KGlzQXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzQXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhdXRvcGxheScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBtdXRlZChpc011dGVkKSB7XG4gICAgICAgIGlmIChpc011dGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbXV0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgbG9vcChpc0xvb3ApIHtcbiAgICAgICAgaWYgKGlzTG9vcCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbG9vcCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1N0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzdGF0dXMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0dXNTdHJpbmcgPT0gJ3N0cmluZycgJiYgKHN0YXR1c1N0cmluZyA9PSBcImxvYWRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJmYWxsYmFja1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImxvYWRlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImJ1ZmZlcmluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhaWxlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcIndhaXRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJub25lXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBVcGRhdGVzIHN0YXR1cyBvbiB0aGUgYWN0dWFsIGVsZW1lbnQgYXMgd2VsbCBhcyB0aGUgcHJvcGVydHkgb2YgdGhlIGNsYXNzICovXG4gICAgc2V0IHN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsICdlcnJvcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXInKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXJTZXQoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXJzZXQnKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzcmMoKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXMoc3JjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3JjO1xuICAgIH1cbiAgICBzZXQgc3JjKHNyY1N0cmluZykge1xuICAgICAgICBpZiAoc3JjU3RyaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmNTdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmNTdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvc3RlciB1cmwgc3RyaW5nLCBhbmQgc2V0cyBsb2FkaW5nIHRoYXQgcG9zdGVyIGludG8gbW90aW9uXG4gICAgICovXG4gICAgc2V0IHBvc3Rlcihwb3N0ZXJTdHJpbmcpIHtcbiAgICAgICAgaWYgKHBvc3RlclN0cmluZykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3N0ZXInLCBwb3N0ZXJTdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFBvc3RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vXG4gICAgY29tcGlsZVNvdXJjZXMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNvdXJjZSBwcm92aWRlZCBmb3IgdmlkZW8gYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3JjID0gc3JjU3RyaW5nLnRyaW0oKTtcbiAgICAgICAgbGV0IHNyY3NUb1JldHVybiA9IFtdO1xuICAgICAgICBsZXQgc3JjU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgc2l6ZVN0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IGhhc011bHRpcGxlU3JjcyA9IGZhbHNlLCBoYXNTaXplcyA9IGZhbHNlO1xuICAgICAgICBpZiAoc3JjLmluZGV4T2YoJywnKSA+PSAwKSB7XG4gICAgICAgICAgICAvL0xvb2tzIGxpa2UgaHR0cHM6Ly9zb21ldGhpbmcgMzAwdywgaHR0cHM6Ly9zb21ldGhpbmcgaHR0cHM6Ly9hbm90aGVyIG9uZSwgZWxzZSBldGMgNTAwdyxcbiAgICAgICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coJ0hhcyBzaXplcyBzZXBhcmF0ZWQgYnkgY29tbWEnKTtcbiAgICAgICAgICAgIHNpemVTdHJpbmdzID0gc3JjU3RyaW5nLnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBpZiAoc2l6ZVN0cmluZ3MubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBzaXplU3RyaW5ncy5mb3JFYWNoKHNpemVTdHJpbmcgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGxpdFN0cmluZyA9IHNpemVTdHJpbmcudHJpbSgpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGxpdFN0cmluZy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHNpemVTdHJpbmcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNpemUgPSBwYXJzZUludChzcGxpdFN0cmluZ1tzcGxpdFN0cmluZy5sZW5ndGggLSAxXS5yZXBsYWNlKCd3JywgJycpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiRm91bmQgYSBzaXplOiBcIiArIHNpemUgKyAnIGZyb20gc3RyaW5nICcgKyBzaXplU3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwbGl0U3RyaW5nLmZvckVhY2goKHN0cmluZykgPT4geyBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc3RyaW5nLCBzaXplKSk7IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYXNTaXplcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyYy5pbmRleE9mKCcgJykgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZygnSGFzIG11bHRpcGxlIHNvdXJjZXMgc2VwYXJhdGVkIGJ5IHNwYWNlcycpO1xuICAgICAgICAgICAgaWYgKHNpemVTdHJpbmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcnJheSA9IHNyY1N0cmluZy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGFycmF5LmZvckVhY2goaXRlbSA9PiB7IHNyY1N0cmluZ3MucHVzaChpdGVtLnRyaW0oKSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JjU3RyaW5ncy5mb3JFYWNoKChzdHJpbmcpID0+IHsgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHN0cmluZykpOyB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhc1NpemVzICYmICFoYXNNdWx0aXBsZVNyY3MpIHtcbiAgICAgICAgICAgIC8vQnVpbGQgZnJvbSBzaW5nbGUgc291cmNlXG4gICAgICAgICAgICBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc3JjKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zb3VyY2VzID0gdGhpcy5jbGVhbnVwU291cmNlcyhzcmNzVG9SZXR1cm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGNvbmZsaWN0aW5nIHNvdXJjZXMgb2YgZGlmZmVyZW50IHR5cGVzIChjYW4gb25seSBoYXZlIG9uZSBvZiBlYWNoIHR5cGUpXG4gICAgICovXG4gICAgY2xlYW51cFNvdXJjZXMoc291cmNlcykge1xuICAgICAgICAvL1R5cGUgZmlyc3RcbiAgICAgICAgdGhpcy50eXBlID0gc291cmNlc1swXS50eXBlO1xuICAgICAgICA7XG4gICAgICAgIC8vUmV0dXJuIG9iamVjdCBpZiBvbmx5IG9uZS5cbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzICE9ICdvYmplY3QnIHx8IHNvdXJjZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAneW91dHViZScgfHwgdGhpcy50eXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzb3VyY2VzWzBdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdldCBzaXplc1xuICAgICAgICAgICAgICAgIGxldCBzaXplcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCdtYXhXaWR0aCcgaW4gc291cmNlKSB8fCB0eXBlb2Ygc291cmNlLm1heFdpZHRoICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaXplcy5pbmNsdWRlcyhzb3VyY2UubWF4V2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplcy5wdXNoKHNvdXJjZS5tYXhXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IHNpemVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlcy5maWx0ZXIoc3JjID0+IHsgcmV0dXJuIHNyYy50eXBlID09IHRoaXMudHlwZTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJlcGFyZVNpbmdsZVNvdXJjZSh1cmwsIHNpemUpIHtcbiAgICAgICAgY29uc3QgdXJsVHlwZSA9IHRoaXMuZ2V0U291cmNlVHlwZSh1cmwpO1xuICAgICAgICBsZXQgcmV0dXJuZXIgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHR5cGU6IHVybFR5cGUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh1cmxUeXBlID09ICd5b3V0dWJlJykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0U3RhcnRUaW1lKHVybCwgJ3lvdXR1YmUnKTtcbiAgICAgICAgICAgIGlmIChzdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lcixcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5nZXRZb3V0dWJlSWRGcm9tU291cmNlKHVybCksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVybFR5cGUgPT0gJ3ZpbWVvJykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0U3RhcnRUaW1lKHVybCwgJ3ZpbWVvJyk7XG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuZXIuc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuZ2V0VmltZW9JZEZyb21Tb3VyY2UodXJsKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZ0ID0gdGhpcy5nZXRGaWxlVHlwZSh1cmwpO1xuICAgICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5tYXhXaWR0aCA9IHNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5tYXhXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsIGZpbGVUeXBlOiBmdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpO1xuICAgIH1cbiAgICBnZXRGaWxlVHlwZSh1cmwpIHtcbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm1wNCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21wNCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLndlYm0nKSkge1xuICAgICAgICAgICAgcmV0dXJuICd3ZWJtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dtJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoYEhhbmRsaW5nIGVycm9yIGZvciAke3VybH1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0U291cmNlVHlwZSh1cmwpIHtcbiAgICAgICAgY29uc3QgeXRUZXN0ID0gbmV3IFJlZ0V4cCgvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KD86eW91dHVcXC5iZVxcL3woPzp3d3dcXC58bVxcLik/eW91dHViZVxcLmNvbVxcLyg/OndhdGNofHZ8ZW1iZWQpKD86XFwucGhwKT8oPzpcXD8uKnY9fFxcLykpKFthLXpBLVowLTlcXF8tXXs3LDE1fSkoPzpbXFw/Jl1bYS16QS1aMC05XFxfLV0rPVthLXpBLVowLTlcXF8tXSspKiQvKTtcbiAgICAgICAgY29uc3QgdmltZW9UZXN0ID0gbmV3IFJlZ0V4cCgvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oWzAtOWEtelxcLV9dKykvaSk7XG4gICAgICAgIGNvbnN0IHZpZGVvVGVzdCA9IG5ldyBSZWdFeHAoLy4qP1xcLy4qKHdlYm18bXA0fG9nZ3xvZ20pLio/L2kpO1xuICAgICAgICBpZiAoeXRUZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICd5b3V0dWJlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aW1lb1Rlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ZpbWVvJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aWRlb1Rlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2xvY2FsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFlvdXR1YmVJZEZyb21Tb3VyY2UodXJsKSB7XG4gICAgICAgIHZhciByZSA9IC9cXC9cXC8oPzp3d3dcXC4pP3lvdXR1KD86XFwuYmV8YmVcXC5jb20pXFwvKD86d2F0Y2hcXD92PXxlbWJlZFxcLyk/KFthLXowLTlfXFwtXSspL2k7XG4gICAgICAgIHZhciBtYXRjaGVzID0gcmUuZXhlYyh1cmwpO1xuICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzWzFdKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldFZpbWVvSWRGcm9tU291cmNlKHVybCkge1xuICAgICAgICB2YXIgcmUgPSAvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oW2EtejAtOV9cXC1dKykvaTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHVybCk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbG9nZ2VyIEEgZ3VhcmRlZCBjb25zb2xlIGxvZ2dlci5cbiAgICAgKiBAcGFyYW0gbXNnIHRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgKiBAcGFyYW0gYWx3YXlzIFdoZXRoZXIgdG8gYWx3YXlzIHNob3cgaWYgbm90IHZlcmJvc2VcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgbG9nZ2VyKG1zZywgYWx3YXlzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGFsd2F5cyAmJiB0aGlzLmRlYnVnLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVidWcuZW5hYmxlZCB8fCAhdGhpcy5kZWJ1Zy52ZXJib3NlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjNhZTdmN2NmMDg5OTQ1YjUyYWVjXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9