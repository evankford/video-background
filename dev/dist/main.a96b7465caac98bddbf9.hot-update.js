"use strict";
self["webpackHotUpdate_atmtfy_background_video"]("main",{

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _videoBackground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./videoBackground */ "./src/videoBackground.ts");
/* harmony import */ var _styles_main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main */ "./src/styles/main.scss");


if (customElements.get('background-video')) {
    customElements.define('background-video', _videoBackground__WEBPACK_IMPORTED_MODULE_0__.VideoBackground);
}


/***/ }),

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
    status;
    constructor() {
        super();
        this.status = "waiting";
        this.init();
    }
    init() {
    }
    buildIntersectionObserver() {
    }
    // get autoplay():boolean {
    //   return this.hasAttribute('autoplay');
    // }
    // set autoplay(isAutoplay) {
    //   if (isAutoplay) {
    //     this.setAttribute('autoplay', '');
    //   } else {
    //     this.removeAttribute('autoplay');
    //   }
    // }
    connectedCallback() {
        console.log("There's a thing here.");
    }
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("cb48cf6bf0ad082d881e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5hOTZiNzQ2NWNhYWM5OGJkZGJmOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFvRDtBQUM3QjtBQUN2QjtBQUNBLDhDQUE4Qyw2REFBZTtBQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDSk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDeEJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS9iYWNrZ3JvdW5kLXZpZGVvLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL0BhdG10ZnkvYmFja2dyb3VuZC12aWRlby8uL3NyYy92aWRlb0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS9iYWNrZ3JvdW5kLXZpZGVvL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWaWRlb0JhY2tncm91bmQgfSBmcm9tIFwiLi92aWRlb0JhY2tncm91bmRcIjtcbmltcG9ydCBcIi4vc3R5bGVzL21haW5cIjtcbmlmIChjdXN0b21FbGVtZW50cy5nZXQoJ2JhY2tncm91bmQtdmlkZW8nKSkge1xuICAgIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYmFja2dyb3VuZC12aWRlbycsIFZpZGVvQmFja2dyb3VuZCk7XG59XG4iLCJleHBvcnQgY2xhc3MgVmlkZW9CYWNrZ3JvdW5kIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICAgIHN0YXR1cztcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcIndhaXRpbmdcIjtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgfVxuICAgIGJ1aWxkSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKSB7XG4gICAgfVxuICAgIC8vIGdldCBhdXRvcGxheSgpOmJvb2xlYW4ge1xuICAgIC8vICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdhdXRvcGxheScpO1xuICAgIC8vIH1cbiAgICAvLyBzZXQgYXV0b3BsYXkoaXNBdXRvcGxheSkge1xuICAgIC8vICAgaWYgKGlzQXV0b3BsYXkpIHtcbiAgICAvLyAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgIC8vICAgfSBlbHNlIHtcbiAgICAvLyAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2F1dG9wbGF5Jyk7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZXJlJ3MgYSB0aGluZyBoZXJlLlwiKTtcbiAgICB9XG59XG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJjYjQ4Y2Y2YmYwYWQwODJkODgxZVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==