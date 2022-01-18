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
      console.log("Loaded youtube api")
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
/******/ 	__webpack_require__.h = () => ("2a058cb4e2ca6b97172c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5kNWNlYzI2MzNjMmE4MTc1YTdjZi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxzQkFBc0IsOERBQWdCOzs7QUFHdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7VUN6SEEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvLi9zcmMvdXRpbHMveW91dHViZS5qcyIsIndlYnBhY2s6Ly9AYXRtdGZ5L3ZpZGVvLWJhY2tncm91bmQvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFBsYXllckVsZW1lbnQgfSBmcm9tICcuLi91dGlscy91dGlscydcblxuLyoqXG4gKiBTZXQgdXAgdGhlIFlvdVR1YmUgc2NyaXB0IGluY2x1ZGUgaWYgaXQncyBub3QgcHJlc2VudFxuICovXG5jb25zdCBpbml0aWFsaXplWW91VHViZUFQSSA9ICh3aW4pID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBpZiAod2luLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbc3JjKj1cInd3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCJdLmxvYWRlZCcpKSB7XG4gICAgICByZXNvbHZlKCdhbHJlYWR5IGxvYWRlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRhZyA9IHdpbi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICB0YWcuc3JjID0gJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGknO1xuICAgIGNvbnN0IGZpcnN0U2NyaXB0VGFnID0gd2luLmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0YWcsIGZpcnN0U2NyaXB0VGFnKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGVkIHlvdXR1YmUgYXBpXCIpXG4gICAgICBldnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcbiAgICAgIHJlc29sdmUoJ2FwaSBzY3JpcHQgdGFnIGNyZWF0ZWQgYW5kIGxvYWRlZCcpO1xuICAgIH0sIHRydWUpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldnQpID0+IHtcbiAgICAgIHJlamVjdCgnRmFpbGVkIHRvIGxvYWQgWW91VHViZSBzY3JpcHQ6ICcsIGV2dCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBZb3VUdWJlIGV2ZW50IGhhbmRsZXIuIEFkZCB0aGUgcHJvcGVyIGNsYXNzIHRvIHRoZSBwbGF5ZXIgZWxlbWVudCwgYW5kIHNldFxuICogcGxheWVyIHByb3BlcnRpZXMuIEFsbCBwbGF5ZXIgbWV0aG9kcyB2aWEgWW91VHViZSBBUEkuXG4gKi9cbmNvbnN0IG9uWW91VHViZVBsYXllclJlYWR5ID0gKGV2ZW50LCBzdGFydFRpbWUpID0+IHtcbiAgY29uc3QgcGxheWVyID0gZXZlbnQudGFyZ2V0O1xuICBwbGF5ZXIuaWZyYW1lID0gcGxheWVyLmdldElmcmFtZSgpO1xuICBwbGF5ZXIubXV0ZSgpO1xuICBwbGF5ZXIucmVhZHkgPSB0cnVlO1xuICBwbGF5ZXIuc2Vla1RvKHN0YXJ0VGltZSA8IHBsYXllci5nZXREdXJhdGlvbigpID8gc3RhcnRUaW1lIDogMCk7XG4gIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgLy8gY29uc29sZS5sb2cocGxheWVyLnBsYXlWaWRlbygpKVxufTtcblxuLyoqXG4gKiBZb3VUdWJlIGV2ZW50IGhhbmRsZXIuIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0byBsb29wIHRoZSB2aWRlby5cbiAqL1xuY29uc3Qgb25Zb3VUdWJlUGxheWVyU3RhdGVDaGFuZ2UgPSAoZXZlbnQsIHN0YXJ0VGltZSwgd2luLCBzcGVlZCA9IDEpID0+IHtcbiAgY29uc3QgcGxheWVyID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBkdXJhdGlvbiA9IChwbGF5ZXIuZ2V0RHVyYXRpb24oKSAtIHN0YXJ0VGltZSkgLyBzcGVlZDtcblxuICBjb25zdCBkb0xvb3AgPSAoKSA9PiB7XG4gICAgaWYgKChwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSArIDAuMSkgPj0gcGxheWVyLmdldER1cmF0aW9uKCkpIHtcbiAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICBwbGF5ZXIuc2Vla1RvKHN0YXJ0VGltZSk7XG4gICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb0xvb3ApO1xuICB9O1xuXG4gIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuQlVGRkVSSU5HICYmXG4gICAgIChwbGF5ZXIuZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpICE9PSAxKSAmJlxuICAgICAocGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPT09IDAgfHwgcGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPiBkdXJhdGlvbiAtIC0wLjEpKSB7XG4gICAgcmV0dXJuICdidWZmZXJpbmcnO1xuICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvTG9vcCk7XG4gICAgcmV0dXJuICdwbGF5aW5nJztcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuRU5ERUQpIHtcbiAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgcGxheWVyIGFuZCBiaW5kIHBsYXllciBldmVudHMuXG4gKi9cbmNvbnN0IGluaXRpYWxpemVZb3VUdWJlUGxheWVyID0gKHtcbiAgY29udGFpbmVyLCB3aW4sIHZpZGVvSWQsIHN0YXJ0VGltZSwgc3BlZWQsIHJlYWR5Q2FsbGJhY2ssIHN0YXRlQ2hhbmdlQ2FsbGJhY2tcbn0pID0+IHtcbiAgbGV0IHBsYXllckVsZW1lbnQgPSBnZXRQbGF5ZXJFbGVtZW50KGNvbnRhaW5lcilcblxuXG4gIGNvbnN0IG1ha2VQbGF5ZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyB3aW4uWVQuUGxheWVyKHBsYXllckVsZW1lbnQsIHtcbiAgICAgIHZpZGVvSWQ6IHZpZGVvSWQsXG4gICAgICBob3N0OiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tXCIsXG4gICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICdhdXRvaGlkZSc6IDEsXG4gICAgICAgICdhdXRvcGxheSc6IDEsXG4gICAgICAgICdjb250cm9scyc6IDAsXG4gICAgICAgICdlbmFibGVqc2FwaSc6IDEsXG4gICAgICAgICdpdl9sb2FkX3BvbGljeSc6IDMsXG4gICAgICAgICdsb29wJzogMCxcbiAgICAgICAgJ21vZGVzdGJyYW5kaW5nJzogMSxcbiAgICAgICAgJ3BsYXlzaW5saW5lJzogMSxcbiAgICAgICAgJ3JlbCc6IDAsXG4gICAgICAgICdzaG93aW5mbyc6IDAsXG4gICAgICAgICd3bW9kZSc6ICdvcGFxdWUnLFxuICAgICAgICAnb3JpZ2luJzogd2luZG93LmxvY2F0aW9uLmhyZWZcbiAgICAgIH0sXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgb25SZWFkeTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICByZWFkeUNhbGxiYWNrKGV2ZW50LnRhcmdldCk7XG4gICAgICAgICAgb25Zb3VUdWJlUGxheWVyUmVhZHkoZXZlbnQsIHN0YXJ0VGltZSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RhdGVDaGFuZ2U6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBvbllvdVR1YmVQbGF5ZXJTdGF0ZUNoYW5nZShldmVudCwgc3RhcnRUaW1lLCB3aW4sIHNwZWVkKTtcblxuICAgICAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2soc3RhdGUsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgY2hlY2tBUElMb2FkZWQgPSAoKSA9PiB7XG4gICAgICBpZiAod2luLllULmxvYWRlZCA9PT0gMSkge1xuICAgICAgICByZXNvbHZlKG1ha2VQbGF5ZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQVBJTG9hZGVkLCAxMDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjaGVja0FQSUxvYWRlZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIGluaXRpYWxpemVZb3VUdWJlQVBJLFxuICBpbml0aWFsaXplWW91VHViZVBsYXllclxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIyYTA1OGNiNGUyY2E2Yjk3MTcyY1wiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==