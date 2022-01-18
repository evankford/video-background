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
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");

class VideoBackground extends HTMLElement {
    overlayEl;
    posterEl;
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
        this.buildVideo();
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
    }
    handleVideoNotPlaying() {
        this.logger("Video Won't play, defaulting to fallback");
        this.status = "fallback";
    }
    buildLocalVideo() {
        this.logger("Building local video");
        if (this.videoEl && this.videoEl.hasAttribute('playsinline')) {
            this.removeChild(this.videoEl);
        }
        if (!this.sources) {
            this.logger("No sources for local video");
            return this.handleVideoNotPlaying();
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
        const firstSourceType = sources[0].type;
        if (firstSourceType == 'youtube' || firstSourceType == 'vimeo') {
            this.type = 'embed';
        }
        else {
            this.type = firstSourceType;
        }
        //Return object if only one.
        if (typeof sources != 'object' || sources.length <= 1) {
            this.sourcesReady = true;
            return sources;
        }
        else {
            if (firstSourceType == 'youtube' || firstSourceType == 'vimeo') {
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
                return sources.filter(src => { return src.type == firstSourceType; });
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
            const startTime = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getStartTime)(url, 'youtube');
            if (startTime) {
                returner.startTime = startTime;
            }
            return { ...returner,
                id: this.getYoutubeIdFromSource(url),
            };
        }
        else if (urlType == 'vimeo') {
            const startTime = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getStartTime)(url, 'vimeo');
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
/******/ 	__webpack_require__.h = () => ("ad65932bc1f6af3af92f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43N2FiYmY1MzllNWNmMTM5MGE4Ny5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQTZDO0FBQ3RDO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxpQkFBaUIsa0JBQWtCLEdBQUcsa0NBQWtDLFdBQVcscUJBQXFCLGFBQWE7QUFDeks7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBELDREQUE0RDtBQUN0SDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsK0JBQStCO0FBQ3ZFO0FBQ0EsNkNBQTZDLHNEQUFzRDtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLCtDQUErQyxxQ0FBcUM7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsMERBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxJQUFJO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZKQUE2SixLQUFLO0FBQ2xLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUNsZ0JBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3ZpZGVvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFN0YXJ0VGltZSB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuZXhwb3J0IGNsYXNzIFZpZGVvQmFja2dyb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBvdmVybGF5RWw7XG4gICAgcG9zdGVyRWw7XG4gICAgdmlkZW9FbDtcbiAgICBtdXRlQnV0dG9uO1xuICAgIHBhdXNlQnV0dG9uO1xuICAgIHNpemU7XG4gICAgdHlwZTtcbiAgICBicmVha3BvaW50cztcbiAgICB3aWR0aFN0b3JlO1xuICAgIHNvdXJjZXNSZWFkeTtcbiAgICBzb3VyY2VzO1xuICAgIGRlYnVnO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYnVnJykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGVidWcnKSA9PSBcInZlcmJvc2VcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IHRydWUsIHZlcmJvc2U6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IHRydWUsIHZlcmJvc2U6IGZhbHNlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnID0geyBlbmFibGVkOiBmYWxzZSwgdmVyYm9zZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWJ1Z2dpbmcgdmlkZW8tYmFja2dyb3VuZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJ3YWl0aW5nXCI7XG4gICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXModGhpcy5zcmMpO1xuICAgICAgICB0aGlzLmJ1aWxkRE9NKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgIH1cbiAgICBidWlsZERPTSgpIHtcbiAgICAgICAgdGhpcy5idWlsZE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5idWlsZFBvc3RlcigpO1xuICAgICAgICB0aGlzLmJ1aWxkVmlkZW8oKTtcbiAgICAgICAgLy9DaGVjayBmb3Igb3ZlcmxheSB0aGluZ3MuXG4gICAgfVxuICAgIGJ1aWxkVmlkZW8oKSB7XG4gICAgICAgIC8vTmV2ZXIgc2hvdWxkIGhhdmUgbWl4ZWQgc291cmNlcy5cbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zb3VyY2VzKTtcbiAgICAgICAgaWYgKCF0aGlzLnNvdXJjZXNSZWFkeSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiQnVpbGRpbmcgdmlkZW8gYmFzZWQgb24gdHlwZTogXCIgKyB0aGlzLnR5cGUpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdsb2NhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRMb2NhbFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVmlkZW9Ob3RQbGF5aW5nKCkge1xuICAgICAgICB0aGlzLmxvZ2dlcihcIlZpZGVvIFdvbid0IHBsYXksIGRlZmF1bHRpbmcgdG8gZmFsbGJhY2tcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJmYWxsYmFja1wiO1xuICAgIH1cbiAgICBidWlsZExvY2FsVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiQnVpbGRpbmcgbG9jYWwgdmlkZW9cIik7XG4gICAgICAgIGlmICh0aGlzLnZpZGVvRWwgJiYgdGhpcy52aWRlb0VsLmhhc0F0dHJpYnV0ZSgncGxheXNpbmxpbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDaGlsZCh0aGlzLnZpZGVvRWwpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zb3VyY2VzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIk5vIHNvdXJjZXMgZm9yIGxvY2FsIHZpZGVvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVmlkZW9Ob3RQbGF5aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9XZSBuZWVkIHRvIGdldCBzaXplIHdoZW4gYnJlYWtwb2ludHNcbiAgICAgICAgbGV0IHNyY1NldCA9IHRoaXMuc291cmNlcztcbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMgJiYgdGhpcy5icmVha3BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcihcIlZpZGVvIGhhcyBicmVha3BvaW50c1wiKTtcbiAgICAgICAgICAgIHNyY1NldCA9IHRoaXMuZ2V0U291cmNlc0ZpbHRlcmVkQnlTaXplKHRoaXMuc291cmNlcyk7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jaGVja0lmUGFzc2VkQnJlYWtwb2ludHMuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyY1NldCAmJiBzcmNTZXQubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fdmlkZW8nKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ3BsYXlzaW5saW5lJywgJycpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmxvb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubXV0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIHNyY1NldC5mb3JFYWNoKHNyYyA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzb3VyY2UnKTtcbiAgICAgICAgICAgICAgICBpZiAoJ2ZpbGVUeXBlJyBpbiBzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGQudHlwZSA9ICd2aWRlby8nICsgc3JjLmZpbGVUeXBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGlsZC5zcmMgPSBzcmMudXJsO1xuICAgICAgICAgICAgICAgIGNoaWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYudmlkZW9FbCAmJiBzZWxmLnZpZGVvRWwuY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsPy5hcHBlbmQoY2hpbGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuYXBwZW5kKHRoaXMudmlkZW9FbCk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxmLnZpZGVvRWw/LmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodGhpcy5tdXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubXV0ZVZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbXV0ZVZpZGVvKCkge1xuICAgICAgICB0aGlzLmxvZ2dlcignbXV0aW5nIHZpZGVvJyk7XG4gICAgICAgIGNvbnN0IHZpZGVvVG9NdXRlID0gdGhpcy5xdWVyeVNlbGVjdG9yKCd2aWRlbycpO1xuICAgICAgICBpZiAodmlkZW9Ub011dGUpIHtcbiAgICAgICAgICAgIHZpZGVvVG9NdXRlLnZvbHVtZSA9IDA7XG4gICAgICAgICAgICB2aWRlb1RvTXV0ZS5tdXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0U291cmNlc0ZpbHRlcmVkQnlTaXplKHNvdXJjZXMpIHtcbiAgICAgICAgY29uc3Qgd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdGhpcy53aWR0aFN0b3JlID0gd1c7XG4gICAgICAgIGxldCBzb3J0ZWRCeVNpemUgPSB7ICdtYXgnOiBbXSB9O1xuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCgnbWF4V2lkdGgnIGluIHNvdXJjZSkgJiYgc291cmNlLm1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdyA9IHNvdXJjZS5tYXhXaWR0aC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChzb3J0ZWRCeVNpemUgIT0gdW5kZWZpbmVkICYmICFPYmplY3Qua2V5cyhzb3J0ZWRCeVNpemUpLmluY2x1ZGVzKHcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVt3XSA9IFtzb3VyY2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkQnlTaXplW3ddLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgnbWF4V2lkdGgnIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVsnbWF4J10ucHVzaChzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlcignQnJlYWtwb2ludHMgbm90IGRlZmluZWQgYXQgc2l6ZSBmaWx0ZXIuIFNvbWV0aGluZ1xcJ3Mgd3JvbmcnLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xuICAgICAgICB9XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQcmVzZW50ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHdXXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQuaW5kZXhPZih3Vyk7XG4gICAgICAgIGNvbnNvbGUubG9nKGJyZWFrcG9pbnRzV2l0aFByZXNlbnQpO1xuICAgICAgICBpZiAoY3VycmVudEluZGV4ID09IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHNvcnRlZEJ5U2l6ZVsnbWF4J107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc29ydGVkQnlTaXplW2JyZWFrcG9pbnRzV2l0aFByZXNlbnRbY3VycmVudEluZGV4ICsgMV0udG9TdHJpbmcoKV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hlY2tJZlBhc3NlZEJyZWFrcG9pbnRzKCkge1xuICAgICAgICBpZiAoIXRoaXMud2lkdGhTdG9yZSB8fCAhdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQYXN0ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHRoaXMud2lkdGhTdG9yZV0uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUHJlc2VudCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB3V10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBjb25zdCBwYXN0SW5kZXggPSBicmVha3BvaW50c1dpdGhQYXN0LmluZGV4T2YodGhpcy53aWR0aFN0b3JlKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5pbmRleE9mKHdXKTtcbiAgICAgICAgdGhpcy5sb2dnZXIoYGNvbXBhcmluZyBwYXN0IGJyZWFrcG9pbnQgb2YgJHt0aGlzLndpZHRoU3RvcmV9IHdpdGggY3VycmVudCBvZiAke3dXfS4gQXJlIHdlIGdvb2Q/IFRoZSBwYXN0IG9uZSB3YXMgJHtwYXN0SW5kZXh9IGFuZCBjdXJyZW50bHkgaXQncyAke2N1cnJlbnRJbmRleH1gKTtcbiAgICAgICAgaWYgKHBhc3RJbmRleCAhPSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRMb2NhbFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYnVpbGRQb3N0ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5wb3N0ZXJTZXQgJiYgIXRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3N0ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fcG9zdGVyJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgIGlmICh0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUxvYWRlckVsID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLnNyYyA9IHRoaXMucG9zdGVyO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmICYmIHNlbGYucG9zdGVyRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0ZXJFbC5zcmMgPSBpbWFnZUxvYWRlckVsLnNyYztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wb3N0ZXJTZXQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc3Jjc2V0ID0gdGhpcy5wb3N0ZXJTZXQ7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNpemVzID0gdGhpcy5zaXplIHx8IFwiMTAwdndcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMucG9zdGVyRWwpO1xuICAgIH1cbiAgICBidWlsZE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fb3ZlcmxheScpO1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICB9XG4gICAgYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBhdXRvcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IGxvb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbG9vcCcpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IG11dGVkKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ211dGVkJykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXQgYXV0b3BsYXkoaXNBdXRvcGxheSkge1xuICAgICAgICBpZiAoaXNBdXRvcGxheSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IG11dGVkKGlzTXV0ZWQpIHtcbiAgICAgICAgaWYgKGlzTXV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBsb29wKGlzTG9vcCkge1xuICAgICAgICBpZiAoaXNMb29wKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdsb29wJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzU3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpO1xuICAgICAgICBpZiAodHlwZW9mIHN0YXR1c1N0cmluZyA9PSAnc3RyaW5nJyAmJiAoc3RhdHVzU3RyaW5nID09IFwibG9hZGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhbGxiYWNrXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcIm5vbmVcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJub25lXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIFVwZGF0ZXMgc3RhdHVzIG9uIHRoZSBhY3R1YWwgZWxlbWVudCBhcyB3ZWxsIGFzIHRoZSBwcm9wZXJ0eSBvZiB0aGUgY2xhc3MgKi9cbiAgICBzZXQgc3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlcigpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlclNldCgpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcnNldCcpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHNyYygpIHtcbiAgICAgICAgY29uc3Qgc3JjID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICBpZiAodHlwZW9mIHNyYyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuICAgIHNldCBzcmMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyY1N0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zdGVyIHVybCBzdHJpbmcsIGFuZCBzZXRzIGxvYWRpbmcgdGhhdCBwb3N0ZXIgaW50byBtb3Rpb25cbiAgICAgKi9cbiAgICBzZXQgcG9zdGVyKHBvc3RlclN0cmluZykge1xuICAgICAgICBpZiAocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHBvc3RlclN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9cbiAgICBjb21waWxlU291cmNlcyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc291cmNlIHByb3ZpZGVkIGZvciB2aWRlbyBiYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcmMgPSBzcmNTdHJpbmcudHJpbSgpO1xuICAgICAgICBsZXQgc3Jjc1RvUmV0dXJuID0gW107XG4gICAgICAgIGxldCBzcmNTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBzaXplU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgaGFzTXVsdGlwbGVTcmNzID0gZmFsc2UsIGhhc1NpemVzID0gZmFsc2U7XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignLCcpID49IDApIHtcbiAgICAgICAgICAgIC8vTG9va3MgbGlrZSBodHRwczovL3NvbWV0aGluZyAzMDB3LCBodHRwczovL3NvbWV0aGluZyBodHRwczovL2Fub3RoZXIgb25lLCBlbHNlIGV0YyA1MDB3LFxuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZygnSGFzIHNpemVzIHNlcGFyYXRlZCBieSBjb21tYScpO1xuICAgICAgICAgICAgc2l6ZVN0cmluZ3MgPSBzcmNTdHJpbmcuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGlmIChzaXplU3RyaW5ncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIHNpemVTdHJpbmdzLmZvckVhY2goc2l6ZVN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0U3RyaW5nID0gc2l6ZVN0cmluZy50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0U3RyaW5nLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc2l6ZVN0cmluZykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHNwbGl0U3RyaW5nW3NwbGl0U3RyaW5nLmxlbmd0aCAtIDFdLnJlcGxhY2UoJ3cnLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dnZXIoXCJGb3VuZCBhIHNpemU6IFwiICsgc2l6ZSArICcgZnJvbSBzdHJpbmcgJyArIHNpemVTdHJpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BsaXRTdHJpbmcuZm9yRWFjaCgoc3RyaW5nKSA9PiB7IHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzdHJpbmcsIHNpemUpKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhc1NpemVzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjLmluZGV4T2YoJyAnKSA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnICYmIGNvbnNvbGUubG9nKCdIYXMgbXVsdGlwbGUgc291cmNlcyBzZXBhcmF0ZWQgYnkgc3BhY2VzJyk7XG4gICAgICAgICAgICBpZiAoc2l6ZVN0cmluZ3MubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFycmF5ID0gc3JjU3RyaW5nLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChpdGVtID0+IHsgc3JjU3RyaW5ncy5wdXNoKGl0ZW0udHJpbSgpKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcmNTdHJpbmdzLmZvckVhY2goKHN0cmluZykgPT4geyBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc3RyaW5nKSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzU2l6ZXMgJiYgIWhhc011bHRpcGxlU3Jjcykge1xuICAgICAgICAgICAgLy9CdWlsZCBmcm9tIHNpbmdsZSBzb3VyY2VcbiAgICAgICAgICAgIHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzcmMpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZXMgPSB0aGlzLmNsZWFudXBTb3VyY2VzKHNyY3NUb1JldHVybik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgY29uZmxpY3Rpbmcgc291cmNlcyBvZiBkaWZmZXJlbnQgdHlwZXMgKGNhbiBvbmx5IGhhdmUgb25lIG9mIGVhY2ggdHlwZSlcbiAgICAgKi9cbiAgICBjbGVhbnVwU291cmNlcyhzb3VyY2VzKSB7XG4gICAgICAgIC8vVHlwZSBmaXJzdFxuICAgICAgICBjb25zdCBmaXJzdFNvdXJjZVR5cGUgPSBzb3VyY2VzWzBdLnR5cGU7XG4gICAgICAgIGlmIChmaXJzdFNvdXJjZVR5cGUgPT0gJ3lvdXR1YmUnIHx8IGZpcnN0U291cmNlVHlwZSA9PSAndmltZW8nKSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSAnZW1iZWQnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50eXBlID0gZmlyc3RTb3VyY2VUeXBlO1xuICAgICAgICB9XG4gICAgICAgIC8vUmV0dXJuIG9iamVjdCBpZiBvbmx5IG9uZS5cbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzICE9ICdvYmplY3QnIHx8IHNvdXJjZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpcnN0U291cmNlVHlwZSA9PSAneW91dHViZScgfHwgZmlyc3RTb3VyY2VUeXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzb3VyY2VzWzBdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdldCBzaXplc1xuICAgICAgICAgICAgICAgIGxldCBzaXplcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCdtYXhXaWR0aCcgaW4gc291cmNlKSB8fCB0eXBlb2Ygc291cmNlLm1heFdpZHRoICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaXplcy5pbmNsdWRlcyhzb3VyY2UubWF4V2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplcy5wdXNoKHNvdXJjZS5tYXhXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IHNpemVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlcy5maWx0ZXIoc3JjID0+IHsgcmV0dXJuIHNyYy50eXBlID09IGZpcnN0U291cmNlVHlwZTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJlcGFyZVNpbmdsZVNvdXJjZSh1cmwsIHNpemUpIHtcbiAgICAgICAgY29uc3QgdXJsVHlwZSA9IHRoaXMuZ2V0U291cmNlVHlwZSh1cmwpO1xuICAgICAgICBsZXQgcmV0dXJuZXIgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHR5cGU6IHVybFR5cGUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh1cmxUeXBlID09ICd5b3V0dWJlJykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0U3RhcnRUaW1lKHVybCwgJ3lvdXR1YmUnKTtcbiAgICAgICAgICAgIGlmIChzdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lcixcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5nZXRZb3V0dWJlSWRGcm9tU291cmNlKHVybCksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVybFR5cGUgPT0gJ3ZpbWVvJykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnRUaW1lID0gZ2V0U3RhcnRUaW1lKHVybCwgJ3ZpbWVvJyk7XG4gICAgICAgICAgICBpZiAoc3RhcnRUaW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuZXIuc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuZ2V0VmltZW9JZEZyb21Tb3VyY2UodXJsKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZ0ID0gdGhpcy5nZXRGaWxlVHlwZSh1cmwpO1xuICAgICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5tYXhXaWR0aCA9IHNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5tYXhXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsIGZpbGVUeXBlOiBmdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpO1xuICAgIH1cbiAgICBnZXRGaWxlVHlwZSh1cmwpIHtcbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm1wNCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21wNCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLndlYm0nKSkge1xuICAgICAgICAgICAgcmV0dXJuICd3ZWJtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dtJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoYEhhbmRsaW5nIGVycm9yIGZvciAke3VybH1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0U291cmNlVHlwZSh1cmwpIHtcbiAgICAgICAgY29uc3QgeXRUZXN0ID0gbmV3IFJlZ0V4cCgvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KD86eW91dHVcXC5iZVxcL3woPzp3d3dcXC58bVxcLik/eW91dHViZVxcLmNvbVxcLyg/OndhdGNofHZ8ZW1iZWQpKD86XFwucGhwKT8oPzpcXD8uKnY9fFxcLykpKFthLXpBLVowLTlcXF8tXXs3LDE1fSkoPzpbXFw/Jl1bYS16QS1aMC05XFxfLV0rPVthLXpBLVowLTlcXF8tXSspKiQvKTtcbiAgICAgICAgY29uc3QgdmltZW9UZXN0ID0gbmV3IFJlZ0V4cCgvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oWzAtOWEtelxcLV9dKykvaSk7XG4gICAgICAgIGNvbnN0IHZpZGVvVGVzdCA9IG5ldyBSZWdFeHAoLy4qP1xcLy4qKHdlYm18bXA0fG9nZ3xvZ20pLio/L2kpO1xuICAgICAgICBpZiAoeXRUZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICd5b3V0dWJlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aW1lb1Rlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ZpbWVvJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh2aWRlb1Rlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2xvY2FsJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnZXJyb3InO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFlvdXR1YmVJZEZyb21Tb3VyY2UodXJsKSB7XG4gICAgICAgIHZhciByZSA9IC9cXC9cXC8oPzp3d3dcXC4pP3lvdXR1KD86XFwuYmV8YmVcXC5jb20pXFwvKD86d2F0Y2hcXD92PXxlbWJlZFxcLyk/KFthLXowLTlfXFwtXSspL2k7XG4gICAgICAgIHZhciBtYXRjaGVzID0gcmUuZXhlYyh1cmwpO1xuICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzWzFdKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldFZpbWVvSWRGcm9tU291cmNlKHVybCkge1xuICAgICAgICB2YXIgcmUgPSAvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oW2EtejAtOV9cXC1dKykvaTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHVybCk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBtZXRob2QgbG9nZ2VyIEEgZ3VhcmRlZCBjb25zb2xlIGxvZ2dlci5cbiAgICAgKiBAcGFyYW0gbXNnIHRoZSBtZXNzYWdlIHRvIHNlbmRcbiAgICAgKiBAcGFyYW0gYWx3YXlzIFdoZXRoZXIgdG8gYWx3YXlzIHNob3cgaWYgbm90IHZlcmJvc2VcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgbG9nZ2VyKG1zZywgYWx3YXlzID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKGFsd2F5cyAmJiB0aGlzLmRlYnVnLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGVidWcuZW5hYmxlZCB8fCAhdGhpcy5kZWJ1Zy52ZXJib3NlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImFkNjU5MzJiYzFmNmFmM2FmOTJmXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9