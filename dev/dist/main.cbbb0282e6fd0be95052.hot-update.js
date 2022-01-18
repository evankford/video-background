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
    constructor() {
        super();
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
    }
    buildOverlay() {
        this.overlayEl = document.createElement('div');
        this.overlayEl.classList.add('vbg__overlay');
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
    connectedCallback() {
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("77e9af31a1d4603823fa")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jYmJiMDI4MmU2ZmQwYmU5NTA1Mi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQ2hIQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy92aWRlb0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgVmlkZW9CYWNrZ3JvdW5kIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIG92ZXJsYXlFbDtcbiAgICBwb3N0ZXJFbDtcbiAgICB2aWRlb0VsO1xuICAgIG11dGVCdXR0b247XG4gICAgcGF1c2VCdXR0b247XG4gICAgc2l6ZTtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJ3YWl0aW5nXCI7XG4gICAgICAgIHRoaXMuYnVpbGRET00oKTtcbiAgICAgICAgdGhpcy5idWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCk7XG4gICAgfVxuICAgIGJ1aWxkRE9NKCkge1xuICAgICAgICB0aGlzLmJ1aWxkT3ZlcmxheSgpO1xuICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIC8vQ2hlY2sgZm9yIG92ZXJsYXkgdGhpbmdzLlxuICAgIH1cbiAgICBidWlsZFBvc3RlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvc3RlclNldCAmJiAhdGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3RlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnX19wb3N0ZXInKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgaWYgKHRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGltYWdlTG9hZGVyRWwgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuc3JjID0gdGhpcy5wb3N0ZXI7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYgJiYgc2VsZi5wb3N0ZXJFbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLnNyYyA9IGltYWdlTG9hZGVyRWwuc3JjO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc3RlclNldCkge1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zcmNzZXQgPSB0aGlzLnBvc3RlclNldDtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc2l6ZXMgPSB0aGlzLnNpemUgfHwgXCIxMDB2d1wiO1xuICAgICAgICB9XG4gICAgfVxuICAgIGJ1aWxkT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuY2xhc3NMaXN0LmFkZCgndmJnX19vdmVybGF5Jyk7XG4gICAgfVxuICAgIGJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuNVxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICBjb25zdCBzdGF0dXNTdHJpbmcgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3RhdHVzJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzU3RyaW5nID09ICdzdHJpbmcnICYmIChzdGF0dXNTdHJpbmcgPT0gXCJsb2FkaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcIm5vbmVcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gXCJub25lXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJub25lXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIFVwZGF0ZXMgc3RhdHVzIG9uIHRoZSBhY3R1YWwgZWxlbWVudCBhcyB3ZWxsIGFzIHRoZSBwcm9wZXJ0eSBvZiB0aGUgY2xhc3MgKi9cbiAgICBzZXQgc3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgJ2Vycm9yJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlcigpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcicpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHBvc3RlclNldCgpIHtcbiAgICAgICAgY29uc3QgcG9zdGVyVmFsID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bvc3RlcnNldCcpO1xuICAgICAgICBpZiAocG9zdGVyVmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBwb3N0ZXJWYWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgcG9zdGVyIHVybCBzdHJpbmcsIGFuZCBzZXRzIGxvYWRpbmcgdGhhdCBwb3N0ZXIgaW50byBtb3Rpb25cbiAgICAgKi9cbiAgICBzZXQgcG9zdGVyKHBvc3RlclN0cmluZykge1xuICAgICAgICBpZiAocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgICAgICAvLyBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICAgICAgLy8gICBjYXNlIChcIndhaXRpbmdcIiB8fCBcImxvYWRpbmdcIik6XG4gICAgICAgICAgICAvLyAgIGJyZWFrO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ3Bvc3RlcicsIHBvc3RlclN0cmluZyk7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkUG9zdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgfVxufVxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNzdlOWFmMzFhMWQ0NjAzODIzZmFcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=