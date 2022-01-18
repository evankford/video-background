"use strict";
self["webpackHotUpdate_atmtfy_video_background"]("main",{

/***/ "./src/constants/instance.js":
/*!***********************************!*\
  !*** ./src/constants/instance.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEBUG": () => (/* binding */ DEBUG),
/* harmony export */   "DEFAULT_PROPERTY_VALUES": () => (/* binding */ DEFAULT_PROPERTY_VALUES),
/* harmony export */   "TIMEOUT": () => (/* binding */ TIMEOUT),
/* harmony export */   "YOUTUBE_REGEX": () => (/* binding */ YOUTUBE_REGEX),
/* harmony export */   "UNSUPPORTED_VIDEO_SOURCE": () => (/* binding */ UNSUPPORTED_VIDEO_SOURCE),
/* harmony export */   "VIMEO_REGEX": () => (/* binding */ VIMEO_REGEX)
/* harmony export */ });
const DEBUG = {
  enabled: true, // Adds the Class instance to the window for easier debugging
  verbose: false // Allows logging in detail
}

const DEFAULT_PROPERTY_VALUES = {
  container: 'body',
  url: 'https://youtu.be/xkEmYQvJ_68',
  source: 'youtube',
  fitMode: 'fill',
  scaleFactor: 1,
  playbackSpeed: 1,
  filter: 1,
  filterStrength: 50,
  timeCode: { start: 0, end: null },
  DEBUG
}

const TIMEOUT = 2500

const UNSUPPORTED_VIDEO_SOURCE = 'unsupported'

// eslint-disable-next-line no-useless-escape
const YOUTUBE_REGEX = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/
// eslint-disable-next-line no-useless-escape
const VIMEO_REGEX = /^.*(vimeo\.com\/)(channels\/[a-zA-Z0-9]*\/)?([0-9]{7,}(#t\=.*s)?)/



/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findPlayerAspectRatio": () => (/* binding */ findPlayerAspectRatio),
/* harmony export */   "getPlayerElement": () => (/* binding */ getPlayerElement),
/* harmony export */   "getStartTime": () => (/* binding */ getStartTime),
/* harmony export */   "getVideoID": () => (/* binding */ getVideoID),
/* harmony export */   "getVideoSource": () => (/* binding */ getVideoSource),
/* harmony export */   "validatedImage": () => (/* binding */ validatedImage)
/* harmony export */ });
/* harmony import */ var _constants_instance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants/instance.js */ "./src/constants/instance.js");
/* harmony import */ var url_parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! url-parse */ "./node_modules/.pnpm/url-parse@1.5.4/node_modules/url-parse/index.js");
/* harmony import */ var url_parse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(url_parse__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash.get */ "./node_modules/.pnpm/lodash.get@4.4.2/node_modules/lodash.get/index.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_2__);




/**
 * The YouTube API seemingly does not expose the actual width and height dimensions
 * of the video itself. The video's dimensions and ratio may be completely different
 * than the IFRAME's. This hack finds those values inside some private objects.
 * Since this is not part of the public API, the dimensions will fall back to the
 * container width and height in case YouTube changes the internals unexpectedly.
 *
 * @method getYouTubeDimensions Get the dimensions of the video itself
 * @param {Object} Player
 * @return {Object} The width and height as integers or undefined
 */
const getYouTubeDimensions = player => {
  let w
  let h
  for (let p in player) {
    let prop = player[p]
    if (typeof prop === 'object' && prop.width && prop.height) {
      w = prop.width
      h = prop.height
      break
    }
  }
  return { w, h }
}

/**
 * @method getVimeoDimensions Get the dimensions of the video itself
 * @param {Object} Player
 * @return {Object} The width and height as integers or undefined
 */
const getVimeoDimensions = player => {
  let w
  let h
  if (player.dimensions) {
    w = player.dimensions.width
    h = player.dimensions.height
  } else if (player.iframe) {
    w = player.iframe.clientWidth
    h = player.iframe.clientHeight
  }
  return { w, h }
}

const providerUtils = {
  youtube: {
    parsePath: 'query.t',
    timeRegex: /[hms]/,
    idRegex: _constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.YOUTUBE_REGEX,
    getDimensions: getYouTubeDimensions
  },
  vimeo: {
    parsePath: null,
    timeRegex: /[#t=s]/,
    idRegex: _constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.VIMEO_REGEX,
    getDimensions: getVimeoDimensions
  }
}

/**
 * @method getTimeParameter YouTube and Vimeo have optional URL formats to allow
 *    playback to begin from a certain point in the video.
 * @return {String or false} The appropriate time parameter or false.
 */
const getTimeParameter = (parsedUrl, source) => {
  return providerUtils[source].parsePath ? lodash_get__WEBPACK_IMPORTED_MODULE_2___default()(parsedUrl, providerUtils[source].parsePath) : null
}

/**
 * @method getStartTime Parse the start time base on the URL formats of YouTube and Vimeo.
 * @param {String} [url] The URL for the video, including any time code parameters.
 * @return {Number} Time in seconds
 */
const getStartTime = (url, source) => {
  const parsedUrl = new (url_parse__WEBPACK_IMPORTED_MODULE_1___default())(url, true)
  let timeParam = getTimeParameter(parsedUrl, source)
  if (!timeParam) {
    return
  }

  const match = timeParam.split(providerUtils[source].timeRegex).filter(Boolean)
  let s = parseInt(match.pop(), 10) || 0
  let m = parseInt(match.pop(), 10) * 60 || 0
  let h = parseInt(match.pop(), 10) * 3600 || 0
  return h + m + s
}

/**
 * @method getVideoSource Determine the video source from the URL via regex.
 * @param {String} [url] The URL for the video
 * @return {String} Video provider name
 */
const getVideoSource = (url = _constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_PROPERTY_VALUES.url) => {
  let match = url.match(_constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.YOUTUBE_REGEX)
  if (match && match[2].length) {
    return 'youtube'
  }

  match = url.match(_constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.VIMEO_REGEX)
  if (match && match[3].length) {
    return 'vimeo'
  }

  console.error(`Video source ${ url } does not match supported types`)
  return _constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.UNSUPPORTED_VIDEO_SOURCE
}

/**
 * @method getVideoId Get the video ID for use in the provider APIs.
 * @param {String} [url] The URL for the video
 * @param {String} [source] Video provider name
 * @return {String} Video ID
 */
const getVideoID = (url = _constants_instance_js__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_PROPERTY_VALUES.url, source = null) => {
  const provider = providerUtils[source];
  let match = provider && url.match(provider.idRegex)
  const id = source === 'vimeo' ? match[3] : match[2]
  if (match && id.length) {
    return id
  }

  console.error(`Video id at ${ url } is not valid`)
}

/**
 * @method validatedImage Ensure the element is an image
 * @param {Node} [img] Image element
 * @return {Node or false}
 */
const validatedImage = (img) => {
  if (!img) {
    return false
  }
  let isValid = img.nodeName === 'IMG' ? img : false;
  if (!isValid) {
    console.warn('Element is not a valid image element.');
  }

  return isValid
}

/**
 * @method findPlayerAspectRatio Determine the aspect ratio of the actual video itself,
 *    which may be different than the IFRAME returned by the video provider.
 * @return {Number} A ratio of width divided by height.
 */
const findPlayerAspectRatio = (container, player, videoSource) => {
  let w
  let h
  if (player) {
    const dimensions = providerUtils[videoSource].getDimensions(player)
    w = dimensions.w
    h = dimensions.h
  }
  if (!w || !h) {
    w = container.clientWidth
    h = container.clientHeight
    console.warn(`No width and height found in ${videoSource} player ${player}. Using container dimensions.`)
  }
  return parseInt(w, 10) / parseInt(h, 10)
}

const getPlayerElement = (container) => {
  let playerElement = container.querySelector('#player');
  if (!playerElement) {
    playerElement = container.ownerDocument.createElement('div');
    playerElement.id = 'player';
    container.appendChild(playerElement);
  }

  playerElement.setAttribute('style', 'position: absolute; top: 0; bottom: 0; left: 0; right: 0;')

  return playerElement
}



/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("37f3938ba2945385858a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5iZTEwZTYwYjY1MDIwMjJjOGNhNS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMscUJBQXFCO0FBQ25DO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxvRkFBb0YsR0FBRztBQUN2RjtBQUNBLHdFQUF3RSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCNkM7QUFDeEY7QUFDSjs7QUFFNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsWUFBWSxRQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsaUVBQWE7QUFDMUI7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsYUFBYSwrREFBVztBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxpQkFBaUI7QUFDN0I7QUFDQTtBQUNBLDJDQUEyQyxpREFBRztBQUM5Qzs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0Esd0JBQXdCLGtEQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBLDhCQUE4QiwrRUFBMkI7QUFDekQsd0JBQXdCLGlFQUFhO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsK0RBQVc7QUFDL0I7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxNQUFNO0FBQ3ZDLFNBQVMsNEVBQXdCO0FBQ2pDOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFlBQVksUUFBUTtBQUNwQjtBQUNBLDBCQUEwQiwrRUFBMkI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQyxNQUFNO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE1BQU07QUFDakIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsYUFBYSxTQUFTLE9BQU87QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJEQUEyRCxRQUFRLFdBQVcsU0FBUyxTQUFTOztBQUVoRztBQUNBOzs7Ozs7Ozs7O1VDaExBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL2NvbnN0YW50cy9pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdXRpbHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBERUJVRyA9IHtcbiAgZW5hYmxlZDogdHJ1ZSwgLy8gQWRkcyB0aGUgQ2xhc3MgaW5zdGFuY2UgdG8gdGhlIHdpbmRvdyBmb3IgZWFzaWVyIGRlYnVnZ2luZ1xuICB2ZXJib3NlOiBmYWxzZSAvLyBBbGxvd3MgbG9nZ2luZyBpbiBkZXRhaWxcbn1cblxuY29uc3QgREVGQVVMVF9QUk9QRVJUWV9WQUxVRVMgPSB7XG4gIGNvbnRhaW5lcjogJ2JvZHknLFxuICB1cmw6ICdodHRwczovL3lvdXR1LmJlL3hrRW1ZUXZKXzY4JyxcbiAgc291cmNlOiAneW91dHViZScsXG4gIGZpdE1vZGU6ICdmaWxsJyxcbiAgc2NhbGVGYWN0b3I6IDEsXG4gIHBsYXliYWNrU3BlZWQ6IDEsXG4gIGZpbHRlcjogMSxcbiAgZmlsdGVyU3RyZW5ndGg6IDUwLFxuICB0aW1lQ29kZTogeyBzdGFydDogMCwgZW5kOiBudWxsIH0sXG4gIERFQlVHXG59XG5cbmNvbnN0IFRJTUVPVVQgPSAyNTAwXG5cbmNvbnN0IFVOU1VQUE9SVEVEX1ZJREVPX1NPVVJDRSA9ICd1bnN1cHBvcnRlZCdcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZWxlc3MtZXNjYXBlXG5jb25zdCBZT1VUVUJFX1JFR0VYID0gL14uKih5b3V0dVxcLmJlXFwvfHZcXC98dVxcL1xcd1xcL3xlbWJlZFxcL3x3YXRjaFxcP3Y9fFxcJnY9KShbXiNcXCZcXD9dezExfSkuKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2VsZXNzLWVzY2FwZVxuY29uc3QgVklNRU9fUkVHRVggPSAvXi4qKHZpbWVvXFwuY29tXFwvKShjaGFubmVsc1xcL1thLXpBLVowLTldKlxcLyk/KFswLTldezcsfSgjdFxcPS4qcyk/KS9cblxuZXhwb3J0IHtcbiAgREVCVUcsXG4gIERFRkFVTFRfUFJPUEVSVFlfVkFMVUVTLFxuICBUSU1FT1VULFxuICBZT1VUVUJFX1JFR0VYLFxuICBVTlNVUFBPUlRFRF9WSURFT19TT1VSQ0UsXG4gIFZJTUVPX1JFR0VYXG59IiwiaW1wb3J0IHsgREVGQVVMVF9QUk9QRVJUWV9WQUxVRVMsIFVOU1VQUE9SVEVEX1ZJREVPX1NPVVJDRSwgWU9VVFVCRV9SRUdFWCwgVklNRU9fUkVHRVggfSBmcm9tICcuLi9jb25zdGFudHMvaW5zdGFuY2UuanMnXG5pbXBvcnQgcGFyc2VVcmwgZnJvbSAndXJsLXBhcnNlJ1xuaW1wb3J0IGdldCBmcm9tICdsb2Rhc2guZ2V0J1xuXG4vKipcbiAqIFRoZSBZb3VUdWJlIEFQSSBzZWVtaW5nbHkgZG9lcyBub3QgZXhwb3NlIHRoZSBhY3R1YWwgd2lkdGggYW5kIGhlaWdodCBkaW1lbnNpb25zXG4gKiBvZiB0aGUgdmlkZW8gaXRzZWxmLiBUaGUgdmlkZW8ncyBkaW1lbnNpb25zIGFuZCByYXRpbyBtYXkgYmUgY29tcGxldGVseSBkaWZmZXJlbnRcbiAqIHRoYW4gdGhlIElGUkFNRSdzLiBUaGlzIGhhY2sgZmluZHMgdGhvc2UgdmFsdWVzIGluc2lkZSBzb21lIHByaXZhdGUgb2JqZWN0cy5cbiAqIFNpbmNlIHRoaXMgaXMgbm90IHBhcnQgb2YgdGhlIHB1YmxpYyBBUEksIHRoZSBkaW1lbnNpb25zIHdpbGwgZmFsbCBiYWNrIHRvIHRoZVxuICogY29udGFpbmVyIHdpZHRoIGFuZCBoZWlnaHQgaW4gY2FzZSBZb3VUdWJlIGNoYW5nZXMgdGhlIGludGVybmFscyB1bmV4cGVjdGVkbHkuXG4gKlxuICogQG1ldGhvZCBnZXRZb3VUdWJlRGltZW5zaW9ucyBHZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHZpZGVvIGl0c2VsZlxuICogQHBhcmFtIHtPYmplY3R9IFBsYXllclxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgd2lkdGggYW5kIGhlaWdodCBhcyBpbnRlZ2VycyBvciB1bmRlZmluZWRcbiAqL1xuY29uc3QgZ2V0WW91VHViZURpbWVuc2lvbnMgPSBwbGF5ZXIgPT4ge1xuICBsZXQgd1xuICBsZXQgaFxuICBmb3IgKGxldCBwIGluIHBsYXllcikge1xuICAgIGxldCBwcm9wID0gcGxheWVyW3BdXG4gICAgaWYgKHR5cGVvZiBwcm9wID09PSAnb2JqZWN0JyAmJiBwcm9wLndpZHRoICYmIHByb3AuaGVpZ2h0KSB7XG4gICAgICB3ID0gcHJvcC53aWR0aFxuICAgICAgaCA9IHByb3AuaGVpZ2h0XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4geyB3LCBoIH1cbn1cblxuLyoqXG4gKiBAbWV0aG9kIGdldFZpbWVvRGltZW5zaW9ucyBHZXQgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHZpZGVvIGl0c2VsZlxuICogQHBhcmFtIHtPYmplY3R9IFBsYXllclxuICogQHJldHVybiB7T2JqZWN0fSBUaGUgd2lkdGggYW5kIGhlaWdodCBhcyBpbnRlZ2VycyBvciB1bmRlZmluZWRcbiAqL1xuY29uc3QgZ2V0VmltZW9EaW1lbnNpb25zID0gcGxheWVyID0+IHtcbiAgbGV0IHdcbiAgbGV0IGhcbiAgaWYgKHBsYXllci5kaW1lbnNpb25zKSB7XG4gICAgdyA9IHBsYXllci5kaW1lbnNpb25zLndpZHRoXG4gICAgaCA9IHBsYXllci5kaW1lbnNpb25zLmhlaWdodFxuICB9IGVsc2UgaWYgKHBsYXllci5pZnJhbWUpIHtcbiAgICB3ID0gcGxheWVyLmlmcmFtZS5jbGllbnRXaWR0aFxuICAgIGggPSBwbGF5ZXIuaWZyYW1lLmNsaWVudEhlaWdodFxuICB9XG4gIHJldHVybiB7IHcsIGggfVxufVxuXG5jb25zdCBwcm92aWRlclV0aWxzID0ge1xuICB5b3V0dWJlOiB7XG4gICAgcGFyc2VQYXRoOiAncXVlcnkudCcsXG4gICAgdGltZVJlZ2V4OiAvW2htc10vLFxuICAgIGlkUmVnZXg6IFlPVVRVQkVfUkVHRVgsXG4gICAgZ2V0RGltZW5zaW9uczogZ2V0WW91VHViZURpbWVuc2lvbnNcbiAgfSxcbiAgdmltZW86IHtcbiAgICBwYXJzZVBhdGg6IG51bGwsXG4gICAgdGltZVJlZ2V4OiAvWyN0PXNdLyxcbiAgICBpZFJlZ2V4OiBWSU1FT19SRUdFWCxcbiAgICBnZXREaW1lbnNpb25zOiBnZXRWaW1lb0RpbWVuc2lvbnNcbiAgfVxufVxuXG4vKipcbiAqIEBtZXRob2QgZ2V0VGltZVBhcmFtZXRlciBZb3VUdWJlIGFuZCBWaW1lbyBoYXZlIG9wdGlvbmFsIFVSTCBmb3JtYXRzIHRvIGFsbG93XG4gKiAgICBwbGF5YmFjayB0byBiZWdpbiBmcm9tIGEgY2VydGFpbiBwb2ludCBpbiB0aGUgdmlkZW8uXG4gKiBAcmV0dXJuIHtTdHJpbmcgb3IgZmFsc2V9IFRoZSBhcHByb3ByaWF0ZSB0aW1lIHBhcmFtZXRlciBvciBmYWxzZS5cbiAqL1xuY29uc3QgZ2V0VGltZVBhcmFtZXRlciA9IChwYXJzZWRVcmwsIHNvdXJjZSkgPT4ge1xuICByZXR1cm4gcHJvdmlkZXJVdGlsc1tzb3VyY2VdLnBhcnNlUGF0aCA/IGdldChwYXJzZWRVcmwsIHByb3ZpZGVyVXRpbHNbc291cmNlXS5wYXJzZVBhdGgpIDogbnVsbFxufVxuXG4vKipcbiAqIEBtZXRob2QgZ2V0U3RhcnRUaW1lIFBhcnNlIHRoZSBzdGFydCB0aW1lIGJhc2Ugb24gdGhlIFVSTCBmb3JtYXRzIG9mIFlvdVR1YmUgYW5kIFZpbWVvLlxuICogQHBhcmFtIHtTdHJpbmd9IFt1cmxdIFRoZSBVUkwgZm9yIHRoZSB2aWRlbywgaW5jbHVkaW5nIGFueSB0aW1lIGNvZGUgcGFyYW1ldGVycy5cbiAqIEByZXR1cm4ge051bWJlcn0gVGltZSBpbiBzZWNvbmRzXG4gKi9cbmNvbnN0IGdldFN0YXJ0VGltZSA9ICh1cmwsIHNvdXJjZSkgPT4ge1xuICBjb25zdCBwYXJzZWRVcmwgPSBuZXcgcGFyc2VVcmwodXJsLCB0cnVlKVxuICBsZXQgdGltZVBhcmFtID0gZ2V0VGltZVBhcmFtZXRlcihwYXJzZWRVcmwsIHNvdXJjZSlcbiAgaWYgKCF0aW1lUGFyYW0pIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IG1hdGNoID0gdGltZVBhcmFtLnNwbGl0KHByb3ZpZGVyVXRpbHNbc291cmNlXS50aW1lUmVnZXgpLmZpbHRlcihCb29sZWFuKVxuICBsZXQgcyA9IHBhcnNlSW50KG1hdGNoLnBvcCgpLCAxMCkgfHwgMFxuICBsZXQgbSA9IHBhcnNlSW50KG1hdGNoLnBvcCgpLCAxMCkgKiA2MCB8fCAwXG4gIGxldCBoID0gcGFyc2VJbnQobWF0Y2gucG9wKCksIDEwKSAqIDM2MDAgfHwgMFxuICByZXR1cm4gaCArIG0gKyBzXG59XG5cbi8qKlxuICogQG1ldGhvZCBnZXRWaWRlb1NvdXJjZSBEZXRlcm1pbmUgdGhlIHZpZGVvIHNvdXJjZSBmcm9tIHRoZSBVUkwgdmlhIHJlZ2V4LlxuICogQHBhcmFtIHtTdHJpbmd9IFt1cmxdIFRoZSBVUkwgZm9yIHRoZSB2aWRlb1xuICogQHJldHVybiB7U3RyaW5nfSBWaWRlbyBwcm92aWRlciBuYW1lXG4gKi9cbmNvbnN0IGdldFZpZGVvU291cmNlID0gKHVybCA9IERFRkFVTFRfUFJPUEVSVFlfVkFMVUVTLnVybCkgPT4ge1xuICBsZXQgbWF0Y2ggPSB1cmwubWF0Y2goWU9VVFVCRV9SRUdFWClcbiAgaWYgKG1hdGNoICYmIG1hdGNoWzJdLmxlbmd0aCkge1xuICAgIHJldHVybiAneW91dHViZSdcbiAgfVxuXG4gIG1hdGNoID0gdXJsLm1hdGNoKFZJTUVPX1JFR0VYKVxuICBpZiAobWF0Y2ggJiYgbWF0Y2hbM10ubGVuZ3RoKSB7XG4gICAgcmV0dXJuICd2aW1lbydcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYFZpZGVvIHNvdXJjZSAkeyB1cmwgfSBkb2VzIG5vdCBtYXRjaCBzdXBwb3J0ZWQgdHlwZXNgKVxuICByZXR1cm4gVU5TVVBQT1JURURfVklERU9fU09VUkNFXG59XG5cbi8qKlxuICogQG1ldGhvZCBnZXRWaWRlb0lkIEdldCB0aGUgdmlkZW8gSUQgZm9yIHVzZSBpbiB0aGUgcHJvdmlkZXIgQVBJcy5cbiAqIEBwYXJhbSB7U3RyaW5nfSBbdXJsXSBUaGUgVVJMIGZvciB0aGUgdmlkZW9cbiAqIEBwYXJhbSB7U3RyaW5nfSBbc291cmNlXSBWaWRlbyBwcm92aWRlciBuYW1lXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFZpZGVvIElEXG4gKi9cbmNvbnN0IGdldFZpZGVvSUQgPSAodXJsID0gREVGQVVMVF9QUk9QRVJUWV9WQUxVRVMudXJsLCBzb3VyY2UgPSBudWxsKSA9PiB7XG4gIGNvbnN0IHByb3ZpZGVyID0gcHJvdmlkZXJVdGlsc1tzb3VyY2VdO1xuICBsZXQgbWF0Y2ggPSBwcm92aWRlciAmJiB1cmwubWF0Y2gocHJvdmlkZXIuaWRSZWdleClcbiAgY29uc3QgaWQgPSBzb3VyY2UgPT09ICd2aW1lbycgPyBtYXRjaFszXSA6IG1hdGNoWzJdXG4gIGlmIChtYXRjaCAmJiBpZC5sZW5ndGgpIHtcbiAgICByZXR1cm4gaWRcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYFZpZGVvIGlkIGF0ICR7IHVybCB9IGlzIG5vdCB2YWxpZGApXG59XG5cbi8qKlxuICogQG1ldGhvZCB2YWxpZGF0ZWRJbWFnZSBFbnN1cmUgdGhlIGVsZW1lbnQgaXMgYW4gaW1hZ2VcbiAqIEBwYXJhbSB7Tm9kZX0gW2ltZ10gSW1hZ2UgZWxlbWVudFxuICogQHJldHVybiB7Tm9kZSBvciBmYWxzZX1cbiAqL1xuY29uc3QgdmFsaWRhdGVkSW1hZ2UgPSAoaW1nKSA9PiB7XG4gIGlmICghaW1nKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgbGV0IGlzVmFsaWQgPSBpbWcubm9kZU5hbWUgPT09ICdJTUcnID8gaW1nIDogZmFsc2U7XG4gIGlmICghaXNWYWxpZCkge1xuICAgIGNvbnNvbGUud2FybignRWxlbWVudCBpcyBub3QgYSB2YWxpZCBpbWFnZSBlbGVtZW50LicpO1xuICB9XG5cbiAgcmV0dXJuIGlzVmFsaWRcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGZpbmRQbGF5ZXJBc3BlY3RSYXRpbyBEZXRlcm1pbmUgdGhlIGFzcGVjdCByYXRpbyBvZiB0aGUgYWN0dWFsIHZpZGVvIGl0c2VsZixcbiAqICAgIHdoaWNoIG1heSBiZSBkaWZmZXJlbnQgdGhhbiB0aGUgSUZSQU1FIHJldHVybmVkIGJ5IHRoZSB2aWRlbyBwcm92aWRlci5cbiAqIEByZXR1cm4ge051bWJlcn0gQSByYXRpbyBvZiB3aWR0aCBkaXZpZGVkIGJ5IGhlaWdodC5cbiAqL1xuY29uc3QgZmluZFBsYXllckFzcGVjdFJhdGlvID0gKGNvbnRhaW5lciwgcGxheWVyLCB2aWRlb1NvdXJjZSkgPT4ge1xuICBsZXQgd1xuICBsZXQgaFxuICBpZiAocGxheWVyKSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IHByb3ZpZGVyVXRpbHNbdmlkZW9Tb3VyY2VdLmdldERpbWVuc2lvbnMocGxheWVyKVxuICAgIHcgPSBkaW1lbnNpb25zLndcbiAgICBoID0gZGltZW5zaW9ucy5oXG4gIH1cbiAgaWYgKCF3IHx8ICFoKSB7XG4gICAgdyA9IGNvbnRhaW5lci5jbGllbnRXaWR0aFxuICAgIGggPSBjb250YWluZXIuY2xpZW50SGVpZ2h0XG4gICAgY29uc29sZS53YXJuKGBObyB3aWR0aCBhbmQgaGVpZ2h0IGZvdW5kIGluICR7dmlkZW9Tb3VyY2V9IHBsYXllciAke3BsYXllcn0uIFVzaW5nIGNvbnRhaW5lciBkaW1lbnNpb25zLmApXG4gIH1cbiAgcmV0dXJuIHBhcnNlSW50KHcsIDEwKSAvIHBhcnNlSW50KGgsIDEwKVxufVxuXG5jb25zdCBnZXRQbGF5ZXJFbGVtZW50ID0gKGNvbnRhaW5lcikgPT4ge1xuICBsZXQgcGxheWVyRWxlbWVudCA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcjcGxheWVyJyk7XG4gIGlmICghcGxheWVyRWxlbWVudCkge1xuICAgIHBsYXllckVsZW1lbnQgPSBjb250YWluZXIub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBwbGF5ZXJFbGVtZW50LmlkID0gJ3BsYXllcic7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHBsYXllckVsZW1lbnQpO1xuICB9XG5cbiAgcGxheWVyRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBib3R0b206IDA7IGxlZnQ6IDA7IHJpZ2h0OiAwOycpXG5cbiAgcmV0dXJuIHBsYXllckVsZW1lbnRcbn1cblxuZXhwb3J0IHsgZmluZFBsYXllckFzcGVjdFJhdGlvLCBnZXRQbGF5ZXJFbGVtZW50LCBnZXRTdGFydFRpbWUsIGdldFZpZGVvSUQsIGdldFZpZGVvU291cmNlLCB2YWxpZGF0ZWRJbWFnZSB9IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMzdmMzkzOGJhMjk0NTM4NTg1OGFcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=