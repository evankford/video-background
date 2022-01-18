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
        this.buildDOM();
        this.compileSources(this.src);
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
            srcSet = this.getSourcesFilteredBySize(this.sources);
            window.addEventListener('resize', this.buildLocalVideo.bind(this));
        }
        if (srcSet && srcSet.length) {
            this.videoEl = document.createElement('video');
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
                child.type = src.type;
                child.src = src.url;
                this.videoEl?.append(child);
            });
            this.append(this.videoEl);
        }
    }
    getSourcesFilteredBySize(sources) {
        const wW = window.innerWidth;
        this.widthStore;
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
        let fileTypeStrings = [];
        let hasMultipleSrcs = false, hasSizes = false;
        if (src.indexOf(',') >= 0) {
            //Looks like https://something 300w, https://something https://another one, else etc 500w,
            this.debug && console.log('Has sizes separated by comma');
            hasSizes = true;
        }
        if (src.indexOf(' ') >= 0) {
            this.debug && console.log('Has multiple sources separated by spaces');
            hasMultipleSrcs = true;
        }
        if (!hasSizes && !hasMultipleSrcs) {
            //Build from single source
            srcsToReturn.push(this.prepareSingleSource(src));
        }
        this.sources = this.cleanupSources(srcsToReturn);
        console.log(this.sources);
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
            this.type == firstSourceType;
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
    prepareSingleSource(url) {
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
        const videoTest = new RegExp(/.*?\/.*(woff|mp4|ogg).*?/i);
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
/******/ 	__webpack_require__.h = () => ("ad6807ddebddb32da6f5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43YjliMTlkZTI5NGI2OTY4OWFiOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLCtDQUErQyxxQ0FBcUM7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsSUFBSTtBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SkFBNkosS0FBSztBQUNsSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDM1lBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3ZpZGVvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBWaWRlb0JhY2tncm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgb3ZlcmxheUVsO1xuICAgIHBvc3RlckVsO1xuICAgIHZpZGVvRWw7XG4gICAgbXV0ZUJ1dHRvbjtcbiAgICBwYXVzZUJ1dHRvbjtcbiAgICBzaXplO1xuICAgIHR5cGU7XG4gICAgYnJlYWtwb2ludHM7XG4gICAgd2lkdGhTdG9yZTtcbiAgICBzb3VyY2VzUmVhZHk7XG4gICAgc291cmNlcztcbiAgICBkZWJ1ZztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdkZWJ1ZycpICE9IG51bGwgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRlYnVnZ2luZyB2aWRlby1iYWNrZ3JvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcIndhaXRpbmdcIjtcbiAgICAgICAgdGhpcy5idWlsZERPTSgpO1xuICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHRoaXMuc3JjKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgfVxuICAgIGJ1aWxkRE9NKCkge1xuICAgICAgICB0aGlzLmJ1aWxkT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIHRoaXMuYnVpbGRWaWRlbygpO1xuICAgICAgICAvL0NoZWNrIGZvciBvdmVybGF5IHRoaW5ncy5cbiAgICB9XG4gICAgYnVpbGRWaWRlbygpIHtcbiAgICAgICAgLy9OZXZlciBzaG91bGQgaGF2ZSBtaXhlZCBzb3VyY2VzLlxuICAgICAgICBpZiAoIXRoaXMuc291cmNlc1JlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZyhcIkJ1aWxkaW5nIHZpZGVvIGJhc2VkIG9uIHR5cGU6IFwiICsgdGhpcy50eXBlKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkTG9jYWxWaWRlbygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhbmRsZVZpZGVvTm90UGxheWluZygpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZyhcIlZpZGVvIFdvbid0IHBsYXksIGRlZmF1bHRpbmcgdG8gZmFsbGJhY2tcIik7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJmYWxsYmFja1wiO1xuICAgIH1cbiAgICBidWlsZExvY2FsVmlkZW8oKSB7XG4gICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coXCJCdWlsZGluZyBsb2NhbCB2aWRlb1wiKTtcbiAgICAgICAgaWYgKCF0aGlzLnNvdXJjZXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coXCJObyBzb3VyY2VzIGZvciBsb2NhbCB2aWRlb1wiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVZpZGVvTm90UGxheWluZygpO1xuICAgICAgICB9XG4gICAgICAgIC8vV2UgbmVlZCB0byBnZXQgc2l6ZSB3aGVuIGJyZWFrcG9pbnRzXG4gICAgICAgIGxldCBzcmNTZXQgPSB0aGlzLnNvdXJjZXM7XG4gICAgICAgIGlmICh0aGlzLmJyZWFrcG9pbnRzICYmIHRoaXMuYnJlYWtwb2ludHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc3JjU2V0ID0gdGhpcy5nZXRTb3VyY2VzRmlsdGVyZWRCeVNpemUodGhpcy5zb3VyY2VzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmJ1aWxkTG9jYWxWaWRlby5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjU2V0ICYmIHNyY1NldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdwbGF5c2lubGluZScsICcnKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmF1dG9wbGF5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnbG9vcCcsICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm11dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzcmNTZXQuZm9yRWFjaChzcmMgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc291cmNlJyk7XG4gICAgICAgICAgICAgICAgY2hpbGQudHlwZSA9IHNyYy50eXBlO1xuICAgICAgICAgICAgICAgIGNoaWxkLnNyYyA9IHNyYy51cmw7XG4gICAgICAgICAgICAgICAgdGhpcy52aWRlb0VsPy5hcHBlbmQoY2hpbGQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFwcGVuZCh0aGlzLnZpZGVvRWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldFNvdXJjZXNGaWx0ZXJlZEJ5U2l6ZShzb3VyY2VzKSB7XG4gICAgICAgIGNvbnN0IHdXID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHRoaXMud2lkdGhTdG9yZTtcbiAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgfVxuICAgIGNoZWNrSWZQYXNzZWRCcmVha3BvaW50cygpIHtcbiAgICAgICAgaWYgKCF0aGlzLndpZHRoU3RvcmUgfHwgIXRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBsZXQgYnJlYWtwb2ludHNXaXRoUGFzdCA9IFsuLi50aGlzLmJyZWFrcG9pbnRzLCB0aGlzLndpZHRoU3RvcmVdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQgPSBbLi4udGhpcy5icmVha3BvaW50cywgd1ddLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgY29uc3QgcGFzdEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUGFzdC5pbmRleE9mKHRoaXMud2lkdGhTdG9yZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQuaW5kZXhPZih3Vyk7XG4gICAgICAgIGlmIChwYXN0SW5kZXggIT0gY3VycmVudEluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkTG9jYWxWaWRlbygpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ1aWxkUG9zdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9zdGVyU2V0ICYmICF0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zdGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX3Bvc3RlcicpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICBpZiAodGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VMb2FkZXJFbCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5zcmMgPSB0aGlzLnBvc3RlcjtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZiAmJiBzZWxmLnBvc3RlckVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuc3JjID0gaW1hZ2VMb2FkZXJFbC5zcmM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zdGVyU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNyY3NldCA9IHRoaXMucG9zdGVyU2V0O1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zaXplcyA9IHRoaXMuc2l6ZSB8fCBcIjEwMHZ3XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnBvc3RlckVsKTtcbiAgICB9XG4gICAgYnVpbGRPdmVybGF5KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm92ZXJsYXlFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX292ZXJsYXknKTtcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG4gICAgfVxuICAgIGJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgYXV0b3BsYXkoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBsb29wKCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2xvb3AnKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGdldCBtdXRlZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdtdXRlZCcpICE9ICdmYWxzZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IGF1dG9wbGF5KGlzQXV0b3BsYXkpIHtcbiAgICAgICAgaWYgKGlzQXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdhdXRvcGxheScsICcnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhdXRvcGxheScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBtdXRlZChpc011dGVkKSB7XG4gICAgICAgIGlmIChpc011dGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnbXV0ZWQnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbXV0ZWQnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgbG9vcChpc0xvb3ApIHtcbiAgICAgICAgaWYgKGlzTG9vcCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnbG9vcCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1N0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzdGF0dXMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0dXNTdHJpbmcgPT0gJ3N0cmluZycgJiYgKHN0YXR1c1N0cmluZyA9PSBcImxvYWRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJmYWxsYmFja1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImxvYWRlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImJ1ZmZlcmluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhaWxlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcIndhaXRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJub25lXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBVcGRhdGVzIHN0YXR1cyBvbiB0aGUgYWN0dWFsIGVsZW1lbnQgYXMgd2VsbCBhcyB0aGUgcHJvcGVydHkgb2YgdGhlIGNsYXNzICovXG4gICAgc2V0IHN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsICdlcnJvcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXInKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXJTZXQoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXJzZXQnKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzcmMoKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXMoc3JjKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3JjO1xuICAgIH1cbiAgICBzZXQgc3JjKHNyY1N0cmluZykge1xuICAgICAgICBpZiAoc3JjU3RyaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzcmMnLCBzcmNTdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmNTdHJpbmcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBvc3RlciB1cmwgc3RyaW5nLCBhbmQgc2V0cyBsb2FkaW5nIHRoYXQgcG9zdGVyIGludG8gbW90aW9uXG4gICAgICovXG4gICAgc2V0IHBvc3Rlcihwb3N0ZXJTdHJpbmcpIHtcbiAgICAgICAgaWYgKHBvc3RlclN0cmluZykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdwb3N0ZXInLCBwb3N0ZXJTdHJpbmcpO1xuICAgICAgICAgICAgdGhpcy5idWlsZFBvc3RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vXG4gICAgY29tcGlsZVNvdXJjZXMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNvdXJjZSBwcm92aWRlZCBmb3IgdmlkZW8gYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3JjID0gc3JjU3RyaW5nLnRyaW0oKTtcbiAgICAgICAgbGV0IHNyY3NUb1JldHVybiA9IFtdO1xuICAgICAgICBsZXQgc3JjU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgc2l6ZVN0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IGZpbGVUeXBlU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgaGFzTXVsdGlwbGVTcmNzID0gZmFsc2UsIGhhc1NpemVzID0gZmFsc2U7XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignLCcpID49IDApIHtcbiAgICAgICAgICAgIC8vTG9va3MgbGlrZSBodHRwczovL3NvbWV0aGluZyAzMDB3LCBodHRwczovL3NvbWV0aGluZyBodHRwczovL2Fub3RoZXIgb25lLCBlbHNlIGV0YyA1MDB3LFxuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZygnSGFzIHNpemVzIHNlcGFyYXRlZCBieSBjb21tYScpO1xuICAgICAgICAgICAgaGFzU2l6ZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coJ0hhcyBtdWx0aXBsZSBzb3VyY2VzIHNlcGFyYXRlZCBieSBzcGFjZXMnKTtcbiAgICAgICAgICAgIGhhc011bHRpcGxlU3JjcyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNTaXplcyAmJiAhaGFzTXVsdGlwbGVTcmNzKSB7XG4gICAgICAgICAgICAvL0J1aWxkIGZyb20gc2luZ2xlIHNvdXJjZVxuICAgICAgICAgICAgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHNyYykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlcyA9IHRoaXMuY2xlYW51cFNvdXJjZXMoc3Jjc1RvUmV0dXJuKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zb3VyY2VzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjb25mbGljdGluZyBzb3VyY2VzIG9mIGRpZmZlcmVudCB0eXBlcyAoY2FuIG9ubHkgaGF2ZSBvbmUgb2YgZWFjaCB0eXBlKVxuICAgICAqL1xuICAgIGNsZWFudXBTb3VyY2VzKHNvdXJjZXMpIHtcbiAgICAgICAgLy9UeXBlIGZpcnN0XG4gICAgICAgIGNvbnN0IGZpcnN0U291cmNlVHlwZSA9IHNvdXJjZXNbMF0udHlwZTtcbiAgICAgICAgaWYgKGZpcnN0U291cmNlVHlwZSA9PSAneW91dHViZScgfHwgZmlyc3RTb3VyY2VUeXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9ICdlbWJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPT0gZmlyc3RTb3VyY2VUeXBlO1xuICAgICAgICB9XG4gICAgICAgIC8vUmV0dXJuIG9iamVjdCBpZiBvbmx5IG9uZS5cbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VzICE9ICdvYmplY3QnIHx8IHNvdXJjZXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiBzb3VyY2VzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGZpcnN0U291cmNlVHlwZSA9PSAneW91dHViZScgfHwgZmlyc3RTb3VyY2VUeXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtzb3VyY2VzWzBdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdldCBzaXplc1xuICAgICAgICAgICAgICAgIGxldCBzaXplcyA9IFtdO1xuICAgICAgICAgICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKCdtYXhXaWR0aCcgaW4gc291cmNlKSB8fCB0eXBlb2Ygc291cmNlLm1heFdpZHRoICE9ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzaXplcy5pbmNsdWRlcyhzb3VyY2UubWF4V2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplcy5wdXNoKHNvdXJjZS5tYXhXaWR0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icmVha3BvaW50cyA9IHNpemVzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc291cmNlcy5maWx0ZXIoc3JjID0+IHsgcmV0dXJuIHNyYy50eXBlID09IGZpcnN0U291cmNlVHlwZTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJlcGFyZVNpbmdsZVNvdXJjZSh1cmwpIHtcbiAgICAgICAgY29uc3QgdXJsVHlwZSA9IHRoaXMuZ2V0U291cmNlVHlwZSh1cmwpO1xuICAgICAgICBsZXQgcmV0dXJuZXIgPSB7XG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIHR5cGU6IHVybFR5cGUsXG4gICAgICAgIH07XG4gICAgICAgIGlmICh1cmxUeXBlID09ICd5b3V0dWJlJykge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4ucmV0dXJuZXIsXG4gICAgICAgICAgICAgICAgaWQ6IHRoaXMuZ2V0WW91dHViZUlkRnJvbVNvdXJjZSh1cmwpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh1cmxUeXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnJldHVybmVyLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmdldFZpbWVvSWRGcm9tU291cmNlKHVybClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBmdCA9IHRoaXMuZ2V0RmlsZVR5cGUodXJsKTtcbiAgICAgICAgICAgIGlmIChmdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IC4uLnJldHVybmVyLCBmaWxlVHlwZTogZnQgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVNYWxmb3JtZWRTb3VyY2UodXJsKTtcbiAgICB9XG4gICAgZ2V0RmlsZVR5cGUodXJsKSB7XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5tcDQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdtcDQnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy53ZWJtJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnd2VibSc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVybC5pbmNsdWRlcygnLm9nZycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ29nZyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBoYW5kbGVNYWxmb3JtZWRTb3VyY2UodXJsKSB7XG4gICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coYEhhbmRsaW5nIGVycm9yIGZvciAke3VybH1gKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogJ2Vycm9yJyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0U291cmNlVHlwZSh1cmwpIHtcbiAgICAgICAgY29uc3QgeXRUZXN0ID0gbmV3IFJlZ0V4cCgvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KD86eW91dHVcXC5iZVxcL3woPzp3d3dcXC58bVxcLik/eW91dHViZVxcLmNvbVxcLyg/OndhdGNofHZ8ZW1iZWQpKD86XFwucGhwKT8oPzpcXD8uKnY9fFxcLykpKFthLXpBLVowLTlcXF8tXXs3LDE1fSkoPzpbXFw/Jl1bYS16QS1aMC05XFxfLV0rPVthLXpBLVowLTlcXF8tXSspKiQvKTtcbiAgICAgICAgY29uc3QgdmltZW9UZXN0ID0gbmV3IFJlZ0V4cCgvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oWzAtOWEtelxcLV9dKykvaSk7XG4gICAgICAgIGNvbnN0IHZpZGVvVGVzdCA9IG5ldyBSZWdFeHAoLy4qP1xcLy4qKHdvZmZ8bXA0fG9nZykuKj8vaSk7XG4gICAgICAgIGlmICh5dFRlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3lvdXR1YmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpbWVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAndmltZW8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZGVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0WW91dHViZUlkRnJvbVNvdXJjZSh1cmwpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcL1xcLyg/Ond3d1xcLik/eW91dHUoPzpcXC5iZXxiZVxcLmNvbSlcXC8oPzp3YXRjaFxcP3Y9fGVtYmVkXFwvKT8oW2EtejAtOV9cXC1dKykvaTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHVybCk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0VmltZW9JZEZyb21Tb3VyY2UodXJsKSB7XG4gICAgICAgIHZhciByZSA9IC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbYS16MC05X1xcLV0rKS9pO1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHJlLmV4ZWModXJsKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJhZDY4MDdkZGViZGRiMzJkYTZmNVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==