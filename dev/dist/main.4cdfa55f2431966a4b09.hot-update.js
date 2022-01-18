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
      console.log("Loaded api");
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
  player.iframe = player.getIframe();
  player.mute();
  player.ready = true;
  player.seekTo(startTime < player.getDuration() ? startTime : 0);
  player.playVideo();
  // console.log(player.playVideo())
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
        'autoplay': 1,
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
          readyCallback(event.target);
          onYouTubePlayerReady(event, startTime);
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
/******/ 	__webpack_require__.h = () => ("4d47e0760e40542516a3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40Y2RmYTU1ZjI0MzE5NjZhNGIwOS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxzQkFBc0IsOERBQWdCOzs7QUFHdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7VUN6SEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdXRpbHMveW91dHViZS5qcyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFBsYXllckVsZW1lbnQgfSBmcm9tICcuLi91dGlscy91dGlscydcblxuLyoqXG4gKiBTZXQgdXAgdGhlIFlvdVR1YmUgc2NyaXB0IGluY2x1ZGUgaWYgaXQncyBub3QgcHJlc2VudFxuICovXG5jb25zdCBpbml0aWFsaXplWW91VHViZUFQSSA9ICh3aW4pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAod2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbc3JjKj1cInd3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCJdLmxvYWRlZCcpKSB7XG4gICAgICByZXNvbHZlKCdhbHJlYWR5IGxvYWRlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhZyA9IHdpbi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICB0YWcuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgIGNvbnN0IGZpcnN0U2NyaXB0VGFnID0gd2luLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldnQpID0+IHtcbiAgICAgIGV2dC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpO1xuICAgICAgY29uc29sZS5sb2coXCJMb2FkZWQgYXBpXCIpO1xuICAgICAgcmVzb2x2ZSgnYXBpIHNjcmlwdCB0YWcgY3JlYXRlZCBhbmQgbG9hZGVkJyk7XG4gICAgfSwgdHJ1ZSk7XG4gICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgKGV2dCkgPT4ge1xuICAgICAgcmVqZWN0KCdGYWlsZWQgdG8gbG9hZCBZb3VUdWJlIHNjcmlwdDogJywgZXZ0KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFlvdVR1YmUgZXZlbnQgaGFuZGxlci4gQWRkIHRoZSBwcm9wZXIgY2xhc3MgdG8gdGhlIHBsYXllciBlbGVtZW50LCBhbmQgc2V0XG4gKiBwbGF5ZXIgcHJvcGVydGllcy4gQWxsIHBsYXllciBtZXRob2RzIHZpYSBZb3VUdWJlIEFQSS5cbiAqL1xuY29uc3Qgb25Zb3VUdWJlUGxheWVyUmVhZHkgPSAoZXZlbnQsIHN0YXJ0VGltZSkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBldmVudC50YXJnZXQ7XG4gIHBsYXllci5pZnJhbWUgPSBwbGF5ZXIuZ2V0SWZyYW1lKCk7XG4gIHBsYXllci5tdXRlKCk7XG4gIHBsYXllci5yZWFkeSA9IHRydWU7XG4gIHBsYXllci5zZWVrVG8oc3RhcnRUaW1lIDwgcGxheWVyLmdldER1cmF0aW9uKCkgPyBzdGFydFRpbWUgOiAwKTtcbiAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIucGxheVZpZGVvKCkpXG59O1xuXG4vKipcbiAqIFlvdVR1YmUgZXZlbnQgaGFuZGxlci4gRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIGxvb3AgdGhlIHZpZGVvLlxuICovXG5jb25zdCBvbllvdVR1YmVQbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCwgc3RhcnRUaW1lLCB3aW4sIHNwZWVkID0gMSkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IGR1cmF0aW9uID0gKHBsYXllci5nZXREdXJhdGlvbigpIC0gc3RhcnRUaW1lKSAvIHNwZWVkO1xuXG4gIGNvbnN0IGRvTG9vcCA9ICgpID0+IHtcbiAgICBpZiAoKHBsYXllci5nZXRDdXJyZW50VGltZSgpICsgMC4xKSA+PSBwbGF5ZXIuZ2V0RHVyYXRpb24oKSkge1xuICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgIHBsYXllci5zZWVrVG8oc3RhcnRUaW1lKTtcbiAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvTG9vcCk7XG4gIH07XG5cbiAgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5CVUZGRVJJTkcgJiZcbiAgICAgKHBsYXllci5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCkgIT09IDEpICYmXG4gICAgIChwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA9PT0gMCB8fCBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA+IGR1cmF0aW9uIC0gLTAuMSkpIHtcbiAgICByZXR1cm4gJ2J1ZmZlcmluZyc7XG4gIH0gZWxzZSBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9Mb29wKTtcbiAgICByZXR1cm4gJ3BsYXlpbmcnO1xuICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5FTkRFRCkge1xuICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBwbGF5ZXIgYW5kIGJpbmQgcGxheWVyIGV2ZW50cy5cbiAqL1xuY29uc3QgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXIgPSAoe1xuICBjb250YWluZXIsIHdpbiwgdmlkZW9JZCwgc3RhcnRUaW1lLCBzcGVlZCwgcmVhZHlDYWxsYmFjaywgc3RhdGVDaGFuZ2VDYWxsYmFja1xufSkgPT4ge1xuICBsZXQgcGxheWVyRWxlbWVudCA9IGdldFBsYXllckVsZW1lbnQoY29udGFpbmVyKVxuXG5cbiAgY29uc3QgbWFrZVBsYXllciA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IHdpbi5ZVC5QbGF5ZXIocGxheWVyRWxlbWVudCwge1xuICAgICAgdmlkZW9JZDogdmlkZW9JZCxcbiAgICAgIGhvc3Q6IFwiaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb21cIixcbiAgICAgIHBsYXllclZhcnM6IHtcbiAgICAgICAgJ2F1dG9oaWRlJzogMSxcbiAgICAgICAgJ2F1dG9wbGF5JzogMSxcbiAgICAgICAgJ2NvbnRyb2xzJzogMCxcbiAgICAgICAgJ2VuYWJsZWpzYXBpJzogMSxcbiAgICAgICAgJ2l2X2xvYWRfcG9saWN5JzogMyxcbiAgICAgICAgJ2xvb3AnOiAwLFxuICAgICAgICAnbW9kZXN0YnJhbmRpbmcnOiAxLFxuICAgICAgICAncGxheXNpbmxpbmUnOiAxLFxuICAgICAgICAncmVsJzogMCxcbiAgICAgICAgJ3Nob3dpbmZvJzogMCxcbiAgICAgICAgJ3dtb2RlJzogJ29wYXF1ZScsXG4gICAgICAgICdvcmlnaW4nOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgfSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBvblJlYWR5OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHJlYWR5Q2FsbGJhY2soZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICBvbllvdVR1YmVQbGF5ZXJSZWFkeShldmVudCwgc3RhcnRUaW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IG9uWW91VHViZVBsYXllclN0YXRlQ2hhbmdlKGV2ZW50LCBzdGFydFRpbWUsIHdpbiwgc3BlZWQpO1xuXG4gICAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjayhzdGF0ZSwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjaGVja0FQSUxvYWRlZCA9ICgpID0+IHtcbiAgICAgIGlmICh3aW4uWVQubG9hZGVkID09PSAxKSB7XG4gICAgICAgIHJlc29sdmUobWFrZVBsYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2hlY2tBUElMb2FkZWQsIDEwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrQVBJTG9hZGVkKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHtcbiAgaW5pdGlhbGl6ZVlvdVR1YmVBUEksXG4gIGluaXRpYWxpemVZb3VUdWJlUGxheWVyXG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjRkNDdlMDc2MGU0MDU0MjUxNmEzXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9