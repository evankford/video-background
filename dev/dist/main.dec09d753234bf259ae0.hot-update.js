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
            return "pre";
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
        this.innerHTML = this.status;
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d27c2338387f265a3b64")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kZWMwOWQ3NTMyMzRiZjI1OWFlMC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDakNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS9iYWNrZ3JvdW5kLXZpZGVvLy4vc3JjL3ZpZGVvQmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly9AYXRtdGZ5L2JhY2tncm91bmQtdmlkZW8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxvYWRpbmdTdGF0dXNBcnJheSA9IFtcImxvYWRpbmdcIiwgXCJsb2FkZWRcIiwgXCJidWZmZXJpbmdcIiwgXCJmYWlsZWRcIiwgXCJ3YWl0aW5nXCIsIFwicHJlXCJdO1xuZXhwb3J0IGNsYXNzIFZpZGVvQmFja2dyb3VuZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJ3YWl0aW5nXCI7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgIH1cbiAgICBidWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCkge1xuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICBjb25zdCBzdGF0dXNTdHJpbmcgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3RhdHVzJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzU3RyaW5nID09ICdzdHJpbmcnICYmIChzdGF0dXNTdHJpbmcgPT0gXCJsb2FkaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibG9hZGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiYnVmZmVyaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFpbGVkXCIgfHwgc3RhdHVzU3RyaW5nID09IFwid2FpdGluZ1wiIHx8IHN0YXR1c1N0cmluZyA9PSBcInByZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHN0YXR1c1N0cmluZztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcInByZVwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBzdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlcmUncyBhIHRoaW5nIGhlcmUuXCIpO1xuICAgICAgICB0aGlzLmlubmVySFRNTCA9IHRoaXMuc3RhdHVzO1xuICAgIH1cbn1cbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImQyN2MyMzM4Mzg3ZjI2NWEzYjY0XCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9