"use strict";
self["webpackHotUpdate_atmtfy_video_background"]("main",{

/***/ "./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@12.4.0_sass@1.48.0+webpack@5.66.0/node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/cjs.js!./node_modules/.pnpm/sass-loader@12.4.0_sass@1.48.0+webpack@5.66.0/node_modules/sass-loader/dist/cjs.js!./src/styles/main.scss ***!
  \*******************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_6_5_1_webpack_5_66_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --vbg-theme: white;\n  --vbg-bg: black;\n  --vbg-overlay-opacity: 0.5;\n  --vbg-transition-speed: 0.5s;\n  --vbg-preloader-size: 32px;\n}\n\nvideo-background {\n  width: 100%;\n  height: 100%;\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  background: var(--vbg-bg);\n  margin: 0;\n  padding: 0;\n}\nvideo-background[status=loading]::after, video-background[status=waiting]::after {\n  content: \"\";\n  border-radius: 50%;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--vbg-preloader-size, 32px);\n  height: var(--vbg-preloader-size, 32px);\n  margin: calc(0px - var(--vbg-preloader-size) * 0.5) 0 0 calc(0px - var(--vbg-preloader-size) * 0.5);\n  border: 4px solid var(--vbg-theme);\n  border-top-color: transparent;\n  z-index: 2;\n  animation: loader-spin 1s infinite ease;\n}\n\n.vbg__overlay {\n  z-index: 4;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  display: block;\n  background-color: var(--vbg-bg);\n  opacity: var(--vbg-overlay-opacity);\n}\n\n.vbg__controls {\n  z-index: 5;\n}\n\n.vbg__poster {\n  z-index: 3;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: opacity var(--vbg-transition-speed) ease;\n}\n\n.vbg--loading {\n  opacity: 0;\n}\n\n@keyframes loader-spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAAA;EACE,kBAAA;EACA,eAAA;EACA,0BAAA;EACA,4BAAA;EACA,0BAAA;AACF;;AAIA;EACE,WAAA;EACA,YAAA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;EACA,UAAA;EACA,MAAA;EACA,OAAA;EACA,yBAAA;EACA,SAAA;EACA,UAAA;AADF;AAKI;EACE,WAAA;EACA,kBAAA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,sCAAA;EACA,uCAAA;EACA,mGAAA;EACA,kCAAA;EACA,6BAAA;EACA,UAAA;EACA,uCAAA;AAHN;;AAOA;EACE,UAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;EACA,cAAA;EACA,+BAAA;EACA,mCAAA;AAJF;;AAMA;EACE,UAAA;AAHF;;AAKA;EACE,UAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;EACA,oDAAA;AAFF;;AAOA;EACE,UAAA;AAJF;;AAQA;EACE;IAAK,yBAAA;EAJL;AACF","sourcesContent":[":root {\n  --vbg-theme: white;\n  --vbg-bg: black;\n  --vbg-overlay-opacity: 0.5;\n  --vbg-transition-speed: 0.5s;\n  --vbg-preloader-size: 32px;\n}\n\n\n\nvideo-background {\n  width: 100%;\n  height: 100%;\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  background: var(--vbg-bg);\n  margin: 0;\n  padding: 0;\n\n\n  &[status=loading],&[status=waiting] {\n    &::after {\n      content:'';\n      border-radius: 50%;\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      width: var(--vbg-preloader-size, 32px);\n      height: var(--vbg-preloader-size, 32px);\n      margin: calc(0px - var(--vbg-preloader-size) * 0.5) 0 0 calc(0px - var(--vbg-preloader-size) * 0.5);\n      border: 4px solid var(--vbg-theme);\n      border-top-color: transparent;\n      z-index: 2;\n      animation: loader-spin 1s infinite ease;\n    }\n  }\n}\n.vbg__overlay  {\n  z-index: 4;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  display: block;\n  background-color: var(--vbg-bg);\n  opacity: var(--vbg-overlay-opacity);\n}\n.vbg__controls  {\n  z-index: 5;\n}\n.vbg__poster  {\n  z-index: 3;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: opacity var(--vbg-transition-speed) ease;\n\n}\n\n\n.vbg--loading {\n  opacity: 0;\n}\n\n\n@keyframes loader-spin {\n  100%{transform:rotate(360deg)}\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/api.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/api.js ***!
  \********************************************************************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \***************************************************************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("295e076ca4d0c9199b3c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDckdhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O1VDckJBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3N0eWxlcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2Nzcy1sb2FkZXJANi41LjFfd2VicGFja0A1LjY2LjAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9ub2RlX21vZHVsZXMvLnBucG0vY3NzLWxvYWRlckA2LjUuMV93ZWJwYWNrQDUuNjYuMC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vY3NzLWxvYWRlckA2LjUuMV93ZWJwYWNrQDUuNjYuMC9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Nzcy1sb2FkZXJANi41LjFfd2VicGFja0A1LjY2LjAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiOnJvb3Qge1xcbiAgLS12YmctdGhlbWU6IHdoaXRlO1xcbiAgLS12YmctYmc6IGJsYWNrO1xcbiAgLS12Ymctb3ZlcmxheS1vcGFjaXR5OiAwLjU7XFxuICAtLXZiZy10cmFuc2l0aW9uLXNwZWVkOiAwLjVzO1xcbiAgLS12YmctcHJlbG9hZGVyLXNpemU6IDMycHg7XFxufVxcblxcbnZpZGVvLWJhY2tncm91bmQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAwO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQ6IHZhcigtLXZiZy1iZyk7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG52aWRlby1iYWNrZ3JvdW5kW3N0YXR1cz1sb2FkaW5nXTo6YWZ0ZXIsIHZpZGVvLWJhY2tncm91bmRbc3RhdHVzPXdhaXRpbmddOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiXFxcIjtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgd2lkdGg6IHZhcigtLXZiZy1wcmVsb2FkZXItc2l6ZSwgMzJweCk7XFxuICBoZWlnaHQ6IHZhcigtLXZiZy1wcmVsb2FkZXItc2l6ZSwgMzJweCk7XFxuICBtYXJnaW46IGNhbGMoMHB4IC0gdmFyKC0tdmJnLXByZWxvYWRlci1zaXplKSAqIDAuNSkgMCAwIGNhbGMoMHB4IC0gdmFyKC0tdmJnLXByZWxvYWRlci1zaXplKSAqIDAuNSk7XFxuICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS12YmctdGhlbWUpO1xcbiAgYm9yZGVyLXRvcC1jb2xvcjogdHJhbnNwYXJlbnQ7XFxuICB6LWluZGV4OiAyO1xcbiAgYW5pbWF0aW9uOiBsb2FkZXItc3BpbiAxcyBpbmZpbml0ZSBlYXNlO1xcbn1cXG5cXG4udmJnX19vdmVybGF5IHtcXG4gIHotaW5kZXg6IDQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXZiZy1iZyk7XFxuICBvcGFjaXR5OiB2YXIoLS12Ymctb3ZlcmxheS1vcGFjaXR5KTtcXG59XFxuXFxuLnZiZ19fY29udHJvbHMge1xcbiAgei1pbmRleDogNTtcXG59XFxuXFxuLnZiZ19fcG9zdGVyIHtcXG4gIHotaW5kZXg6IDM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSB2YXIoLS12YmctdHJhbnNpdGlvbi1zcGVlZCkgZWFzZTtcXG59XFxuXFxuLnZiZy0tbG9hZGluZyB7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRlci1zcGluIHtcXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbiAgfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL21haW4uc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLDBCQUFBO0VBQ0EsNEJBQUE7RUFDQSwwQkFBQTtBQUNGOztBQUlBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLHlCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFERjtBQUtJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLHNDQUFBO0VBQ0EsdUNBQUE7RUFDQSxtR0FBQTtFQUNBLGtDQUFBO0VBQ0EsNkJBQUE7RUFDQSxVQUFBO0VBQ0EsdUNBQUE7QUFITjs7QUFPQTtFQUNFLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxjQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQ0FBQTtBQUpGOztBQU1BO0VBQ0UsVUFBQTtBQUhGOztBQUtBO0VBQ0UsVUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG9EQUFBO0FBRkY7O0FBT0E7RUFDRSxVQUFBO0FBSkY7O0FBUUE7RUFDRTtJQUFLLHlCQUFBO0VBSkw7QUFDRlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICAtLXZiZy10aGVtZTogd2hpdGU7XFxuICAtLXZiZy1iZzogYmxhY2s7XFxuICAtLXZiZy1vdmVybGF5LW9wYWNpdHk6IDAuNTtcXG4gIC0tdmJnLXRyYW5zaXRpb24tc3BlZWQ6IDAuNXM7XFxuICAtLXZiZy1wcmVsb2FkZXItc2l6ZTogMzJweDtcXG59XFxuXFxuXFxuXFxudmlkZW8tYmFja2dyb3VuZCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDA7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgYmFja2dyb3VuZDogdmFyKC0tdmJnLWJnKTtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuXFxuXFxuICAmW3N0YXR1cz1sb2FkaW5nXSwmW3N0YXR1cz13YWl0aW5nXSB7XFxuICAgICY6OmFmdGVyIHtcXG4gICAgICBjb250ZW50OicnO1xcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgdG9wOiA1MCU7XFxuICAgICAgbGVmdDogNTAlO1xcbiAgICAgIHdpZHRoOiB2YXIoLS12YmctcHJlbG9hZGVyLXNpemUsIDMycHgpO1xcbiAgICAgIGhlaWdodDogdmFyKC0tdmJnLXByZWxvYWRlci1zaXplLCAzMnB4KTtcXG4gICAgICBtYXJnaW46IGNhbGMoMHB4IC0gdmFyKC0tdmJnLXByZWxvYWRlci1zaXplKSAqIDAuNSkgMCAwIGNhbGMoMHB4IC0gdmFyKC0tdmJnLXByZWxvYWRlci1zaXplKSAqIDAuNSk7XFxuICAgICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tdmJnLXRoZW1lKTtcXG4gICAgICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICB6LWluZGV4OiAyO1xcbiAgICAgIGFuaW1hdGlvbjogbG9hZGVyLXNwaW4gMXMgaW5maW5pdGUgZWFzZTtcXG4gICAgfVxcbiAgfVxcbn1cXG4udmJnX19vdmVybGF5ICB7XFxuICB6LWluZGV4OiA0O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS12YmctYmcpO1xcbiAgb3BhY2l0eTogdmFyKC0tdmJnLW92ZXJsYXktb3BhY2l0eSk7XFxufVxcbi52YmdfX2NvbnRyb2xzICB7XFxuICB6LWluZGV4OiA1O1xcbn1cXG4udmJnX19wb3N0ZXIgIHtcXG4gIHotaW5kZXg6IDM7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9iamVjdC1maXQ6IGNvdmVyO1xcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSB2YXIoLS12YmctdHJhbnNpdGlvbi1zcGVlZCkgZWFzZTtcXG5cXG59XFxuXFxuXFxuLnZiZy0tbG9hZGluZyB7XFxuICBvcGFjaXR5OiAwO1xcbn1cXG5cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRlci1zcGluIHtcXG4gIDEwMCV7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfVxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMjk1ZTA3NmNhNGQwYzkxOTliM2NcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=