"use strict";
self["webpackHotUpdate_atmtfy_video_background"]("main",{

/***/ "./src/utils/youtube.js":
/*!******************************!*\
  !*** ./src/utils/youtube.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeYouTubeAPI": () => (/* binding */ initializeYouTubeAPI),
/* harmony export */   "initializeYouTubePlayer": () => (/* binding */ initializeYouTubePlayer)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");


/**
 * Set up the YouTube script include if it's not present
 */
const initializeYouTubeAPI = (win) => {
  return new Promise((resolve, reject) => {
    if (win.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded')) {
      resolve('already loaded');
      return;
    }

    const tag = win.document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = win.document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.addEventListener('load', (evt) => {
      evt.currentTarget.classList.add('loaded');
      resolve('api script tag created and loaded');
    }, true);
    tag.addEventListener('error', (evt) => {
      reject('Failed to load YouTube script: ', evt);
    });
  });
};

/**
 * YouTube event handler. Add the proper class to the player element, and set
 * player properties. All player methods via YouTube API.
 */
const onYouTubePlayerReady = (event, startTime) => {
  const player = event.target;
  console.log(player);
  player.iframe = player.getIframe();
  player.mute();
  player.ready = true;
  player.seekTo(startTime < player.getDuration() ? startTime : 0);
  player.playVideo();
};

/**
 * YouTube event handler. Determine whether or not to loop the video.
 */
const onYouTubePlayerStateChange = (event, startTime, win, speed = 1) => {
  const player = event.target;
  const duration = (player.getDuration() - startTime) / speed;

  const doLoop = () => {
    if ((player.getCurrentTime() + 0.1) >= player.getDuration()) {
      player.pauseVideo();
      player.seekTo(startTime);
      player.playVideo();
    }
    requestAnimationFrame(doLoop);
  };

  if (event.data === win.YT.PlayerState.BUFFERING &&
     (player.getVideoLoadedFraction() !== 1) &&
     (player.getCurrentTime() === 0 || player.getCurrentTime() > duration - -0.1)) {
    return 'buffering';
  } else if (event.data === win.YT.PlayerState.PLAYING) {
    requestAnimationFrame(doLoop);
    return 'playing';
  } else if (event.data === win.YT.PlayerState.ENDED) {
    player.playVideo();
  }
};

/**
 * Initialize the player and bind player events.
 */
const initializeYouTubePlayer = ({
  container, win, videoId, startTime, speed, readyCallback, stateChangeCallback
}) => {
  let playerElement = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getPlayerElement)(container)


  const makePlayer = () => {
    return new win.YT.Player(playerElement, {
      videoId: videoId,
      host: "https://www.youtube-nocookie.com",
      playerVars: {
        'autohide': 1,
        'autoplay': 0,
        'controls': 0,
        'enablejsapi': 1,
        'iv_load_policy': 3,
        'loop': 0,
        'modestbranding': 1,
        'playsinline': 1,
        'rel': 0,
        'showinfo': 0,
        'wmode': 'opaque',
        'origin': window.location.href
      },
      events: {
        onReady: function(event) {
          onYouTubePlayerReady(event, startTime);
          readyCallback(event.target);
        },
        onStateChange: function(event) {
          const state = onYouTubePlayerStateChange(event, startTime, win, speed);
          stateChangeCallback(state, state);
        }
      }
    });
  };

  return new Promise((resolve, reject) => {
    const checkAPILoaded = () => {
      if (win.YT.loaded === 1) {
        resolve(makePlayer());
      } else {
        setTimeout(checkAPILoaded, 100);
      }
    };

    checkAPILoaded();
  });
};



/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3d1c7264b74ef5f35117")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43OWZiMjZjMjcxNGU5MTE0NTQ5YS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Qsc0JBQXNCLDhEQUFnQjs7O0FBR3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7VUN2SEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdXRpbHMveW91dHViZS5qcyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFBsYXllckVsZW1lbnQgfSBmcm9tICcuLi91dGlscy91dGlscydcblxuLyoqXG4gKiBTZXQgdXAgdGhlIFlvdVR1YmUgc2NyaXB0IGluY2x1ZGUgaWYgaXQncyBub3QgcHJlc2VudFxuICovXG5jb25zdCBpbml0aWFsaXplWW91VHViZUFQSSA9ICh3aW4pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAod2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbc3JjKj1cInd3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCJdLmxvYWRlZCcpKSB7XG4gICAgICByZXNvbHZlKCdhbHJlYWR5IGxvYWRlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhZyA9IHdpbi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICB0YWcuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgIGNvbnN0IGZpcnN0U2NyaXB0VGFnID0gd2luLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldnQpID0+IHtcbiAgICAgIGV2dC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgICAgcmVzb2x2ZSgnYXBpIHNjcmlwdCB0YWcgY3JlYXRlZCBhbmQgbG9hZGVkJyk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2dCkgPT4ge1xuICAgICAgcmVqZWN0KCdGYWlsZWQgdG8gbG9hZCBZb3VUdWJlIHNjcmlwdDogJywgZXZ0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFlvdVR1YmUgZXZlbnQgaGFuZGxlci4gQWRkIHRoZSBwcm9wZXIgY2xhc3MgdG8gdGhlIHBsYXllciBlbGVtZW50LCBhbmQgc2V0XG4gKiBwbGF5ZXIgcHJvcGVydGllcy4gQWxsIHBsYXllciBtZXRob2RzIHZpYSBZb3VUdWJlIEFQSS5cbiAqL1xuY29uc3Qgb25Zb3VUdWJlUGxheWVyUmVhZHkgPSAoZXZlbnQsIHN0YXJ0VGltZSkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBldmVudC50YXJnZXQ7XG4gIGNvbnNvbGUubG9nKHBsYXllcik7XG4gIHBsYXllci5pZnJhbWUgPSBwbGF5ZXIuZ2V0SWZyYW1lKCk7XG4gIHBsYXllci5tdXRlKCk7XG4gIHBsYXllci5yZWFkeSA9IHRydWU7XG4gIHBsYXllci5zZWVrVG8oc3RhcnRUaW1lIDwgcGxheWVyLmdldER1cmF0aW9uKCkgPyBzdGFydFRpbWUgOiAwKTtcbiAgcGxheWVyLnBsYXlWaWRlbygpO1xufTtcblxuLyoqXG4gKiBZb3VUdWJlIGV2ZW50IGhhbmRsZXIuIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0byBsb29wIHRoZSB2aWRlby5cbiAqL1xuY29uc3Qgb25Zb3VUdWJlUGxheWVyU3RhdGVDaGFuZ2UgPSAoZXZlbnQsIHN0YXJ0VGltZSwgd2luLCBzcGVlZCA9IDEpID0+IHtcbiAgY29uc3QgcGxheWVyID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBkdXJhdGlvbiA9IChwbGF5ZXIuZ2V0RHVyYXRpb24oKSAtIHN0YXJ0VGltZSkgLyBzcGVlZDtcblxuICBjb25zdCBkb0xvb3AgPSAoKSA9PiB7XG4gICAgaWYgKChwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSArIDAuMSkgPj0gcGxheWVyLmdldER1cmF0aW9uKCkpIHtcbiAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICBwbGF5ZXIuc2Vla1RvKHN0YXJ0VGltZSk7XG4gICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb0xvb3ApO1xuICB9O1xuXG4gIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuQlVGRkVSSU5HICYmXG4gICAgIChwbGF5ZXIuZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpICE9PSAxKSAmJlxuICAgICAocGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPT09IDAgfHwgcGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPiBkdXJhdGlvbiAtIC0wLjEpKSB7XG4gICAgcmV0dXJuICdidWZmZXJpbmcnO1xuICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvTG9vcCk7XG4gICAgcmV0dXJuICdwbGF5aW5nJztcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuRU5ERUQpIHtcbiAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgcGxheWVyIGFuZCBiaW5kIHBsYXllciBldmVudHMuXG4gKi9cbmNvbnN0IGluaXRpYWxpemVZb3VUdWJlUGxheWVyID0gKHtcbiAgY29udGFpbmVyLCB3aW4sIHZpZGVvSWQsIHN0YXJ0VGltZSwgc3BlZWQsIHJlYWR5Q2FsbGJhY2ssIHN0YXRlQ2hhbmdlQ2FsbGJhY2tcbn0pID0+IHtcbiAgbGV0IHBsYXllckVsZW1lbnQgPSBnZXRQbGF5ZXJFbGVtZW50KGNvbnRhaW5lcilcblxuXG4gIGNvbnN0IG1ha2VQbGF5ZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyB3aW4uWVQuUGxheWVyKHBsYXllckVsZW1lbnQsIHtcbiAgICAgIHZpZGVvSWQ6IHZpZGVvSWQsXG4gICAgICBob3N0OiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tXCIsXG4gICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICdhdXRvaGlkZSc6IDEsXG4gICAgICAgICdhdXRvcGxheSc6IDAsXG4gICAgICAgICdjb250cm9scyc6IDAsXG4gICAgICAgICdlbmFibGVqc2FwaSc6IDEsXG4gICAgICAgICdpdl9sb2FkX3BvbGljeSc6IDMsXG4gICAgICAgICdsb29wJzogMCxcbiAgICAgICAgJ21vZGVzdGJyYW5kaW5nJzogMSxcbiAgICAgICAgJ3BsYXlzaW5saW5lJzogMSxcbiAgICAgICAgJ3JlbCc6IDAsXG4gICAgICAgICdzaG93aW5mbyc6IDAsXG4gICAgICAgICd3bW9kZSc6ICdvcGFxdWUnLFxuICAgICAgICAnb3JpZ2luJzogd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIH0sXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgb25SZWFkeTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBvbllvdVR1YmVQbGF5ZXJSZWFkeShldmVudCwgc3RhcnRUaW1lKTtcbiAgICAgICAgICByZWFkeUNhbGxiYWNrKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RhdGVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBvbllvdVR1YmVQbGF5ZXJTdGF0ZUNoYW5nZShldmVudCwgc3RhcnRUaW1lLCB3aW4sIHNwZWVkKTtcbiAgICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrKHN0YXRlLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrQVBJTG9hZGVkID0gKCkgPT4ge1xuICAgICAgaWYgKHdpbi5ZVC5sb2FkZWQgPT09IDEpIHtcbiAgICAgICAgcmVzb2x2ZShtYWtlUGxheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChjaGVja0FQSUxvYWRlZCwgMTAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tBUElMb2FkZWQoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBpbml0aWFsaXplWW91VHViZUFQSSxcbiAgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXJcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiM2QxYzcyNjRiNzRlZjVmMzUxMTdcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=