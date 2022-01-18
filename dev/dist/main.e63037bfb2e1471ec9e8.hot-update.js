"use strict";
self["webpackHotUpdate_atmtfy_background_video"]("main",{

/***/ "./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/cjs.js!./src/styles/main.scss":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/css-loader@6.5.1_webpack@5.66.0/node_modules/css-loader/dist/cjs.js!./src/styles/main.scss ***!
  \***********************************************************************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --video-background-theme: white;\n  --video-background-bg: black;\n  --video-background-preloader-size: 32px;\n}\n\nbody {\n  background: purple;\n  min-height: 100vh;\n  position: relative;\n\n}\n\nvideo-background {\n  width: 100%;\n  height: 100%;\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  background: var(--video-background-bg);\n\n\n  &[status=loading],&[status=waiting] {\n    &::after {\n      content:'';\n      border-radius: 50%;\n      top: 50%;\n      left: 50%;\n      width: var(--video-background-preloader-size, 32px);\n      height: var(--video-background-preloader-size, 32px);\n      border: 4px solid var(--video-background-theme);\n      border-top-color: transparent;\n      z-index: 2;\n      animation: loader-spin 1s infinite ease;\n\n    }\n  }\n}\n.video-background__overlay  {\n  z-index: 3;\n}\n.video-background__controls  {\n  z-index: 4;\n}\n\n@keyframes loader-spin {\n  100%{transform:rotate(360deg)}\n}", "",{"version":3,"sources":["webpack://./src/styles/main.scss"],"names":[],"mappings":"AAAA;EACE,+BAA+B;EAC/B,4BAA4B;EAC5B,uCAAuC;AACzC;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,kBAAkB;;AAEpB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,cAAc;EACd,sBAAsB;EACtB,kBAAkB;EAClB,UAAU;EACV,MAAM;EACN,OAAO;EACP,sCAAsC;;;EAGtC;IACE;MACE,UAAU;MACV,kBAAkB;MAClB,QAAQ;MACR,SAAS;MACT,mDAAmD;MACnD,oDAAoD;MACpD,+CAA+C;MAC/C,6BAA6B;MAC7B,UAAU;MACV,uCAAuC;;IAEzC;EACF;AACF;AACA;EACE,UAAU;AACZ;AACA;EACE,UAAU;AACZ;;AAEA;EACE,KAAK,wBAAwB;AAC/B","sourcesContent":[":root {\n  --video-background-theme: white;\n  --video-background-bg: black;\n  --video-background-preloader-size: 32px;\n}\n\nbody {\n  background: purple;\n  min-height: 100vh;\n  position: relative;\n\n}\n\nvideo-background {\n  width: 100%;\n  height: 100%;\n  display: block;\n  box-sizing: border-box;\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 0;\n  background: var(--video-background-bg);\n\n\n  &[status=loading],&[status=waiting] {\n    &::after {\n      content:'';\n      border-radius: 50%;\n      top: 50%;\n      left: 50%;\n      width: var(--video-background-preloader-size, 32px);\n      height: var(--video-background-preloader-size, 32px);\n      border: 4px solid var(--video-background-theme);\n      border-top-color: transparent;\n      z-index: 2;\n      animation: loader-spin 1s infinite ease;\n\n    }\n  }\n}\n.video-background__overlay  {\n  z-index: 3;\n}\n.video-background__controls  {\n  z-index: 4;\n}\n\n@keyframes loader-spin {\n  100%{transform:rotate(360deg)}\n}"],"sourceRoot":""}]);
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
/******/ 	__webpack_require__.h = () => ("737873dbe24e38ac1927")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5lNjMwMzdiZmIyZTE0NzFlYzllOC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDZ0s7QUFDakI7QUFDL0ksOEJBQThCLHFJQUEyQixDQUFDLDhJQUFxQztBQUMvRjtBQUNBLGlEQUFpRCxvQ0FBb0MsaUNBQWlDLDRDQUE0QyxHQUFHLFVBQVUsdUJBQXVCLHNCQUFzQix1QkFBdUIsS0FBSyxzQkFBc0IsZ0JBQWdCLGlCQUFpQixtQkFBbUIsMkJBQTJCLHVCQUF1QixlQUFlLFdBQVcsWUFBWSwyQ0FBMkMsNkNBQTZDLGdCQUFnQixtQkFBbUIsMkJBQTJCLGlCQUFpQixrQkFBa0IsNERBQTRELDZEQUE2RCx3REFBd0Qsc0NBQXNDLG1CQUFtQixnREFBZ0QsU0FBUyxLQUFLLEdBQUcsK0JBQStCLGVBQWUsR0FBRyxnQ0FBZ0MsZUFBZSxHQUFHLDRCQUE0QixTQUFTLHlCQUF5QixHQUFHLE9BQU8sdUZBQXVGLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsY0FBYyxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLGNBQWMsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLGFBQWEsTUFBTSxLQUFLLEtBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxVQUFVLE1BQU0sS0FBSyxpQkFBaUIsaUNBQWlDLG9DQUFvQyxpQ0FBaUMsNENBQTRDLEdBQUcsVUFBVSx1QkFBdUIsc0JBQXNCLHVCQUF1QixLQUFLLHNCQUFzQixnQkFBZ0IsaUJBQWlCLG1CQUFtQiwyQkFBMkIsdUJBQXVCLGVBQWUsV0FBVyxZQUFZLDJDQUEyQyw2Q0FBNkMsZ0JBQWdCLG1CQUFtQiwyQkFBMkIsaUJBQWlCLGtCQUFrQiw0REFBNEQsNkRBQTZELHdEQUF3RCxzQ0FBc0MsbUJBQW1CLGdEQUFnRCxTQUFTLEtBQUssR0FBRywrQkFBK0IsZUFBZSxHQUFHLGdDQUFnQyxlQUFlLEdBQUcsNEJBQTRCLFNBQVMseUJBQXlCLEdBQUcsbUJBQW1CO0FBQzlqRjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ1AxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFEQUFxRDtBQUNyRDs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBLHFGQUFxRjtBQUNyRjs7QUFFQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIscUJBQXFCO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQ3JHYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztVQ3JCQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvYmFja2dyb3VuZC12aWRlby8uL3NyYy9zdHlsZXMvbWFpbi5zY3NzIiwid2VicGFjazovL0BhdG10ZnkvYmFja2dyb3VuZC12aWRlby8uL25vZGVfbW9kdWxlcy8ucG5wbS9jc3MtbG9hZGVyQDYuNS4xX3dlYnBhY2tANS42Ni4wL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS9iYWNrZ3JvdW5kLXZpZGVvLy4vbm9kZV9tb2R1bGVzLy5wbnBtL2Nzcy1sb2FkZXJANi41LjFfd2VicGFja0A1LjY2LjAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS9iYWNrZ3JvdW5kLXZpZGVvL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2Nzcy1sb2FkZXJANi41LjFfd2VicGFja0A1LjY2LjAvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9jc3MtbG9hZGVyQDYuNS4xX3dlYnBhY2tANS42Ni4wL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIC0tdmlkZW8tYmFja2dyb3VuZC10aGVtZTogd2hpdGU7XFxuICAtLXZpZGVvLWJhY2tncm91bmQtYmc6IGJsYWNrO1xcbiAgLS12aWRlby1iYWNrZ3JvdW5kLXByZWxvYWRlci1zaXplOiAzMnB4O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHB1cnBsZTtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcblxcbn1cXG5cXG52aWRlby1iYWNrZ3JvdW5kIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICBiYWNrZ3JvdW5kOiB2YXIoLS12aWRlby1iYWNrZ3JvdW5kLWJnKTtcXG5cXG5cXG4gICZbc3RhdHVzPWxvYWRpbmddLCZbc3RhdHVzPXdhaXRpbmddIHtcXG4gICAgJjo6YWZ0ZXIge1xcbiAgICAgIGNvbnRlbnQ6Jyc7XFxuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xcbiAgICAgIHRvcDogNTAlO1xcbiAgICAgIGxlZnQ6IDUwJTtcXG4gICAgICB3aWR0aDogdmFyKC0tdmlkZW8tYmFja2dyb3VuZC1wcmVsb2FkZXItc2l6ZSwgMzJweCk7XFxuICAgICAgaGVpZ2h0OiB2YXIoLS12aWRlby1iYWNrZ3JvdW5kLXByZWxvYWRlci1zaXplLCAzMnB4KTtcXG4gICAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS12aWRlby1iYWNrZ3JvdW5kLXRoZW1lKTtcXG4gICAgICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gICAgICB6LWluZGV4OiAyO1xcbiAgICAgIGFuaW1hdGlvbjogbG9hZGVyLXNwaW4gMXMgaW5maW5pdGUgZWFzZTtcXG5cXG4gICAgfVxcbiAgfVxcbn1cXG4udmlkZW8tYmFja2dyb3VuZF9fb3ZlcmxheSAge1xcbiAgei1pbmRleDogMztcXG59XFxuLnZpZGVvLWJhY2tncm91bmRfX2NvbnRyb2xzICB7XFxuICB6LWluZGV4OiA0O1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIGxvYWRlci1zcGluIHtcXG4gIDEwMCV7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfVxcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL21haW4uc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLCtCQUErQjtFQUMvQiw0QkFBNEI7RUFDNUIsdUNBQXVDO0FBQ3pDOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixrQkFBa0I7O0FBRXBCOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2Qsc0JBQXNCO0VBQ3RCLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsTUFBTTtFQUNOLE9BQU87RUFDUCxzQ0FBc0M7OztFQUd0QztJQUNFO01BQ0UsVUFBVTtNQUNWLGtCQUFrQjtNQUNsQixRQUFRO01BQ1IsU0FBUztNQUNULG1EQUFtRDtNQUNuRCxvREFBb0Q7TUFDcEQsK0NBQStDO01BQy9DLDZCQUE2QjtNQUM3QixVQUFVO01BQ1YsdUNBQXVDOztJQUV6QztFQUNGO0FBQ0Y7QUFDQTtFQUNFLFVBQVU7QUFDWjtBQUNBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsS0FBSyx3QkFBd0I7QUFDL0JcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgLS12aWRlby1iYWNrZ3JvdW5kLXRoZW1lOiB3aGl0ZTtcXG4gIC0tdmlkZW8tYmFja2dyb3VuZC1iZzogYmxhY2s7XFxuICAtLXZpZGVvLWJhY2tncm91bmQtcHJlbG9hZGVyLXNpemU6IDMycHg7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogcHVycGxlO1xcbiAgbWluLWhlaWdodDogMTAwdmg7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuXFxufVxcblxcbnZpZGVvLWJhY2tncm91bmQge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAwO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tncm91bmQ6IHZhcigtLXZpZGVvLWJhY2tncm91bmQtYmcpO1xcblxcblxcbiAgJltzdGF0dXM9bG9hZGluZ10sJltzdGF0dXM9d2FpdGluZ10ge1xcbiAgICAmOjphZnRlciB7XFxuICAgICAgY29udGVudDonJztcXG4gICAgICBib3JkZXItcmFkaXVzOiA1MCU7XFxuICAgICAgdG9wOiA1MCU7XFxuICAgICAgbGVmdDogNTAlO1xcbiAgICAgIHdpZHRoOiB2YXIoLS12aWRlby1iYWNrZ3JvdW5kLXByZWxvYWRlci1zaXplLCAzMnB4KTtcXG4gICAgICBoZWlnaHQ6IHZhcigtLXZpZGVvLWJhY2tncm91bmQtcHJlbG9hZGVyLXNpemUsIDMycHgpO1xcbiAgICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLXZpZGVvLWJhY2tncm91bmQtdGhlbWUpO1xcbiAgICAgIGJvcmRlci10b3AtY29sb3I6IHRyYW5zcGFyZW50O1xcbiAgICAgIHotaW5kZXg6IDI7XFxuICAgICAgYW5pbWF0aW9uOiBsb2FkZXItc3BpbiAxcyBpbmZpbml0ZSBlYXNlO1xcblxcbiAgICB9XFxuICB9XFxufVxcbi52aWRlby1iYWNrZ3JvdW5kX19vdmVybGF5ICB7XFxuICB6LWluZGV4OiAzO1xcbn1cXG4udmlkZW8tYmFja2dyb3VuZF9fY29udHJvbHMgIHtcXG4gIHotaW5kZXg6IDQ7XFxufVxcblxcbkBrZXlmcmFtZXMgbG9hZGVyLXNwaW4ge1xcbiAgMTAwJXt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3Mzc4NzNkYmUyNGUzOGFjMTkyN1wiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==