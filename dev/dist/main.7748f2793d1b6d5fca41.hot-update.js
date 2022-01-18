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
      evt.currentTarget.classList.add("loaded");

      resolve("api script tag created and loaded");
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
/******/ 	__webpack_require__.h = () => ("4cdfa55f2431966a4b09")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi43NzQ4ZjI3OTNkMWI2ZDVmY2E0MS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHNCQUFzQiw4REFBZ0I7OztBQUd0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7OztVQ3pIQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy91dGlscy95b3V0dWJlLmpzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UGxheWVyRWxlbWVudCB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJ1xuXG4vKipcbiAqIFNldCB1cCB0aGUgWW91VHViZSBzY3JpcHQgaW5jbHVkZSBpZiBpdCdzIG5vdCBwcmVzZW50XG4gKi9cbmNvbnN0IGluaXRpYWxpemVZb3VUdWJlQVBJID0gKHdpbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtzcmMqPVwid3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIl0ubG9hZGVkJykpIHtcbiAgICAgIHJlc29sdmUoJ2FscmVhZHkgbG9hZGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFnID0gd2luLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgY29uc3QgZmlyc3RTY3JpcHRUYWcgPSB3aW4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZChcImxvYWRlZFwiKTtcblxuICAgICAgcmVzb2x2ZShcImFwaSBzY3JpcHQgdGFnIGNyZWF0ZWQgYW5kIGxvYWRlZFwiKTtcbiAgICB9LCB0cnVlKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXZ0KSA9PiB7XG4gICAgICByZWplY3QoJ0ZhaWxlZCB0byBsb2FkIFlvdVR1YmUgc2NyaXB0OiAnLCBldnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogWW91VHViZSBldmVudCBoYW5kbGVyLiBBZGQgdGhlIHByb3BlciBjbGFzcyB0byB0aGUgcGxheWVyIGVsZW1lbnQsIGFuZCBzZXRcbiAqIHBsYXllciBwcm9wZXJ0aWVzLiBBbGwgcGxheWVyIG1ldGhvZHMgdmlhIFlvdVR1YmUgQVBJLlxuICovXG5jb25zdCBvbllvdVR1YmVQbGF5ZXJSZWFkeSA9IChldmVudCwgc3RhcnRUaW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IGV2ZW50LnRhcmdldDtcbiAgcGxheWVyLmlmcmFtZSA9IHBsYXllci5nZXRJZnJhbWUoKTtcbiAgcGxheWVyLm11dGUoKTtcbiAgcGxheWVyLnJlYWR5ID0gdHJ1ZTtcbiAgcGxheWVyLnNlZWtUbyhzdGFydFRpbWUgPCBwbGF5ZXIuZ2V0RHVyYXRpb24oKSA/IHN0YXJ0VGltZSA6IDApO1xuICBwbGF5ZXIucGxheVZpZGVvKCk7XG4gIC8vIGNvbnNvbGUubG9nKHBsYXllci5wbGF5VmlkZW8oKSlcbn07XG5cbi8qKlxuICogWW91VHViZSBldmVudCBoYW5kbGVyLiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gbG9vcCB0aGUgdmlkZW8uXG4gKi9cbmNvbnN0IG9uWW91VHViZVBsYXllclN0YXRlQ2hhbmdlID0gKGV2ZW50LCBzdGFydFRpbWUsIHdpbiwgc3BlZWQgPSAxKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgZHVyYXRpb24gPSAocGxheWVyLmdldER1cmF0aW9uKCkgLSBzdGFydFRpbWUpIC8gc3BlZWQ7XG5cbiAgY29uc3QgZG9Mb29wID0gKCkgPT4ge1xuICAgIGlmICgocGxheWVyLmdldEN1cnJlbnRUaW1lKCkgKyAwLjEpID49IHBsYXllci5nZXREdXJhdGlvbigpKSB7XG4gICAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xuICAgICAgcGxheWVyLnNlZWtUbyhzdGFydFRpbWUpO1xuICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9Mb29wKTtcbiAgfTtcblxuICBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLkJVRkZFUklORyAmJlxuICAgICAocGxheWVyLmdldFZpZGVvTG9hZGVkRnJhY3Rpb24oKSAhPT0gMSkgJiZcbiAgICAgKHBsYXllci5nZXRDdXJyZW50VGltZSgpID09PSAwIHx8IHBsYXllci5nZXRDdXJyZW50VGltZSgpID4gZHVyYXRpb24gLSAtMC4xKSkge1xuICAgIHJldHVybiAnYnVmZmVyaW5nJztcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuUExBWUlORykge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb0xvb3ApO1xuICAgIHJldHVybiAncGxheWluZyc7XG4gIH0gZWxzZSBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLkVOREVEKSB7XG4gICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICB9XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIHBsYXllciBhbmQgYmluZCBwbGF5ZXIgZXZlbnRzLlxuICovXG5jb25zdCBpbml0aWFsaXplWW91VHViZVBsYXllciA9ICh7XG4gIGNvbnRhaW5lciwgd2luLCB2aWRlb0lkLCBzdGFydFRpbWUsIHNwZWVkLCByZWFkeUNhbGxiYWNrLCBzdGF0ZUNoYW5nZUNhbGxiYWNrXG59KSA9PiB7XG4gIGxldCBwbGF5ZXJFbGVtZW50ID0gZ2V0UGxheWVyRWxlbWVudChjb250YWluZXIpXG5cblxuICBjb25zdCBtYWtlUGxheWVyID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgd2luLllULlBsYXllcihwbGF5ZXJFbGVtZW50LCB7XG4gICAgICB2aWRlb0lkOiB2aWRlb0lkLFxuICAgICAgaG9zdDogXCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbVwiLFxuICAgICAgcGxheWVyVmFyczoge1xuICAgICAgICAnYXV0b2hpZGUnOiAxLFxuICAgICAgICAnYXV0b3BsYXknOiAxLFxuICAgICAgICAnY29udHJvbHMnOiAwLFxuICAgICAgICAnZW5hYmxlanNhcGknOiAxLFxuICAgICAgICAnaXZfbG9hZF9wb2xpY3knOiAzLFxuICAgICAgICAnbG9vcCc6IDAsXG4gICAgICAgICdtb2Rlc3RicmFuZGluZyc6IDEsXG4gICAgICAgICdwbGF5c2lubGluZSc6IDEsXG4gICAgICAgICdyZWwnOiAwLFxuICAgICAgICAnc2hvd2luZm8nOiAwLFxuICAgICAgICAnd21vZGUnOiAnb3BhcXVlJyxcbiAgICAgICAgJ29yaWdpbic6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgcmVhZHlDYWxsYmFjayhldmVudC50YXJnZXQpO1xuICAgICAgICAgIG9uWW91VHViZVBsYXllclJlYWR5KGV2ZW50LCBzdGFydFRpbWUpO1xuICAgICAgICB9LFxuICAgICAgICBvblN0YXRlQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gb25Zb3VUdWJlUGxheWVyU3RhdGVDaGFuZ2UoZXZlbnQsIHN0YXJ0VGltZSwgd2luLCBzcGVlZCk7XG5cbiAgICAgICAgICBzdGF0ZUNoYW5nZUNhbGxiYWNrKHN0YXRlLCBzdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGNvbnN0IGNoZWNrQVBJTG9hZGVkID0gKCkgPT4ge1xuICAgICAgaWYgKHdpbi5ZVC5sb2FkZWQgPT09IDEpIHtcbiAgICAgICAgcmVzb2x2ZShtYWtlUGxheWVyKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0VGltZW91dChjaGVja0FQSUxvYWRlZCwgMTAwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tBUElMb2FkZWQoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBpbml0aWFsaXplWW91VHViZUFQSSxcbiAgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXJcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiNGNkZmE1NWYyNDMxOTY2YTRiMDlcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=