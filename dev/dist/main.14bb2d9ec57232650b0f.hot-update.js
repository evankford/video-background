"use strict";
self["webpackHotUpdate_atmtfy_background_video"]("main",{

/***/ "./src/videoBackground.ts":
/*!********************************!*\
  !*** ./src/videoBackground.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoBackground": () => (/* binding */ VideoBackground)
/* harmony export */ });
const loadingStatusArray = ["loading", "loaded", "buffering", "failed", "waiting", "pre"];
class VideoBackground extends HTMLElement {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.status = "waiting";
        this.buildIntersectionObserver();
    }
    buildIntersectionObserver() {
    }
    get status() {
        const statusString = this.getAttribute('status');
        if (typeof statusString == 'string' && (statusString == "loading" || statusString == "loaded" || statusString == "buffering" || statusString == "failed" || statusString == "waiting" || statusString == "pre")) {
            return statusString;
        }
        else {
            return null;
        }
    }
    set status(status) {
        if (status) {
            this.setAttribute('status', status);
        }
        else {
            this.removeAttribute('autoplay');
        }
    }
    connectedCallback() {
        console.log("There's a thing here.");
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("dec09d753234bf259ae0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4xNGJiMmQ5ZWM1NzIzMjY1MGIwZi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQ2hDQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvYmFja2dyb3VuZC12aWRlby8uL3NyYy92aWRlb0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS9iYWNrZ3JvdW5kLXZpZGVvL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBsb2FkaW5nU3RhdHVzQXJyYXkgPSBbXCJsb2FkaW5nXCIsIFwibG9hZGVkXCIsIFwiYnVmZmVyaW5nXCIsIFwiZmFpbGVkXCIsIFwid2FpdGluZ1wiLCBcInByZVwiXTtcbmV4cG9ydCBjbGFzcyBWaWRlb0JhY2tncm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnN0YXR1cyA9IFwid2FpdGluZ1wiO1xuICAgICAgICB0aGlzLmJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTtcbiAgICB9XG4gICAgYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpIHtcbiAgICB9XG4gICAgZ2V0IHN0YXR1cygpIHtcbiAgICAgICAgY29uc3Qgc3RhdHVzU3RyaW5nID0gdGhpcy5nZXRBdHRyaWJ1dGUoJ3N0YXR1cycpO1xuICAgICAgICBpZiAodHlwZW9mIHN0YXR1c1N0cmluZyA9PSAnc3RyaW5nJyAmJiAoc3RhdHVzU3RyaW5nID09IFwibG9hZGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImxvYWRlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImJ1ZmZlcmluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcImZhaWxlZFwiIHx8IHN0YXR1c1N0cmluZyA9PSBcIndhaXRpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJwcmVcIikpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0dXNTdHJpbmc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgc3RhdHVzKHN0YXR1cykge1xuICAgICAgICBpZiAoc3RhdHVzKSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdhdXRvcGxheScpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYSB0aGluZyBoZXJlLlwiKTtcbiAgICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJkZWMwOWQ3NTMyMzRiZjI1OWFlMFwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==