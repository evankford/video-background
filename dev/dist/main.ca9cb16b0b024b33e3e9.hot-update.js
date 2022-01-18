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
    constructor() {
        super();
        this.sourcesReady = false;
        this.init();
    }
    init() {
        this.status = "waiting";
        this.buildDOM();
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
            this.compileSources(src.trim());
            this.sourcesReady = true;
        }
        return src;
    }
    set src(srcString) {
        if (srcString == null) {
            this.removeAttribute('src');
        }
        else {
            this.setAttribute('src', srcString.trim());
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
        let srcsToReturn = [];
        let srcStrings = [];
        let sizeStrings = [];
        let fileTypeStrings = [];
        let hasMultipleSrcs = false, hasSizes = false;
        if (srcString.indexOf(',')) {
            //Looks like https://something 300w, https://something https://another one, else etc 500w,
            hasSizes = true;
        }
        if (srcString.indexOf(' ')) {
            hasMultipleSrcs = true;
        }
        if (!hasSizes && !hasMultipleSrcs) {
            srcStrings.push(srcString);
        }
        this.sources = srcsToReturn;
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
    connectedCallback() {
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("62f8440e25134e63e5c5")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jYTljYjE2YjBiMDI0YjMzZTNlOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SkFBNkosS0FBSztBQUNsSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUNyTEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdmlkZW9CYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFZpZGVvQmFja2dyb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBvdmVybGF5RWw7XG4gICAgcG9zdGVyRWw7XG4gICAgdmlkZW9FbDtcbiAgICBtdXRlQnV0dG9uO1xuICAgIHBhdXNlQnV0dG9uO1xuICAgIHNpemU7XG4gICAgYnJlYWtwb2ludHM7XG4gICAgd2lkdGhTdG9yZTtcbiAgICBzb3VyY2VzUmVhZHk7XG4gICAgc291cmNlcztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJ3YWl0aW5nXCI7XG4gICAgICAgIHRoaXMuYnVpbGRET00oKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgfVxuICAgIGJ1aWxkRE9NKCkge1xuICAgICAgICB0aGlzLmJ1aWxkT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIC8vQ2hlY2sgZm9yIG92ZXJsYXkgdGhpbmdzLlxuICAgIH1cbiAgICBidWlsZFBvc3RlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvc3RlclNldCAmJiAhdGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3RlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnX19wb3N0ZXInKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgaWYgKHRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGltYWdlTG9hZGVyRWwgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuc3JjID0gdGhpcy5wb3N0ZXI7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYgJiYgc2VsZi5wb3N0ZXJFbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLnNyYyA9IGltYWdlTG9hZGVyRWwuc3JjO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc3RlclNldCkge1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zcmNzZXQgPSB0aGlzLnBvc3RlclNldDtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc2l6ZXMgPSB0aGlzLnNpemUgfHwgXCIxMDB2d1wiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5wb3N0ZXJFbCk7XG4gICAgfVxuICAgIGJ1aWxkT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuY2xhc3NMaXN0LmFkZCgndmJnX19vdmVybGF5Jyk7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgIH1cbiAgICBidWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzU3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpO1xuICAgICAgICBpZiAodHlwZW9mIHN0YXR1c1N0cmluZyA9PSAnc3RyaW5nJyAmJiAoc3RhdHVzU3RyaW5nID09IFwibG9hZGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImxvYWRlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImJ1ZmZlcmluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhaWxlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcIndhaXRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJub25lXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZXJyb3JcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgcmV0dXJuIFwibm9uZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKiBVcGRhdGVzIHN0YXR1cyBvbiB0aGUgYWN0dWFsIGVsZW1lbnQgYXMgd2VsbCBhcyB0aGUgcHJvcGVydHkgb2YgdGhlIGNsYXNzICovXG4gICAgc2V0IHN0YXR1cyhzdGF0dXMpIHtcbiAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vICAgY2FzZSAoXCJ3YWl0aW5nXCIgfHwgXCJsb2FkaW5nXCIpOlxuICAgICAgICAgICAgLy8gICBicmVhaztcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsICdlcnJvcicpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXIoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXInKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBwb3N0ZXJTZXQoKSB7XG4gICAgICAgIGNvbnN0IHBvc3RlclZhbCA9IHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0ZXJzZXQnKTtcbiAgICAgICAgaWYgKHBvc3RlclZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gcG9zdGVyVmFsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldCBzcmMoKSB7XG4gICAgICAgIGNvbnN0IHNyYyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzcmMgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXMoc3JjLnRyaW0oKSk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNyYztcbiAgICB9XG4gICAgc2V0IHNyYyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjU3RyaW5nLnRyaW0oKSk7XG4gICAgICAgICAgICB0aGlzLnNvdXJjZXNSZWFkeSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zdGVyIHVybCBzdHJpbmcsIGFuZCBzZXRzIGxvYWRpbmcgdGhhdCBwb3N0ZXIgaW50byBtb3Rpb25cbiAgICAgKi9cbiAgICBzZXQgcG9zdGVyKHBvc3RlclN0cmluZykge1xuICAgICAgICBpZiAocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHBvc3RlclN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy9cbiAgICBjb21waWxlU291cmNlcyhzcmNTdHJpbmcpIHtcbiAgICAgICAgbGV0IHNyY3NUb1JldHVybiA9IFtdO1xuICAgICAgICBsZXQgc3JjU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgc2l6ZVN0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IGZpbGVUeXBlU3RyaW5ncyA9IFtdO1xuICAgICAgICBsZXQgaGFzTXVsdGlwbGVTcmNzID0gZmFsc2UsIGhhc1NpemVzID0gZmFsc2U7XG4gICAgICAgIGlmIChzcmNTdHJpbmcuaW5kZXhPZignLCcpKSB7XG4gICAgICAgICAgICAvL0xvb2tzIGxpa2UgaHR0cHM6Ly9zb21ldGhpbmcgMzAwdywgaHR0cHM6Ly9zb21ldGhpbmcgaHR0cHM6Ly9hbm90aGVyIG9uZSwgZWxzZSBldGMgNTAwdyxcbiAgICAgICAgICAgIGhhc1NpemVzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjU3RyaW5nLmluZGV4T2YoJyAnKSkge1xuICAgICAgICAgICAgaGFzTXVsdGlwbGVTcmNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWhhc1NpemVzICYmICFoYXNNdWx0aXBsZVNyY3MpIHtcbiAgICAgICAgICAgIHNyY1N0cmluZ3MucHVzaChzcmNTdHJpbmcpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlcyA9IHNyY3NUb1JldHVybjtcbiAgICB9XG4gICAgZ2V0U291cmNlVHlwZSh1cmwpIHtcbiAgICAgICAgY29uc3QgeXRUZXN0ID0gbmV3IFJlZ0V4cCgvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KD86eW91dHVcXC5iZVxcL3woPzp3d3dcXC58bVxcLik/eW91dHViZVxcLmNvbVxcLyg/OndhdGNofHZ8ZW1iZWQpKD86XFwucGhwKT8oPzpcXD8uKnY9fFxcLykpKFthLXpBLVowLTlcXF8tXXs3LDE1fSkoPzpbXFw/Jl1bYS16QS1aMC05XFxfLV0rPVthLXpBLVowLTlcXF8tXSspKiQvKTtcbiAgICAgICAgY29uc3QgdmltZW9UZXN0ID0gbmV3IFJlZ0V4cCgvXFwvXFwvKD86d3d3XFwuKT92aW1lby5jb21cXC8oWzAtOWEtelxcLV9dKykvaSk7XG4gICAgICAgIGNvbnN0IHZpZGVvVGVzdCA9IG5ldyBSZWdFeHAoL1xcL1xcLyg/Ond3d1xcLik/Lio/XFwvKFswLTlhLXpcXC1fXSspXFwuKHdvZmZ8bXA0fG9nZykuKj8vaSk7XG4gICAgICAgIGlmICh5dFRlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3lvdXR1YmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpbWVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAndmltZW8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZGVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0WW91dHViZUlkRnJvbVNvdXJjZSh1cmwpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcL1xcLyg/Ond3d1xcLik/eW91dHUoPzpcXC5iZXxiZVxcLmNvbSlcXC8oPzp3YXRjaFxcP3Y9fGVtYmVkXFwvKT8oW2EtejAtOV9cXC1dKykvaTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHVybCk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNjJmODQ0MGUyNTEzNGU2M2U1YzVcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=