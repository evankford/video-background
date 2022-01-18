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
  // player.seekTo(startTime < player.getDuration() ? startTime : 0);
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
/******/ 	__webpack_require__.h = () => ("777f6e3260bdf0ae116a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi40ZDkyOTJiZTZhZGRkNzA5OTJmMS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHNCQUFzQiw4REFBZ0I7OztBQUd0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7Ozs7O1VDeEhBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3V0aWxzL3lvdXR1YmUuanMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRQbGF5ZXJFbGVtZW50IH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMnXG5cbi8qKlxuICogU2V0IHVwIHRoZSBZb3VUdWJlIHNjcmlwdCBpbmNsdWRlIGlmIGl0J3Mgbm90IHByZXNlbnRcbiAqL1xuY29uc3QgaW5pdGlhbGl6ZVlvdVR1YmVBUEkgPSAod2luKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgaWYgKHdpbi5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2NyaXB0W3NyYyo9XCJ3d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiXS5sb2FkZWQnKSkge1xuICAgICAgcmVzb2x2ZSgnYWxyZWFkeSBsb2FkZWQnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0YWcgPSB3aW4uZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgdGFnLnNyYyA9ICdodHRwczovL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpJztcbiAgICBjb25zdCBmaXJzdFNjcmlwdFRhZyA9IHdpbi5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGFnLCBmaXJzdFNjcmlwdFRhZyk7XG4gICAgdGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoZXZ0KSA9PiB7XG4gICAgICBldnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKTtcbiAgICAgIHJlc29sdmUoJ2FwaSBzY3JpcHQgdGFnIGNyZWF0ZWQgYW5kIGxvYWRlZCcpO1xuICAgIH0sIHRydWUpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldnQpID0+IHtcbiAgICAgIHJlamVjdCgnRmFpbGVkIHRvIGxvYWQgWW91VHViZSBzY3JpcHQ6ICcsIGV2dCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBZb3VUdWJlIGV2ZW50IGhhbmRsZXIuIEFkZCB0aGUgcHJvcGVyIGNsYXNzIHRvIHRoZSBwbGF5ZXIgZWxlbWVudCwgYW5kIHNldFxuICogcGxheWVyIHByb3BlcnRpZXMuIEFsbCBwbGF5ZXIgbWV0aG9kcyB2aWEgWW91VHViZSBBUEkuXG4gKi9cbmNvbnN0IG9uWW91VHViZVBsYXllclJlYWR5ID0gKGV2ZW50LCBzdGFydFRpbWUpID0+IHtcbiAgY29uc3QgcGxheWVyID0gZXZlbnQudGFyZ2V0O1xuICBwbGF5ZXIuaWZyYW1lID0gcGxheWVyLmdldElmcmFtZSgpO1xuXG4gIHBsYXllci5tdXRlKCk7XG4gIHBsYXllci5yZWFkeSA9IHRydWU7XG4gIC8vIHBsYXllci5zZWVrVG8oc3RhcnRUaW1lIDwgcGxheWVyLmdldER1cmF0aW9uKCkgPyBzdGFydFRpbWUgOiAwKTtcbiAgcGxheWVyLnBsYXlWaWRlbygpO1xuICAvLyBjb25zb2xlLmxvZyhwbGF5ZXIucGxheVZpZGVvKCkpXG59O1xuXG4vKipcbiAqIFlvdVR1YmUgZXZlbnQgaGFuZGxlci4gRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIGxvb3AgdGhlIHZpZGVvLlxuICovXG5jb25zdCBvbllvdVR1YmVQbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCwgc3RhcnRUaW1lLCB3aW4sIHNwZWVkID0gMSkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IGR1cmF0aW9uID0gKHBsYXllci5nZXREdXJhdGlvbigpIC0gc3RhcnRUaW1lKSAvIHNwZWVkO1xuXG4gIGNvbnN0IGRvTG9vcCA9ICgpID0+IHtcbiAgICBpZiAoKHBsYXllci5nZXRDdXJyZW50VGltZSgpICsgMC4xKSA+PSBwbGF5ZXIuZ2V0RHVyYXRpb24oKSkge1xuICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgIHBsYXllci5zZWVrVG8oc3RhcnRUaW1lKTtcbiAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvTG9vcCk7XG4gIH07XG5cbiAgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5CVUZGRVJJTkcgJiZcbiAgICAgKHBsYXllci5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCkgIT09IDEpICYmXG4gICAgIChwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA9PT0gMCB8fCBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA+IGR1cmF0aW9uIC0gLTAuMSkpIHtcbiAgICByZXR1cm4gJ2J1ZmZlcmluZyc7XG4gIH0gZWxzZSBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9Mb29wKTtcbiAgICByZXR1cm4gJ3BsYXlpbmcnO1xuICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5FTkRFRCkge1xuICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBwbGF5ZXIgYW5kIGJpbmQgcGxheWVyIGV2ZW50cy5cbiAqL1xuY29uc3QgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXIgPSAoe1xuICBjb250YWluZXIsIHdpbiwgdmlkZW9JZCwgc3RhcnRUaW1lLCBzcGVlZCwgcmVhZHlDYWxsYmFjaywgc3RhdGVDaGFuZ2VDYWxsYmFja1xufSkgPT4ge1xuICBsZXQgcGxheWVyRWxlbWVudCA9IGdldFBsYXllckVsZW1lbnQoY29udGFpbmVyKVxuXG5cbiAgY29uc3QgbWFrZVBsYXllciA9ICgpID0+IHtcbiAgICByZXR1cm4gbmV3IHdpbi5ZVC5QbGF5ZXIocGxheWVyRWxlbWVudCwge1xuICAgICAgdmlkZW9JZDogdmlkZW9JZCxcbiAgICAgIGhvc3Q6IFwiaHR0cHM6Ly93d3cueW91dHViZS1ub2Nvb2tpZS5jb21cIixcbiAgICAgIHBsYXllclZhcnM6IHtcbiAgICAgICAgJ2F1dG9oaWRlJzogMSxcbiAgICAgICAgJ2F1dG9wbGF5JzogMSxcbiAgICAgICAgJ2NvbnRyb2xzJzogMCxcbiAgICAgICAgJ2VuYWJsZWpzYXBpJzogMSxcbiAgICAgICAgJ2l2X2xvYWRfcG9saWN5JzogMyxcbiAgICAgICAgJ2xvb3AnOiAwLFxuICAgICAgICAnbW9kZXN0YnJhbmRpbmcnOiAxLFxuICAgICAgICAncGxheXNpbmxpbmUnOiAxLFxuICAgICAgICAncmVsJzogMCxcbiAgICAgICAgJ3Nob3dpbmZvJzogMCxcbiAgICAgICAgJ3dtb2RlJzogJ29wYXF1ZScsXG4gICAgICAgICdvcmlnaW4nOiB3aW5kb3cubG9jYXRpb24uaHJlZlxuICAgICAgfSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBvblJlYWR5OiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIG9uWW91VHViZVBsYXllclJlYWR5KGV2ZW50LCBzdGFydFRpbWUpO1xuICAgICAgICAgIHJlYWR5Q2FsbGJhY2soZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IG9uWW91VHViZVBsYXllclN0YXRlQ2hhbmdlKGV2ZW50LCBzdGFydFRpbWUsIHdpbiwgc3BlZWQpO1xuICAgICAgICAgIHN0YXRlQ2hhbmdlQ2FsbGJhY2soc3RhdGUsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgY2hlY2tBUElMb2FkZWQgPSAoKSA9PiB7XG4gICAgICBpZiAod2luLllULmxvYWRlZCA9PT0gMSkge1xuICAgICAgICByZXNvbHZlKG1ha2VQbGF5ZXIoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUaW1lb3V0KGNoZWNrQVBJTG9hZGVkLCAxMDApO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjaGVja0FQSUxvYWRlZCgpO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7XG4gIGluaXRpYWxpemVZb3VUdWJlQVBJLFxuICBpbml0aWFsaXplWW91VHViZVBsYXllclxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3NzdmNmUzMjYwYmRmMGFlMTE2YVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==