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
  player.iframe = player.getIframe();
  // player.mute();
  player.ready = true;
  player.seekTo(startTime < player.getDuration() ? startTime : 0);
  player.playVideo();
  // console.log(player.playVideo())
};

/**
 * YouTube event handler. Determine whether or not to loop the video.
 */
const onYouTubePlayerStateChange = (event, startTime, win, speed = 1) => {
  console.log(event);
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
        autohide: 1,
        autoplay: 1,
        controls: 0,
        enablejsapi: 1,
        iv_load_policy: 3,
        loop: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        wmode: "opaque",
        origin: "https://www.youtube-nocookie.com",
      },
      events: {
        onReady: function (event) {
          readyCallback(event.target);
          onYouTubePlayerReady(event, startTime);
        },
        onStateChange: function (event) {
          const state = onYouTubePlayerStateChange(
            event,
            startTime,
            win,
            speed
          );

          stateChangeCallback(state, state);
        },
      },
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
/******/ 	__webpack_require__.h = () => ("7f9610862eea4da83312")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43YWNhODI1YTJhMGM5Yjc2OTU4MS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxzQkFBc0IsOERBQWdCOzs7QUFHdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7OztVQzlIQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy91dGlscy95b3V0dWJlLmpzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UGxheWVyRWxlbWVudCB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJ1xuXG4vKipcbiAqIFNldCB1cCB0aGUgWW91VHViZSBzY3JpcHQgaW5jbHVkZSBpZiBpdCdzIG5vdCBwcmVzZW50XG4gKi9cbmNvbnN0IGluaXRpYWxpemVZb3VUdWJlQVBJID0gKHdpbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtzcmMqPVwid3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIl0ubG9hZGVkJykpIHtcbiAgICAgIHJlc29sdmUoJ2FscmVhZHkgbG9hZGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFnID0gd2luLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgY29uc3QgZmlyc3RTY3JpcHRUYWcgPSB3aW4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG4gICAgICByZXNvbHZlKCdhcGkgc2NyaXB0IHRhZyBjcmVhdGVkIGFuZCBsb2FkZWQnKTtcbiAgICB9LCB0cnVlKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXZ0KSA9PiB7XG4gICAgICByZWplY3QoJ0ZhaWxlZCB0byBsb2FkIFlvdVR1YmUgc2NyaXB0OiAnLCBldnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogWW91VHViZSBldmVudCBoYW5kbGVyLiBBZGQgdGhlIHByb3BlciBjbGFzcyB0byB0aGUgcGxheWVyIGVsZW1lbnQsIGFuZCBzZXRcbiAqIHBsYXllciBwcm9wZXJ0aWVzLiBBbGwgcGxheWVyIG1ldGhvZHMgdmlhIFlvdVR1YmUgQVBJLlxuICovXG5jb25zdCBvbllvdVR1YmVQbGF5ZXJSZWFkeSA9IChldmVudCwgc3RhcnRUaW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IGV2ZW50LnRhcmdldDtcbiAgcGxheWVyLmlmcmFtZSA9IHBsYXllci5nZXRJZnJhbWUoKTtcbiAgLy8gcGxheWVyLm11dGUoKTtcbiAgcGxheWVyLnJlYWR5ID0gdHJ1ZTtcbiAgcGxheWVyLnNlZWtUbyhzdGFydFRpbWUgPCBwbGF5ZXIuZ2V0RHVyYXRpb24oKSA/IHN0YXJ0VGltZSA6IDApO1xuICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gIC8vIGNvbnNvbGUubG9nKHBsYXllci5wbGF5VmlkZW8oKSlcbn07XG5cbi8qKlxuICogWW91VHViZSBldmVudCBoYW5kbGVyLiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gbG9vcCB0aGUgdmlkZW8uXG4gKi9cbmNvbnN0IG9uWW91VHViZVBsYXllclN0YXRlQ2hhbmdlID0gKGV2ZW50LCBzdGFydFRpbWUsIHdpbiwgc3BlZWQgPSAxKSA9PiB7XG4gIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgY29uc3QgcGxheWVyID0gZXZlbnQudGFyZ2V0O1xuICBjb25zdCBkdXJhdGlvbiA9IChwbGF5ZXIuZ2V0RHVyYXRpb24oKSAtIHN0YXJ0VGltZSkgLyBzcGVlZDtcblxuICBjb25zdCBkb0xvb3AgPSAoKSA9PiB7XG4gICAgaWYgKChwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSArIDAuMSkgPj0gcGxheWVyLmdldER1cmF0aW9uKCkpIHtcbiAgICAgIHBsYXllci5wYXVzZVZpZGVvKCk7XG4gICAgICBwbGF5ZXIuc2Vla1RvKHN0YXJ0VGltZSk7XG4gICAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb0xvb3ApO1xuICB9O1xuXG4gIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuQlVGRkVSSU5HICYmXG4gICAgIChwbGF5ZXIuZ2V0VmlkZW9Mb2FkZWRGcmFjdGlvbigpICE9PSAxKSAmJlxuICAgICAocGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPT09IDAgfHwgcGxheWVyLmdldEN1cnJlbnRUaW1lKCkgPiBkdXJhdGlvbiAtIC0wLjEpKSB7XG4gICAgcmV0dXJuICdidWZmZXJpbmcnO1xuICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5QTEFZSU5HKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvTG9vcCk7XG4gICAgcmV0dXJuICdwbGF5aW5nJztcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuRU5ERUQpIHtcbiAgICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gIH1cbn07XG5cbi8qKlxuICogSW5pdGlhbGl6ZSB0aGUgcGxheWVyIGFuZCBiaW5kIHBsYXllciBldmVudHMuXG4gKi9cbmNvbnN0IGluaXRpYWxpemVZb3VUdWJlUGxheWVyID0gKHtcbiAgY29udGFpbmVyLCB3aW4sIHZpZGVvSWQsIHN0YXJ0VGltZSwgc3BlZWQsIHJlYWR5Q2FsbGJhY2ssIHN0YXRlQ2hhbmdlQ2FsbGJhY2tcbn0pID0+IHtcbiAgbGV0IHBsYXllckVsZW1lbnQgPSBnZXRQbGF5ZXJFbGVtZW50KGNvbnRhaW5lcilcblxuXG4gIGNvbnN0IG1ha2VQbGF5ZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyB3aW4uWVQuUGxheWVyKHBsYXllckVsZW1lbnQsIHtcbiAgICAgIHZpZGVvSWQ6IHZpZGVvSWQsXG4gICAgICBob3N0OiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tXCIsXG4gICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgIGF1dG9oaWRlOiAxLFxuICAgICAgICBhdXRvcGxheTogMSxcbiAgICAgICAgY29udHJvbHM6IDAsXG4gICAgICAgIGVuYWJsZWpzYXBpOiAxLFxuICAgICAgICBpdl9sb2FkX3BvbGljeTogMyxcbiAgICAgICAgbG9vcDogMCxcbiAgICAgICAgbW9kZXN0YnJhbmRpbmc6IDEsXG4gICAgICAgIHBsYXlzaW5saW5lOiAxLFxuICAgICAgICByZWw6IDAsXG4gICAgICAgIHNob3dpbmZvOiAwLFxuICAgICAgICB3bW9kZTogXCJvcGFxdWVcIixcbiAgICAgICAgb3JpZ2luOiBcImh0dHBzOi8vd3d3LnlvdXR1YmUtbm9jb29raWUuY29tXCIsXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJlYWR5Q2FsbGJhY2soZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICBvbllvdVR1YmVQbGF5ZXJSZWFkeShldmVudCwgc3RhcnRUaW1lKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSBvbllvdVR1YmVQbGF5ZXJTdGF0ZUNoYW5nZShcbiAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgc3RhcnRUaW1lLFxuICAgICAgICAgICAgd2luLFxuICAgICAgICAgICAgc3BlZWRcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjayhzdGF0ZSwgc3RhdGUpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrQVBJTG9hZGVkID0gKCkgPT4ge1xuICAgICAgaWYgKHdpbi5ZVC5sb2FkZWQgPT09IDEpIHtcbiAgICAgICAgcmVzb2x2ZShtYWtlUGxheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChjaGVja0FQSUxvYWRlZCwgMTAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tBUElMb2FkZWQoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBpbml0aWFsaXplWW91VHViZUFQSSxcbiAgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXJcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiN2Y5NjEwODYyZWVhNGRhODMzMTJcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=