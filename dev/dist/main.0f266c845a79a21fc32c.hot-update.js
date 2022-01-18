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
        this.debug = this.getAttribute('debug') != null ? true : false;
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
        this.debug && console.log("Building video based on type: " + this.type);
        if (this.type == 'local') {
            this.buildLocalVideo();
        }
    }
    handleVideoNotPlaying() {
        this.debug && console.log("Video Won't play, defaulting to fallback");
        this.status = "fallback";
    }
    buildLocalVideo() {
        this.debug && console.log("Building local video");
        if (!this.sources) {
            this.debug && console.log("No sources for local video");
            return this.handleVideoNotPlaying();
        }
        //We need to get size when breakpoints
        let srcSet = this.sources;
        if (this.breakpoints && this.breakpoints.length > 0) {
            this.debug && console.log("Video has breakpoints");
            srcSet = this.getSourcesFilteredBySize(this.sources);
            window.addEventListener('resize', this.buildLocalVideo.bind(this));
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
        this.debug && console.log('muting video');
        const videoToMute = this.querySelector('video');
        if (videoToMute) {
            videoToMute.volume = 0;
            videoToMute.muted = true;
        }
    }
    getSourcesFilteredBySize(sources) {
        const wW = window.innerWidth;
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
            console.log(sortedBySize);
        });
        if (!this.breakpoints) {
            this.debug && console.error('Breakpoints not defined at size filter. Something\'s wrong');
            return sources;
        }
        let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b);
        const currentIndex = breakpointsWithPresent.indexOf(wW);
        console.log(breakpointsWithPresent);
        this.widthStore = wW;
        return sources;
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
                        this.debug && console.log("Found a size: " + size + ' from string ' + sizeString);
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
            return { ...returner,
                id: this.getYoutubeIdFromSource(url),
            };
        }
        else if (urlType == 'vimeo') {
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
        this.debug && console.log(`Handling error for ${url}`);
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
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("277413cbcec144a791ff")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wZjI2NmM4NDVhNzlhMjFmYzMyYy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsNERBQTREO0FBQ3RIO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywrQkFBK0I7QUFDdkU7QUFDQSw2Q0FBNkMsc0RBQXNEO0FBQ25HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsK0NBQStDLHFDQUFxQztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxJQUFJO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZKQUE2SixLQUFLO0FBQ2xLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUNyZEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdmlkZW9CYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFZpZGVvQmFja2dyb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBvdmVybGF5RWw7XG4gICAgcG9zdGVyRWw7XG4gICAgdmlkZW9FbDtcbiAgICBtdXRlQnV0dG9uO1xuICAgIHBhdXNlQnV0dG9uO1xuICAgIHNpemU7XG4gICAgdHlwZTtcbiAgICBicmVha3BvaW50cztcbiAgICB3aWR0aFN0b3JlO1xuICAgIHNvdXJjZXNSZWFkeTtcbiAgICBzb3VyY2VzO1xuICAgIGRlYnVnO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlYnVnID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYnVnJykgIT0gbnVsbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnaW5nIHZpZGVvLWJhY2tncm91bmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwid2FpdGluZ1wiO1xuICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHRoaXMuc3JjKTtcbiAgICAgICAgdGhpcy5idWlsZERPTSgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9XG4gICAgYnVpbGRET00oKSB7XG4gICAgICAgIHRoaXMuYnVpbGRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuYnVpbGRQb3N0ZXIoKTtcbiAgICAgICAgdGhpcy5idWlsZFZpZGVvKCk7XG4gICAgICAgIC8vQ2hlY2sgZm9yIG92ZXJsYXkgdGhpbmdzLlxuICAgIH1cbiAgICBidWlsZFZpZGVvKCkge1xuICAgICAgICAvL05ldmVyIHNob3VsZCBoYXZlIG1peGVkIHNvdXJjZXMuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc291cmNlcyk7XG4gICAgICAgIGlmICghdGhpcy5zb3VyY2VzUmVhZHkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRlYnVnICYmIGNvbnNvbGUubG9nKFwiQnVpbGRpbmcgdmlkZW8gYmFzZWQgb24gdHlwZTogXCIgKyB0aGlzLnR5cGUpO1xuICAgICAgICBpZiAodGhpcy50eXBlID09ICdsb2NhbCcpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRMb2NhbFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFuZGxlVmlkZW9Ob3RQbGF5aW5nKCkge1xuICAgICAgICB0aGlzLmRlYnVnICYmIGNvbnNvbGUubG9nKFwiVmlkZW8gV29uJ3QgcGxheSwgZGVmYXVsdGluZyB0byBmYWxsYmFja1wiKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcImZhbGxiYWNrXCI7XG4gICAgfVxuICAgIGJ1aWxkTG9jYWxWaWRlbygpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZyhcIkJ1aWxkaW5nIGxvY2FsIHZpZGVvXCIpO1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlcykge1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZyhcIk5vIHNvdXJjZXMgZm9yIGxvY2FsIHZpZGVvXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVmlkZW9Ob3RQbGF5aW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9XZSBuZWVkIHRvIGdldCBzaXplIHdoZW4gYnJlYWtwb2ludHNcbiAgICAgICAgbGV0IHNyY1NldCA9IHRoaXMuc291cmNlcztcbiAgICAgICAgaWYgKHRoaXMuYnJlYWtwb2ludHMgJiYgdGhpcy5icmVha3BvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnICYmIGNvbnNvbGUubG9nKFwiVmlkZW8gaGFzIGJyZWFrcG9pbnRzXCIpO1xuICAgICAgICAgICAgc3JjU2V0ID0gdGhpcy5nZXRTb3VyY2VzRmlsdGVyZWRCeVNpemUodGhpcy5zb3VyY2VzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmJ1aWxkTG9jYWxWaWRlby5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjU2V0ICYmIHNyY1NldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuY2xhc3NMaXN0LmFkZCgndmJnX192aWRlbycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tdXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3JjU2V0LmZvckVhY2goc3JjID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuICAgICAgICAgICAgICAgIGlmICgnZmlsZVR5cGUnIGluIHNyYykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50eXBlID0gJ3ZpZGVvLycgKyBzcmMuZmlsZVR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoaWxkLnNyYyA9IHNyYy51cmw7XG4gICAgICAgICAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb0VsICYmIHNlbGYudmlkZW9FbC5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWw/LmFwcGVuZChjaGlsZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmQodGhpcy52aWRlb0VsKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudmlkZW9FbD8uY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm11dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tdXRlVmlkZW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtdXRlVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coJ211dGluZyB2aWRlbycpO1xuICAgICAgICBjb25zdCB2aWRlb1RvTXV0ZSA9IHRoaXMucXVlcnlTZWxlY3RvcigndmlkZW8nKTtcbiAgICAgICAgaWYgKHZpZGVvVG9NdXRlKSB7XG4gICAgICAgICAgICB2aWRlb1RvTXV0ZS52b2x1bWUgPSAwO1xuICAgICAgICAgICAgdmlkZW9Ub011dGUubXV0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNvdXJjZXNGaWx0ZXJlZEJ5U2l6ZShzb3VyY2VzKSB7XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBzb3J0ZWRCeVNpemUgPSB7ICdtYXgnOiBbXSB9O1xuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCgnbWF4V2lkdGgnIGluIHNvdXJjZSkgJiYgc291cmNlLm1heFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdyA9IHNvdXJjZS5tYXhXaWR0aC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGlmIChzb3J0ZWRCeVNpemUgIT0gdW5kZWZpbmVkICYmICFPYmplY3Qua2V5cyhzb3J0ZWRCeVNpemUpLmluY2x1ZGVzKHcpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVt3XSA9IFtzb3VyY2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkQnlTaXplW3ddLnB1c2goc291cmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgnbWF4V2lkdGgnIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNvcnRlZEJ5U2l6ZVsnbWF4J10ucHVzaChzb3VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS5sb2coc29ydGVkQnlTaXplKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmVycm9yKCdCcmVha3BvaW50cyBub3QgZGVmaW5lZCBhdCBzaXplIGZpbHRlci4gU29tZXRoaW5nXFwncyB3cm9uZycpO1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQgPSBbLi4udGhpcy5icmVha3BvaW50cywgd1ddLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5pbmRleE9mKHdXKTtcbiAgICAgICAgY29uc29sZS5sb2coYnJlYWtwb2ludHNXaXRoUHJlc2VudCk7XG4gICAgICAgIHRoaXMud2lkdGhTdG9yZSA9IHdXO1xuICAgICAgICByZXR1cm4gc291cmNlcztcbiAgICB9XG4gICAgY2hlY2tJZlBhc3NlZEJyZWFrcG9pbnRzKCkge1xuICAgICAgICBpZiAoIXRoaXMud2lkdGhTdG9yZSB8fCAhdGhpcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQYXN0ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHRoaXMud2lkdGhTdG9yZV0uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUHJlc2VudCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB3V10uc29ydCgoYSwgYikgPT4gYSAtIGIpO1xuICAgICAgICBjb25zdCBwYXN0SW5kZXggPSBicmVha3BvaW50c1dpdGhQYXN0LmluZGV4T2YodGhpcy53aWR0aFN0b3JlKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5pbmRleE9mKHdXKTtcbiAgICAgICAgaWYgKHBhc3RJbmRleCAhPSBjdXJyZW50SW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRMb2NhbFZpZGVvKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYnVpbGRQb3N0ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5wb3N0ZXJTZXQgJiYgIXRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wb3N0ZXJFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fcG9zdGVyJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgIGlmICh0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBjb25zdCBpbWFnZUxvYWRlckVsID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLnNyYyA9IHRoaXMucG9zdGVyO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmICYmIHNlbGYucG9zdGVyRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0ZXJFbC5zcmMgPSBpbWFnZUxvYWRlckVsLnNyYztcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wb3N0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wb3N0ZXJTZXQpIHtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc3Jjc2V0ID0gdGhpcy5wb3N0ZXJTZXQ7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNpemVzID0gdGhpcy5zaXplIHx8IFwiMTAwdndcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMucG9zdGVyRWwpO1xuICAgIH1cbiAgICBidWlsZE92ZXJsYXkoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRoaXMub3ZlcmxheUVsLmNsYXNzTGlzdC5hZGQoJ3ZiZ19fb3ZlcmxheScpO1xuICAgICAgICB0aGlzLmFwcGVuZENoaWxkKHRoaXMub3ZlcmxheUVsKTtcbiAgICB9XG4gICAgYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBhdXRvcGxheSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IGxvb3AoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbG9vcCcpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IG11dGVkKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ211dGVkJykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzZXQgYXV0b3BsYXkoaXNBdXRvcGxheSkge1xuICAgICAgICBpZiAoaXNBdXRvcGxheSkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IG11dGVkKGlzTXV0ZWQpIHtcbiAgICAgICAgaWYgKGlzTXV0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdtdXRlZCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdtdXRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBsb29wKGlzTG9vcCkge1xuICAgICAgICBpZiAoaXNMb29wKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdsb29wJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzU3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpO1xuICAgICAgICBpZiAodHlwZW9mIHN0YXR1c1N0cmluZyA9PSAnc3RyaW5nJyAmJiAoc3RhdHVzU3RyaW5nID09IFwibG9hZGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhbGxiYWNrXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcIm5vbmVcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJub25lXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIFVwZGF0ZXMgc3RhdHVzIG9uIHRoZSBhY3R1YWwgZWxlbWVudCBhcyB3ZWxsIGFzIHRoZSBwcm9wZXJ0eSBvZiB0aGUgY2xhc3MgKi9cbiAgICBzZXQgc3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlcigpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlclNldCgpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcnNldCcpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHNyYygpIHtcbiAgICAgICAgY29uc3Qgc3JjID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICBpZiAodHlwZW9mIHNyYyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuICAgIHNldCBzcmMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyY1N0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zdGVyIHVybCBzdHJpbmcsIGFuZCBzZXRzIGxvYWRpbmcgdGhhdCBwb3N0ZXIgaW50byBtb3Rpb25cbiAgICAgKi9cbiAgICBzZXQgcG9zdGVyKHBvc3RlclN0cmluZykge1xuICAgICAgICBpZiAocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHBvc3RlclN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9cbiAgICBjb21waWxlU291cmNlcyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc291cmNlIHByb3ZpZGVkIGZvciB2aWRlbyBiYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcmMgPSBzcmNTdHJpbmcudHJpbSgpO1xuICAgICAgICBsZXQgc3Jjc1RvUmV0dXJuID0gW107XG4gICAgICAgIGxldCBzcmNTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBzaXplU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgaGFzTXVsdGlwbGVTcmNzID0gZmFsc2UsIGhhc1NpemVzID0gZmFsc2U7XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignLCcpID49IDApIHtcbiAgICAgICAgICAgIC8vTG9va3MgbGlrZSBodHRwczovL3NvbWV0aGluZyAzMDB3LCBodHRwczovL3NvbWV0aGluZyBodHRwczovL2Fub3RoZXIgb25lLCBlbHNlIGV0YyA1MDB3LFxuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZygnSGFzIHNpemVzIHNlcGFyYXRlZCBieSBjb21tYScpO1xuICAgICAgICAgICAgc2l6ZVN0cmluZ3MgPSBzcmNTdHJpbmcuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIGlmIChzaXplU3RyaW5ncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIHNpemVTdHJpbmdzLmZvckVhY2goc2l6ZVN0cmluZyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwbGl0U3RyaW5nID0gc2l6ZVN0cmluZy50cmltKCkuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwbGl0U3RyaW5nLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNzVG9SZXR1cm4ucHVzaCh0aGlzLnByZXBhcmVTaW5nbGVTb3VyY2Uoc2l6ZVN0cmluZykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2l6ZSA9IHBhcnNlSW50KHNwbGl0U3RyaW5nW3NwbGl0U3RyaW5nLmxlbmd0aCAtIDFdLnJlcGxhY2UoJ3cnLCAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZyhcIkZvdW5kIGEgc2l6ZTogXCIgKyBzaXplICsgJyBmcm9tIHN0cmluZyAnICsgc2l6ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxpdFN0cmluZy5mb3JFYWNoKChzdHJpbmcpID0+IHsgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHN0cmluZywgc2l6ZSkpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFzU2l6ZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coJ0hhcyBtdWx0aXBsZSBzb3VyY2VzIHNlcGFyYXRlZCBieSBzcGFjZXMnKTtcbiAgICAgICAgICAgIGlmIChzaXplU3RyaW5ncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBzcmNTdHJpbmcuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBhcnJheS5mb3JFYWNoKGl0ZW0gPT4geyBzcmNTdHJpbmdzLnB1c2goaXRlbS50cmltKCkpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNyY1N0cmluZ3MuZm9yRWFjaCgoc3RyaW5nKSA9PiB7IHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzdHJpbmcpKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNTaXplcyAmJiAhaGFzTXVsdGlwbGVTcmNzKSB7XG4gICAgICAgICAgICAvL0J1aWxkIGZyb20gc2luZ2xlIHNvdXJjZVxuICAgICAgICAgICAgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHNyYykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlcyA9IHRoaXMuY2xlYW51cFNvdXJjZXMoc3Jjc1RvUmV0dXJuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjb25mbGljdGluZyBzb3VyY2VzIG9mIGRpZmZlcmVudCB0eXBlcyAoY2FuIG9ubHkgaGF2ZSBvbmUgb2YgZWFjaCB0eXBlKVxuICAgICAqL1xuICAgIGNsZWFudXBTb3VyY2VzKHNvdXJjZXMpIHtcbiAgICAgICAgLy9UeXBlIGZpcnN0XG4gICAgICAgIGNvbnN0IGZpcnN0U291cmNlVHlwZSA9IHNvdXJjZXNbMF0udHlwZTtcbiAgICAgICAgaWYgKGZpcnN0U291cmNlVHlwZSA9PSAneW91dHViZScgfHwgZmlyc3RTb3VyY2VUeXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9ICdlbWJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBmaXJzdFNvdXJjZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgLy9SZXR1cm4gb2JqZWN0IGlmIG9ubHkgb25lLlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXMgIT0gJ29iamVjdCcgfHwgc291cmNlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RTb3VyY2VUeXBlID09ICd5b3V0dWJlJyB8fCBmaXJzdFNvdXJjZVR5cGUgPT0gJ3ZpbWVvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NvdXJjZXNbMF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHNpemVzXG4gICAgICAgICAgICAgICAgbGV0IHNpemVzID0gW107XG4gICAgICAgICAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoJ21heFdpZHRoJyBpbiBzb3VyY2UpIHx8IHR5cGVvZiBzb3VyY2UubWF4V2lkdGggIT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNpemVzLmluY2x1ZGVzKHNvdXJjZS5tYXhXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzLnB1c2goc291cmNlLm1heFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRzID0gc2l6ZXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2VzLmZpbHRlcihzcmMgPT4geyByZXR1cm4gc3JjLnR5cGUgPT0gZmlyc3RTb3VyY2VUeXBlOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcmVwYXJlU2luZ2xlU291cmNlKHVybCwgc2l6ZSkge1xuICAgICAgICBjb25zdCB1cmxUeXBlID0gdGhpcy5nZXRTb3VyY2VUeXBlKHVybCk7XG4gICAgICAgIGxldCByZXR1cm5lciA9IHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogdXJsVHlwZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHVybFR5cGUgPT0gJ3lvdXR1YmUnKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lcixcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5nZXRZb3V0dWJlSWRGcm9tU291cmNlKHVybCksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHVybFR5cGUgPT0gJ3ZpbWVvJykge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuZ2V0VmltZW9JZEZyb21Tb3VyY2UodXJsKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGZ0ID0gdGhpcy5nZXRGaWxlVHlwZSh1cmwpO1xuICAgICAgICAgICAgaWYgKHNpemUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5tYXhXaWR0aCA9IHNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5tYXhXaWR0aCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZ0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsIGZpbGVUeXBlOiBmdCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpO1xuICAgIH1cbiAgICBnZXRGaWxlVHlwZSh1cmwpIHtcbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm1wNCcpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21wNCc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLndlYm0nKSkge1xuICAgICAgICAgICAgcmV0dXJuICd3ZWJtJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dnJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcub2dtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnb2dtJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGhhbmRsZU1hbGZvcm1lZFNvdXJjZSh1cmwpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZyhgSGFuZGxpbmcgZXJyb3IgZm9yICR7dXJsfWApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRTb3VyY2VUeXBlKHVybCkge1xuICAgICAgICBjb25zdCB5dFRlc3QgPSBuZXcgUmVnRXhwKC9eKD86aHR0cHM/Oik/KD86XFwvXFwvKT8oPzp5b3V0dVxcLmJlXFwvfCg/Ond3d1xcLnxtXFwuKT95b3V0dWJlXFwuY29tXFwvKD86d2F0Y2h8dnxlbWJlZCkoPzpcXC5waHApPyg/OlxcPy4qdj18XFwvKSkoW2EtekEtWjAtOVxcXy1dezcsMTV9KSg/OltcXD8mXVthLXpBLVowLTlcXF8tXSs9W2EtekEtWjAtOVxcXy1dKykqJC8pO1xuICAgICAgICBjb25zdCB2aW1lb1Rlc3QgPSBuZXcgUmVnRXhwKC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbMC05YS16XFwtX10rKS9pKTtcbiAgICAgICAgY29uc3QgdmlkZW9UZXN0ID0gbmV3IFJlZ0V4cCgvLio/XFwvLiood2VibXxtcDR8b2dnfG9nbSkuKj8vaSk7XG4gICAgICAgIGlmICh5dFRlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3lvdXR1YmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpbWVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAndmltZW8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZGVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0WW91dHViZUlkRnJvbVNvdXJjZSh1cmwpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcL1xcLyg/Ond3d1xcLik/eW91dHUoPzpcXC5iZXxiZVxcLmNvbSlcXC8oPzp3YXRjaFxcP3Y9fGVtYmVkXFwvKT8oW2EtejAtOV9cXC1dKykvaTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHVybCk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0VmltZW9JZEZyb21Tb3VyY2UodXJsKSB7XG4gICAgICAgIHZhciByZSA9IC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbYS16MC05X1xcLV0rKS9pO1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHJlLmV4ZWModXJsKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIyNzc0MTNjYmNlYzE0NGE3OTFmZlwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==