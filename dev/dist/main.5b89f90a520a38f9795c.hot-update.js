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
        //Check for overlay things.
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
    get status() {
        const statusString = this.getAttribute('status');
        if (typeof statusString == 'string' && (statusString == "loading" || statusString == "loaded" || statusString == "buffering" || statusString == "failed" || statusString == "waiting" || statusString == "none" || statusString == "error")) {
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
            this.sourcesReady = true;
        }
        return src;
    }
    set src(srcString) {
        if (srcString == null) {
            this.removeAttribute('src');
        }
        else {
            this.setAttribute('src', srcString);
            this.sourcesReady = true;
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
        if (src.indexOf(',')) {
            //Looks like https://something 300w, https://something https://another one, else etc 500w,
            this.debug && console.log('Has sizes separated by comma');
            hasSizes = true;
        }
        if (src.indexOf(' ')) {
            this.debug && console.log('Has multiple sources separated by spaces');
            hasMultipleSrcs = true;
        }
        if (!hasSizes && !hasMultipleSrcs) {
            //Build from single source
            srcsToReturn.push(this.prepareSingleSource(src));
        }
        this.sources = srcsToReturn;
        console.log(this.sources);
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
        return {
            url: url,
            type: 'error',
        };
    }
    getSourceType(url) {
        const ytTest = new RegExp(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/);
        const vimeoTest = new RegExp(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
        const videoTest = new RegExp(/\/\/(?:www\.)?.*?\/([0-9a-z\-_]+)\.(woff|mp4|ogg).*?/i);
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
/******/ 	__webpack_require__.h = () => ("68e8d6332ad451674f6c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi41Yjg5ZjkwYTUyMGEzOGY5Nzk1Yy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkpBQTZKLEtBQUs7QUFDbEs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQ3hQQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy92aWRlb0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVmlkZW9CYWNrZ3JvdW5kIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIG92ZXJsYXlFbDtcbiAgICBwb3N0ZXJFbDtcbiAgICB2aWRlb0VsO1xuICAgIG11dGVCdXR0b247XG4gICAgcGF1c2VCdXR0b247XG4gICAgc2l6ZTtcbiAgICBicmVha3BvaW50cztcbiAgICB3aWR0aFN0b3JlO1xuICAgIHNvdXJjZXNSZWFkeTtcbiAgICBzb3VyY2VzO1xuICAgIGRlYnVnO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmRlYnVnID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYnVnJykgIT0gbnVsbCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRGVidWdnaW5nIHZpZGVvLWJhY2tncm91bmQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwid2FpdGluZ1wiO1xuICAgICAgICB0aGlzLmJ1aWxkRE9NKCk7XG4gICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXModGhpcy5zcmMpO1xuICAgICAgICB0aGlzLmJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9XG4gICAgYnVpbGRET00oKSB7XG4gICAgICAgIHRoaXMuYnVpbGRPdmVybGF5KCk7XG4gICAgICAgIHRoaXMuYnVpbGRQb3N0ZXIoKTtcbiAgICAgICAgLy9DaGVjayBmb3Igb3ZlcmxheSB0aGluZ3MuXG4gICAgfVxuICAgIGJ1aWxkUG9zdGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucG9zdGVyU2V0ICYmICF0aGlzLnBvc3Rlcikge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucG9zdGVyRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX3Bvc3RlcicpO1xuICAgICAgICB0aGlzLnBvc3RlckVsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICBpZiAodGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VMb2FkZXJFbCA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2VMb2FkZXJFbC5zcmMgPSB0aGlzLnBvc3RlcjtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZiAmJiBzZWxmLnBvc3RlckVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuc3JjID0gaW1hZ2VMb2FkZXJFbC5zcmM7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucG9zdGVyU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RlckVsLnNyY3NldCA9IHRoaXMucG9zdGVyU2V0O1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zaXplcyA9IHRoaXMuc2l6ZSB8fCBcIjEwMHZ3XCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLnBvc3RlckVsKTtcbiAgICB9XG4gICAgYnVpbGRPdmVybGF5KCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm92ZXJsYXlFbC5jbGFzc0xpc3QuYWRkKCd2YmdfX292ZXJsYXknKTtcbiAgICAgICAgdGhpcy5hcHBlbmRDaGlsZCh0aGlzLm92ZXJsYXlFbCk7XG4gICAgfVxuICAgIGJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICBjb25zdCBzdGF0dXNTdHJpbmcgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3RhdHVzJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzU3RyaW5nID09ICdzdHJpbmcnICYmIChzdGF0dXNTdHJpbmcgPT0gXCJsb2FkaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcIm5vbmVcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJub25lXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIFVwZGF0ZXMgc3RhdHVzIG9uIHRoZSBhY3R1YWwgZWxlbWVudCBhcyB3ZWxsIGFzIHRoZSBwcm9wZXJ0eSBvZiB0aGUgY2xhc3MgKi9cbiAgICBzZXQgc3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlcigpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlclNldCgpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcnNldCcpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHNyYygpIHtcbiAgICAgICAgY29uc3Qgc3JjID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICBpZiAodHlwZW9mIHNyYyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdGhpcy5jb21waWxlU291cmNlcyhzcmMpO1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcmM7XG4gICAgfVxuICAgIHNldCBzcmMoc3JjU3RyaW5nKSB7XG4gICAgICAgIGlmIChzcmNTdHJpbmcgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3NyYycsIHNyY1N0cmluZyk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zdGVyIHVybCBzdHJpbmcsIGFuZCBzZXRzIGxvYWRpbmcgdGhhdCBwb3N0ZXIgaW50byBtb3Rpb25cbiAgICAgKi9cbiAgICBzZXQgcG9zdGVyKHBvc3RlclN0cmluZykge1xuICAgICAgICBpZiAocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHBvc3RlclN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9cbiAgICBjb21waWxlU291cmNlcyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc291cmNlIHByb3ZpZGVkIGZvciB2aWRlbyBiYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzcmMgPSBzcmNTdHJpbmcudHJpbSgpO1xuICAgICAgICBsZXQgc3Jjc1RvUmV0dXJuID0gW107XG4gICAgICAgIGxldCBzcmNTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBzaXplU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgZmlsZVR5cGVTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBoYXNNdWx0aXBsZVNyY3MgPSBmYWxzZSwgaGFzU2l6ZXMgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNyYy5pbmRleE9mKCcsJykpIHtcbiAgICAgICAgICAgIC8vTG9va3MgbGlrZSBodHRwczovL3NvbWV0aGluZyAzMDB3LCBodHRwczovL3NvbWV0aGluZyBodHRwczovL2Fub3RoZXIgb25lLCBlbHNlIGV0YyA1MDB3LFxuICAgICAgICAgICAgdGhpcy5kZWJ1ZyAmJiBjb25zb2xlLmxvZygnSGFzIHNpemVzIHNlcGFyYXRlZCBieSBjb21tYScpO1xuICAgICAgICAgICAgaGFzU2l6ZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignICcpKSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnICYmIGNvbnNvbGUubG9nKCdIYXMgbXVsdGlwbGUgc291cmNlcyBzZXBhcmF0ZWQgYnkgc3BhY2VzJyk7XG4gICAgICAgICAgICBoYXNNdWx0aXBsZVNyY3MgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzU2l6ZXMgJiYgIWhhc011bHRpcGxlU3Jjcykge1xuICAgICAgICAgICAgLy9CdWlsZCBmcm9tIHNpbmdsZSBzb3VyY2VcbiAgICAgICAgICAgIHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzcmMpKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNvdXJjZXMgPSBzcmNzVG9SZXR1cm47XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc291cmNlcyk7XG4gICAgfVxuICAgIHByZXBhcmVTaW5nbGVTb3VyY2UodXJsKSB7XG4gICAgICAgIGNvbnN0IHVybFR5cGUgPSB0aGlzLmdldFNvdXJjZVR5cGUodXJsKTtcbiAgICAgICAgbGV0IHJldHVybmVyID0ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiB1cmxUeXBlLFxuICAgICAgICB9O1xuICAgICAgICBpZiAodXJsVHlwZSA9PSAneW91dHViZScpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLnJldHVybmVyLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmdldFlvdXR1YmVJZEZyb21Tb3VyY2UodXJsKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXJsVHlwZSA9PSAndmltZW8nKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lcixcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5nZXRWaW1lb0lkRnJvbVNvdXJjZSh1cmwpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZnQgPSB0aGlzLmdldEZpbGVUeXBlKHVybCk7XG4gICAgICAgICAgICBpZiAoZnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lciwgZmlsZVR5cGU6IGZ0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTWFsZm9ybWVkU291cmNlKHVybCk7XG4gICAgfVxuICAgIGdldEZpbGVUeXBlKHVybCkge1xuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcubXA0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAnbXA0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcud2VibScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dlYm0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5vZ2cnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdvZ2cnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlTWFsZm9ybWVkU291cmNlKHVybCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRTb3VyY2VUeXBlKHVybCkge1xuICAgICAgICBjb25zdCB5dFRlc3QgPSBuZXcgUmVnRXhwKC9eKD86aHR0cHM/Oik/KD86XFwvXFwvKT8oPzp5b3V0dVxcLmJlXFwvfCg/Ond3d1xcLnxtXFwuKT95b3V0dWJlXFwuY29tXFwvKD86d2F0Y2h8dnxlbWJlZCkoPzpcXC5waHApPyg/OlxcPy4qdj18XFwvKSkoW2EtekEtWjAtOVxcXy1dezcsMTV9KSg/OltcXD8mXVthLXpBLVowLTlcXF8tXSs9W2EtekEtWjAtOVxcXy1dKykqJC8pO1xuICAgICAgICBjb25zdCB2aW1lb1Rlc3QgPSBuZXcgUmVnRXhwKC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbMC05YS16XFwtX10rKS9pKTtcbiAgICAgICAgY29uc3QgdmlkZW9UZXN0ID0gbmV3IFJlZ0V4cCgvXFwvXFwvKD86d3d3XFwuKT8uKj9cXC8oWzAtOWEtelxcLV9dKylcXC4od29mZnxtcDR8b2dnKS4qPy9pKTtcbiAgICAgICAgaWYgKHl0VGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAneW91dHViZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmltZW9UZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICd2aW1lbyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodmlkZW9UZXN0LnRlc3QodXJsKSkge1xuICAgICAgICAgICAgcmV0dXJuICdsb2NhbCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Vycm9yJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRZb3V0dWJlSWRGcm9tU291cmNlKHVybCkge1xuICAgICAgICB2YXIgcmUgPSAvXFwvXFwvKD86d3d3XFwuKT95b3V0dSg/OlxcLmJlfGJlXFwuY29tKVxcLyg/OndhdGNoXFw/dj18ZW1iZWRcXC8pPyhbYS16MC05X1xcLV0rKS9pO1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHJlLmV4ZWModXJsKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXRWaW1lb0lkRnJvbVNvdXJjZSh1cmwpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcL1xcLyg/Ond3d1xcLik/dmltZW8uY29tXFwvKFthLXowLTlfXFwtXSspL2k7XG4gICAgICAgIHZhciBtYXRjaGVzID0gcmUuZXhlYyh1cmwpO1xuICAgICAgICBpZiAobWF0Y2hlcyAmJiBtYXRjaGVzWzFdKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hlc1sxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjY4ZThkNjMzMmFkNDUxNjc0ZjZjXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9