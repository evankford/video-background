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
    overlay;
    video;
    muteButton;
    pauseButton;
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
        this.overlay = document.createElement('div');
        this.overlay.classList.add('video-background--overlay');
        //Check for overlay things.
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
        const statusString = this.getAttribute('status');
        if (typeof statusString == 'string' && (statusString == "loading" || statusString == "loaded" || statusString == "buffering" || statusString == "failed" || statusString == "waiting" || statusString == "none" || statusString == "error")) {
            return statusString;
        }
        else {
            this.status = 'pre';
            return "pre";
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
            this.setAttribute('status', status);
        }
        else {
            this.setAttribute('status', 'error');
        }
    }
    connectedCallback() {
        this.innerHTML = this.status;
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("42bf22bfad22f5b6d0de")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4wNzM3NmMwYzI3YTc2ODAwNGRjYS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDM0VBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3ZpZGVvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBWaWRlb0JhY2tncm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgb3ZlcmxheTtcbiAgICB2aWRlbztcbiAgICBtdXRlQnV0dG9uO1xuICAgIHBhdXNlQnV0dG9uO1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcIndhaXRpbmdcIjtcbiAgICAgICAgdGhpcy5idWlsZERPTSgpO1xuICAgICAgICB0aGlzLmJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9XG4gICAgYnVpbGRET00oKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmFkZCgndmlkZW8tYmFja2dyb3VuZC0tb3ZlcmxheScpO1xuICAgICAgICAvL0NoZWNrIGZvciBvdmVybGF5IHRoaW5ncy5cbiAgICB9XG4gICAgYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC41XG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldCBzdGF0dXMoKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1N0cmluZyA9IHRoaXMuZ2V0QXR0cmlidXRlKCdzdGF0dXMnKTtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0dXNTdHJpbmcgPT0gJ3N0cmluZycgJiYgKHN0YXR1c1N0cmluZyA9PSBcImxvYWRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJsb2FkZWRcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJidWZmZXJpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJmYWlsZWRcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJ3YWl0aW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibm9uZVwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImVycm9yXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogVXBkYXRlcyBzdGF0dXMgb24gdGhlIGFjdHVhbCBlbGVtZW50IGFzIHdlbGwgYXMgdGhlIHByb3BlcnR5IG9mIHRoZSBjbGFzcyAqL1xuICAgIHNldCBzdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyAgIGNhc2UgKFwid2FpdGluZ1wiIHx8IFwibG9hZGluZ1wiKTpcbiAgICAgICAgICAgIC8vICAgYnJlYWs7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcG9zdGVyKCkge1xuICAgICAgICBjb25zdCBzdGF0dXNTdHJpbmcgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3RhdHVzJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzU3RyaW5nID09ICdzdHJpbmcnICYmIChzdGF0dXNTdHJpbmcgPT0gXCJsb2FkaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcIm5vbmVcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJlcnJvclwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ3ByZSc7XG4gICAgICAgICAgICByZXR1cm4gXCJwcmVcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb3N0ZXIgdXJsIHN0cmluZywgYW5kIHNldHMgbG9hZGluZyB0aGF0IHBvc3RlciBpbnRvIG1vdGlvblxuICAgICAqL1xuICAgIHNldCBwb3N0ZXIocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgIGlmIChwb3N0ZXJTdHJpbmcpIHtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyAgIGNhc2UgKFwid2FpdGluZ1wiIHx8IFwibG9hZGluZ1wiKTpcbiAgICAgICAgICAgIC8vICAgYnJlYWs7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5pbm5lckhUTUwgPSB0aGlzLnN0YXR1cztcbiAgICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI0MmJmMjJiZmFkMjJmNWI2ZDBkZVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==