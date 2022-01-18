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
/******/ 	__webpack_require__.h = () => ("7f01d5fc8636aeeb0eb9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi42ZTUyNzlmMzMyNDY5OTcyY2RkZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHNCQUFzQiw4REFBZ0I7OztBQUd0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7O1VDdEhBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3V0aWxzL3lvdXR1YmUuanMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRQbGF5ZXJFbGVtZW50IH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnXG5cbi8qKlxuICogU2V0IHVwIHRoZSBZb3VUdWJlIHNjcmlwdCBpbmNsdWRlIGlmIGl0J3Mgbm90IHByZXNlbnRcbiAqL1xuY29uc3QgaW5pdGlhbGl6ZVlvdVR1YmVBUEkgPSAod2luKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYyo9XCJ3d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiXS5sb2FkZWQnKSkge1xuICAgICAgcmVzb2x2ZSgnYWxyZWFkeSBsb2FkZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YWcgPSB3aW4uZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgdGFnLnNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpJztcbiAgICBjb25zdCBmaXJzdFNjcmlwdFRhZyA9IHdpbi5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG4gICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBldnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcbiAgICAgIHJlc29sdmUoJ2FwaSBzY3JpcHQgdGFnIGNyZWF0ZWQgYW5kIGxvYWRlZCcpO1xuICAgIH0sIHRydWUpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldnQpID0+IHtcbiAgICAgIHJlamVjdCgnRmFpbGVkIHRvIGxvYWQgWW91VHViZSBzY3JpcHQ6ICcsIGV2dCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBZb3VUdWJlIGV2ZW50IGhhbmRsZXIuIEFkZCB0aGUgcHJvcGVyIGNsYXNzIHRvIHRoZSBwbGF5ZXIgZWxlbWVudCwgYW5kIHNldFxuICogcGxheWVyIHByb3BlcnRpZXMuIEFsbCBwbGF5ZXIgbWV0aG9kcyB2aWEgWW91VHViZSBBUEkuXG4gKi9cbmNvbnN0IG9uWW91VHViZVBsYXllclJlYWR5ID0gKGV2ZW50LCBzdGFydFRpbWUpID0+IHtcbiAgY29uc3QgcGxheWVyID0gZXZlbnQudGFyZ2V0O1xuICBwbGF5ZXIuaWZyYW1lID0gcGxheWVyLmdldElmcmFtZSgpO1xuICBwbGF5ZXIubXV0ZSgpO1xuICBwbGF5ZXIucmVhZHkgPSB0cnVlO1xuICBwbGF5ZXIuc2Vla1RvKHN0YXJ0VGltZSA8IHBsYXllci5nZXREdXJhdGlvbigpID8gc3RhcnRUaW1lIDogMCk7XG4gIHBsYXllci5wbGF5VmlkZW8oKTtcbn07XG5cbi8qKlxuICogWW91VHViZSBldmVudCBoYW5kbGVyLiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgdG8gbG9vcCB0aGUgdmlkZW8uXG4gKi9cbmNvbnN0IG9uWW91VHViZVBsYXllclN0YXRlQ2hhbmdlID0gKGV2ZW50LCBzdGFydFRpbWUsIHdpbiwgc3BlZWQgPSAxKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IGV2ZW50LnRhcmdldDtcbiAgY29uc3QgZHVyYXRpb24gPSAocGxheWVyLmdldER1cmF0aW9uKCkgLSBzdGFydFRpbWUpIC8gc3BlZWQ7XG5cbiAgY29uc3QgZG9Mb29wID0gKCkgPT4ge1xuICAgIGlmICgocGxheWVyLmdldEN1cnJlbnRUaW1lKCkgKyAwLjEpID49IHBsYXllci5nZXREdXJhdGlvbigpKSB7XG4gICAgICBwbGF5ZXIucGF1c2VWaWRlbygpO1xuICAgICAgcGxheWVyLnNlZWtUbyhzdGFydFRpbWUpO1xuICAgICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9Mb29wKTtcbiAgfTtcblxuICBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLkJVRkZFUklORyAmJlxuICAgICAocGxheWVyLmdldFZpZGVvTG9hZGVkRnJhY3Rpb24oKSAhPT0gMSkgJiZcbiAgICAgKHBsYXllci5nZXRDdXJyZW50VGltZSgpID09PSAwIHx8IHBsYXllci5nZXRDdXJyZW50VGltZSgpID4gZHVyYXRpb24gLSAtMC4xKSkge1xuICAgIHJldHVybiAnYnVmZmVyaW5nJztcbiAgfSBlbHNlIGlmIChldmVudC5kYXRhID09PSB3aW4uWVQuUGxheWVyU3RhdGUuUExBWUlORykge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkb0xvb3ApO1xuICAgIHJldHVybiAncGxheWluZyc7XG4gIH0gZWxzZSBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLkVOREVEKSB7XG4gICAgcGxheWVyLnBsYXlWaWRlbygpO1xuICB9XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgdGhlIHBsYXllciBhbmQgYmluZCBwbGF5ZXIgZXZlbnRzLlxuICovXG5jb25zdCBpbml0aWFsaXplWW91VHViZVBsYXllciA9ICh7XG4gIGNvbnRhaW5lciwgd2luLCB2aWRlb0lkLCBzdGFydFRpbWUsIHNwZWVkLCByZWFkeUNhbGxiYWNrLCBzdGF0ZUNoYW5nZUNhbGxiYWNrXG59KSA9PiB7XG4gIGxldCBwbGF5ZXJFbGVtZW50ID0gZ2V0UGxheWVyRWxlbWVudChjb250YWluZXIpXG5cblxuICBjb25zdCBtYWtlUGxheWVyID0gKCkgPT4ge1xuICAgIHJldHVybiBuZXcgd2luLllULlBsYXllcihwbGF5ZXJFbGVtZW50LCB7XG4gICAgICB2aWRlb0lkOiB2aWRlb0lkLFxuICAgICAgaG9zdDogXCJodHRwczovL3d3dy55b3V0dWJlLW5vY29va2llLmNvbVwiLFxuICAgICAgcGxheWVyVmFyczoge1xuICAgICAgICAnYXV0b2hpZGUnOiAxLFxuICAgICAgICAnYXV0b3BsYXknOiAwLFxuICAgICAgICAnY29udHJvbHMnOiAwLFxuICAgICAgICAnZW5hYmxlanNhcGknOiAxLFxuICAgICAgICAnaXZfbG9hZF9wb2xpY3knOiAzLFxuICAgICAgICAnbG9vcCc6IDAsXG4gICAgICAgICdtb2Rlc3RicmFuZGluZyc6IDEsXG4gICAgICAgICdwbGF5c2lubGluZSc6IDEsXG4gICAgICAgICdyZWwnOiAwLFxuICAgICAgICAnc2hvd2luZm8nOiAwLFxuICAgICAgICAnd21vZGUnOiAnb3BhcXVlJyxcbiAgICAgICAgJ29yaWdpbic6IHdpbmRvdy5sb2NhdGlvbi5ocmVmXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgb25Zb3VUdWJlUGxheWVyUmVhZHkoZXZlbnQsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgcmVhZHlDYWxsYmFjayhldmVudC50YXJnZXQpO1xuICAgICAgICB9LFxuICAgICAgICBvblN0YXRlQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gb25Zb3VUdWJlUGxheWVyU3RhdGVDaGFuZ2UoZXZlbnQsIHN0YXJ0VGltZSwgd2luLCBzcGVlZCk7XG4gICAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjayhzdGF0ZSwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjaGVja0FQSUxvYWRlZCA9ICgpID0+IHtcbiAgICAgIGlmICh3aW4uWVQubG9hZGVkID09PSAxKSB7XG4gICAgICAgIHJlc29sdmUobWFrZVBsYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2hlY2tBUElMb2FkZWQsIDEwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrQVBJTG9hZGVkKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHtcbiAgaW5pdGlhbGl6ZVlvdVR1YmVBUEksXG4gIGluaXRpYWxpemVZb3VUdWJlUGxheWVyXG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjdmMDFkNWZjODYzNmFlZWIwZWI5XCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9