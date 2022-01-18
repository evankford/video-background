"use strict";
self["webpackHotUpdate_atmtfy_video_background"]("main",{

/***/ "./src/videoBackground.ts":
/*!********************************!*\
  !*** ./src/videoBackground.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoBackground": () => (/* binding */ VideoBackground)
/* harmony export */ });
/* harmony import */ var can_autoplay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! can-autoplay */ "./node_modules/.pnpm/can-autoplay@3.0.2/node_modules/can-autoplay/build/can-autoplay.es.js");
/* harmony import */ var _utils_vimeo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/vimeo */ "./src/utils/vimeo.js");
/* harmony import */ var _utils_youtube__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/youtube */ "./src/utils/youtube.js");
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/utils */ "./src/utils/utils.js");




const videoSourceModules = {
    vimeo: {
        api: _utils_vimeo__WEBPACK_IMPORTED_MODULE_1__.initializeVimeoAPI,
        player: _utils_vimeo__WEBPACK_IMPORTED_MODULE_1__.initializeVimeoPlayer
    },
    youtube: {
        api: _utils_youtube__WEBPACK_IMPORTED_MODULE_2__.initializeYouTubeAPI,
        player: _utils_youtube__WEBPACK_IMPORTED_MODULE_2__.initializeYouTubePlayer
    }
};
class VideoBackground extends HTMLElement {
    overlayEl;
    posterEl;
    browserCanAutoplay;
    videoEl;
    muteButton;
    pauseButton;
    size;
    type;
    breakpoints;
    widthStore;
    sourcesReady;
    sources;
    debug;
    constructor() {
        super();
        this.sourcesReady = false;
        this.browserCanAutoplay = false;
        //Setting up debug
        if (this.getAttribute('debug')) {
            if (this.getAttribute('debug') == "verbose") {
                this.debug = { enabled: true, verbose: true };
            }
            else {
                this.debug = { enabled: true, verbose: false };
            }
        }
        else {
            this.debug = { enabled: false, verbose: false };
        }
        if (this.debug) {
            console.log("Debugging video-background.");
        }
        this.init();
    }
    init() {
        this.status = "waiting";
        this.compileSources(this.src);
        this.buildDOM();
        this.buildIntersectionObserver();
    }
    buildDOM() {
        this.buildOverlay();
        this.buildPoster();
        can_autoplay__WEBPACK_IMPORTED_MODULE_0__["default"].video({ timeout: 500, muted: true }).then(({ result, error }) => {
            if (result == false) {
                this.handleFallbackNoVideo();
            }
            else {
                this.buildVideo();
            }
        });
        //Check for overlay things.
    }
    buildVideo() {
        //Never should have mixed sources.
        console.log(this.sources);
        if (!this.sourcesReady) {
            return false;
        }
        this.logger("Building video based on type: " + this.type);
        if (this.type == 'local') {
            this.buildLocalVideo();
        }
    }
    handleFallbackNoVideo() {
        this.logger("Video Won't play, defaulting to fallback");
        this.status = "fallback";
    }
    buildLocalVideo() {
        this.logger("Building local video");
        if (this.videoEl && this.videoEl.hasAttribute('playsinline')) {
            this.removeChild(this.videoEl);
        }
        if (!this.sources) {
            this.logger("No sources for local video");
            return this.handleFallbackNoVideo();
        }
        //We need to get size when breakpoints
        let srcSet = this.sources;
        if (this.breakpoints && this.breakpoints.length > 0) {
            this.logger("Video has breakpoints");
            srcSet = this.getSourcesFilteredBySize(this.sources);
            window.addEventListener('resize', this.checkIfPassedBreakpoints.bind(this));
        }
        if (srcSet && srcSet.length) {
            this.videoEl = document.createElement('video');
            this.videoEl.classList.add('vbg__video');
            this.videoEl.classList.add('vbg--loading');
            this.videoEl.setAttribute('playsinline', '');
            this.videoEl.setAttribute('poster', this.poster);
            if (this.autoplay) {
                this.videoEl.setAttribute('autoplay', '');
            }
            if (this.loop) {
                this.videoEl.setAttribute('loop', '');
            }
            if (this.muted) {
                this.videoEl.setAttribute('muted', '');
            }
            this.videoEl.innerHTML = '';
            srcSet.forEach(src => {
                const child = document.createElement('source');
                if ('fileType' in src) {
                    child.type = 'video/' + src.fileType;
                }
                child.src = src.url;
                child.addEventListener('loadeddata', function () {
                    self.videoEl && self.videoEl.classList.remove('vbg--loading');
                });
                this.videoEl?.append(child);
            });
            const self = this;
            this.append(this.videoEl);
            this.videoEl.addEventListener('canplay', () => {
                self.videoEl?.classList.remove('vbg--loading');
            });
            if (this.muted) {
                this.muteVideo();
            }
        }
    }
    muteVideo() {
        this.logger('muting video');
        const videoToMute = this.querySelector('video');
        if (videoToMute) {
            videoToMute.volume = 0;
            videoToMute.muted = true;
        }
    }
    getSourcesFilteredBySize(sources) {
        const wW = window.innerWidth;
        this.widthStore = wW;
        let sortedBySize = { 'max': [] };
        sources.forEach((source) => {
            if (('maxWidth' in source) && source.maxWidth) {
                const w = source.maxWidth.toString();
                if (sortedBySize != undefined && !Object.keys(sortedBySize).includes(w)) {
                    sortedBySize[w] = [source];
                }
                else {
                    sortedBySize[w].push(source);
                }
            }
            else if ('maxWidth' in source) {
                sortedBySize['max'].push(source);
            }
        });
        if (!this.breakpoints) {
            this.logger('Breakpoints not defined at size filter. Something\'s wrong', true);
            return sources;
        }
        let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b);
        const currentIndex = breakpointsWithPresent.indexOf(wW);
        console.log(breakpointsWithPresent);
        if (currentIndex == breakpointsWithPresent.length - 1) {
            return sortedBySize['max'];
        }
        else {
            return sortedBySize[breakpointsWithPresent[currentIndex + 1].toString()];
        }
    }
    checkIfPassedBreakpoints() {
        if (!this.widthStore || !this.breakpoints) {
            return;
        }
        const wW = window.innerWidth;
        let breakpointsWithPast = [...this.breakpoints, this.widthStore].sort((a, b) => a - b);
        let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b);
        const pastIndex = breakpointsWithPast.indexOf(this.widthStore);
        const currentIndex = breakpointsWithPresent.indexOf(wW);
        this.logger(`comparing past breakpoint of ${this.widthStore} with current of ${wW}. Are we good? The past one was ${pastIndex} and currently it's ${currentIndex}`);
        if (pastIndex != currentIndex) {
            this.buildLocalVideo();
        }
    }
    buildPoster() {
        if (!this.posterSet && !this.poster) {
            return false;
        }
        this.posterEl = document.createElement('img');
        this.posterEl.classList.add('vbg__poster');
        this.posterEl.classList.add('vbg--loading');
        if (this.poster) {
            const self = this;
            const imageLoaderEl = new Image();
            imageLoaderEl.src = this.poster;
            imageLoaderEl.addEventListener('load', function () {
                if (self && self.posterEl) {
                    self.posterEl.src = imageLoaderEl.src;
                    self.posterEl.classList.remove('vbg--loading');
                }
            });
        }
        if (this.posterSet) {
            this.posterEl.srcset = this.posterSet;
            this.posterEl.sizes = this.size || "100vw";
        }
        this.appendChild(this.posterEl);
    }
    buildOverlay() {
        this.overlayEl = document.createElement('div');
        this.overlayEl.classList.add('vbg__overlay');
        this.appendChild(this.overlayEl);
    }
    buildIntersectionObserver() {
        const options = {
            threshold: 0.5
        };
    }
    get autoplay() {
        if (this.getAttribute('autoplay') != 'false') {
            return true;
        }
        return false;
    }
    get loop() {
        if (this.getAttribute('loop') != 'false') {
            return true;
        }
        return false;
    }
    get muted() {
        if (this.getAttribute('muted') != 'false') {
            return true;
        }
        return false;
    }
    set autoplay(isAutoplay) {
        if (isAutoplay) {
            this.setAttribute('autoplay', '');
        }
        else {
            this.removeAttribute('autoplay');
        }
    }
    set muted(isMuted) {
        if (isMuted) {
            this.setAttribute('muted', '');
        }
        else {
            this.removeAttribute('muted');
        }
    }
    set loop(isLoop) {
        if (isLoop) {
            this.setAttribute('loop', '');
        }
        else {
            this.removeAttribute('loop');
        }
    }
    get status() {
        const statusString = this.getAttribute('status');
        if (typeof statusString == 'string' && (statusString == "loading" || statusString == "fallback" || statusString == "loaded" || statusString == "buffering" || statusString == "failed" || statusString == "waiting" || statusString == "none" || statusString == "error")) {
            return statusString;
        }
        else {
            this.status = "none";
            return "none";
        }
    }
    /** Updates status on the actual element as well as the property of the class */
    set status(status) {
        if (status) {
            // switch (status) {
            //   case ("waiting" || "loading"):
            //   break;
            // }
            this.setAttribute('status', status);
        }
        else {
            this.setAttribute('status', 'error');
        }
    }
    get poster() {
        const posterVal = this.getAttribute('poster');
        if (posterVal != null) {
            return posterVal;
        }
        else {
            return false;
        }
    }
    get posterSet() {
        const posterVal = this.getAttribute('posterset');
        if (posterVal != null) {
            return posterVal;
        }
        else {
            return false;
        }
    }
    get src() {
        const src = this.getAttribute('src');
        if (typeof src == 'string') {
            this.compileSources(src);
        }
        return src;
    }
    set src(srcString) {
        if (srcString == null) {
            this.removeAttribute('src');
        }
        else {
            this.setAttribute('src', srcString);
            this.compileSources(srcString);
        }
    }
    /**
     * Sets the poster url string, and sets loading that poster into motion
     */
    set poster(posterString) {
        if (posterString) {
            // switch (status) {
            //   case ("waiting" || "loading"):
            //   break;
            // }
            this.setAttribute('poster', posterString);
            this.buildPoster();
        }
        else {
            this.removeAttribute('poster');
        }
    }
    //
    compileSources(srcString) {
        if (srcString == null) {
            if (this.debug) {
                console.log("No source provided for video background");
            }
            return false;
        }
        let src = srcString.trim();
        let srcsToReturn = [];
        let srcStrings = [];
        let sizeStrings = [];
        let hasMultipleSrcs = false, hasSizes = false;
        if (src.indexOf(',') >= 0) {
            //Looks like https://something 300w, https://something https://another one, else etc 500w,
            this.debug && console.log('Has sizes separated by comma');
            sizeStrings = srcString.split(',');
            if (sizeStrings.length >= 2) {
                sizeStrings.forEach(sizeString => {
                    const splitString = sizeString.trim().split(' ');
                    if (splitString.length <= 1) {
                        srcsToReturn.push(this.prepareSingleSource(sizeString));
                    }
                    else {
                        const size = parseInt(splitString[splitString.length - 1].replace('w', ''));
                        this.logger("Found a size: " + size + ' from string ' + sizeString);
                        splitString.forEach((string) => { srcsToReturn.push(this.prepareSingleSource(string, size)); });
                    }
                });
            }
            hasSizes = true;
        }
        if (src.indexOf(' ') >= 0) {
            this.debug && console.log('Has multiple sources separated by spaces');
            if (sizeStrings.length >= 2) {
            }
            else {
                const array = srcString.split(' ');
                array.forEach(item => { srcStrings.push(item.trim()); });
            }
            srcStrings.forEach((string) => { srcsToReturn.push(this.prepareSingleSource(string)); });
        }
        if (!hasSizes && !hasMultipleSrcs) {
            //Build from single source
            srcsToReturn.push(this.prepareSingleSource(src));
        }
        this.sources = this.cleanupSources(srcsToReturn);
    }
    /**
     * Removes conflicting sources of different types (can only have one of each type)
     */
    cleanupSources(sources) {
        //Type first
        const firstSourceType = sources[0].type;
        if (firstSourceType == 'youtube' || firstSourceType == 'vimeo') {
            this.type = 'embed';
        }
        else {
            this.type = firstSourceType;
        }
        //Return object if only one.
        if (typeof sources != 'object' || sources.length <= 1) {
            this.sourcesReady = true;
            return sources;
        }
        else {
            if (firstSourceType == 'youtube' || firstSourceType == 'vimeo') {
                this.sourcesReady = true;
                return [sources[0]];
            }
            else {
                // Get sizes
                let sizes = [];
                sources.forEach((source) => {
                    if (!('maxWidth' in source) || typeof source.maxWidth != 'number') {
                        return;
                    }
                    if (!sizes.includes(source.maxWidth)) {
                        sizes.push(source.maxWidth);
                    }
                    this.breakpoints = sizes;
                });
                this.sourcesReady = true;
                return sources.filter(src => { return src.type == firstSourceType; });
            }
        }
    }
    prepareSingleSource(url, size) {
        const urlType = this.getSourceType(url);
        let returner = {
            url: url,
            type: urlType,
        };
        if (urlType == 'youtube') {
            const startTime = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.getStartTime)(url, 'youtube');
            if (startTime) {
                returner.startTime = startTime;
            }
            return { ...returner,
                id: this.getYoutubeIdFromSource(url),
            };
        }
        else if (urlType == 'vimeo') {
            const startTime = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.getStartTime)(url, 'vimeo');
            if (startTime) {
                returner.startTime = startTime;
            }
            return { ...returner,
                id: this.getVimeoIdFromSource(url)
            };
        }
        else {
            const ft = this.getFileType(url);
            if (size) {
                returner.maxWidth = size;
            }
            else {
                returner.maxWidth = false;
            }
            if (ft) {
                return { ...returner, fileType: ft };
            }
        }
        return this.handleMalformedSource(url);
    }
    getFileType(url) {
        if (url.includes('.mp4')) {
            return 'mp4';
        }
        if (url.includes('.webm')) {
            return 'webm';
        }
        if (url.includes('.ogg')) {
            return 'ogg';
        }
        if (url.includes('.ogm')) {
            return 'ogm';
        }
        return false;
    }
    handleMalformedSource(url) {
        this.logger(`Handling error for ${url}`);
        return {
            url: url,
            type: 'error',
        };
    }
    getSourceType(url) {
        const ytTest = new RegExp(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/);
        const vimeoTest = new RegExp(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
        const videoTest = new RegExp(/.*?\/.*(webm|mp4|ogg|ogm).*?/i);
        if (ytTest.test(url)) {
            return 'youtube';
        }
        else if (vimeoTest.test(url)) {
            return 'vimeo';
        }
        else if (videoTest.test(url)) {
            return 'local';
        }
        else {
            return 'error';
        }
    }
    getYoutubeIdFromSource(url) {
        var re = /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9_\-]+)/i;
        var matches = re.exec(url);
        if (matches && matches[1]) {
            return matches[1];
        }
        return false;
    }
    getVimeoIdFromSource(url) {
        var re = /\/\/(?:www\.)?vimeo.com\/([a-z0-9_\-]+)/i;
        var matches = re.exec(url);
        if (matches && matches[1]) {
            return matches[1];
        }
        return false;
    }
    connectedCallback() {
    }
    /**
     * @method logger A guarded console logger.
     * @param msg the message to send
     * @param always Whether to always show if not verbose
     * @return {undefined}
     */
    logger(msg, always = false) {
        if (always && this.debug.enabled) {
            console.log(msg);
        }
        else {
            if (!this.debug.enabled || !this.debug.verbose) {
                return;
            }
            console.log(msg);
        }
    }
}


/***/ }),

/***/ "./src/utils/vimeo.js":
/*!****************************!*\
  !*** ./src/utils/vimeo.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initializeVimeoAPI": () => (/* binding */ initializeVimeoAPI),
/* harmony export */   "initializeVimeoPlayer": () => (/* binding */ initializeVimeoPlayer)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");
/* harmony import */ var _constants_instance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/instance */ "./src/constants/instance.js");



let playerIframe;
let playerOrigin = "*";
let playerPromiseTimer = null;

/**
 * Call the Vimeo API per their guidelines.
 */
const initializeVimeoAPI = () => {
  // No external API call is necessary, preserved for parity with YouTube and
  // potential additional integrations.
  return new Promise((resolve, reject) => {
    resolve("no api needed");
  });
};

/**
 * Creates cross frame postMessage handlers, gets proper dimensions of player,
 * and sets ready state for the player and container.
 *
 */
const postMessageManager = (action, value) => {
  const data = {
    method: action,
  };

  if (value) {
    data.value = value;
  }

  const message = JSON.stringify(data);
  playerIframe.ownerDocument.defaultView.eval(
    "(function(playerIframe){ playerIframe.contentWindow.postMessage(" +
      message +
      ", " +
      JSON.stringify(playerOrigin) +
      ") })"
  )(playerIframe);
};

/**
 * Initialize the player and bind player events with a postMessage handler.
 */
const initializeVimeoPlayer = ({
  win,
  instance,
  container,
  videoId,
  startTime,
  readyCallback,
  stateChangeCallback,
}) => {
  return new Promise((resolve, reject) => {
    const logger = instance.logger || function () {};
    playerIframe = win.document.createElement("iframe");
    playerIframe.id = "vimeoplayer";
    const playerConfig = "&background=1";
    playerIframe.src =
      "//player.vimeo.com/video/" + videoId + "?api=1" + playerConfig;
    const wrapper = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.getPlayerElement)(container);
    wrapper.appendChild(playerIframe);

    const player = {
      iframe: playerIframe,
      setPlaybackRate: () => {},
    };
    resolve(player);

    const getVideoDetails = () => {
      postMessageManager("getDuration");
      postMessageManager("getVideoHeight");
      postMessageManager("getVideoWidth");
    };

    let retryTimer = null;
    const syncAndStartPlayback = (isRetrying = false) => {
      if (
        !isRetrying &&
        (!player.dimensions.width ||
          !player.dimensions.height ||
          !player.duration)
      ) {
        return;
      }

      if (isRetrying) {
        getVideoDetails();
      }

      player.dimensions.width =
        player.dimensions.width || player.iframe.parentNode.offsetWidth;
      player.dimensions.height =
        player.dimensions.height || player.iframe.parentNode.offsetHeight;
      player.duration = player.duration || 10;

      // Only required for Vimeo Basic videos, or video URLs with a start time hash.
      // Plus and Pro utilize `background=1` URL parameter.
      // See https://vimeo.com/forums/topic:278001
      postMessageManager("setVolume", "0");
      postMessageManager("setLoop", "true");
      postMessageManager("seekTo", startTime); // `seekTo` handles playback as well
      postMessageManager("addEventListener", "playProgress");

      readyCallback(player);
    };

    const onReady = () => {
      if (playerPromiseTimer) {
        clearTimeout(playerPromiseTimer);
        playerPromiseTimer = null;
      }

      if (!player.dimensions) {
        player.dimensions = {};
        getVideoDetails();

        stateChangeCallback("buffering");
        retryTimer = setTimeout(() => {
          logger.call(instance, "retrying");
          syncAndStartPlayback(true);
        }, _constants_instance__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT * 0.75);
      }
    };

    const onMessageReceived = (event) => {
      if (!/^https?:\/\/player.vimeo.com/.test(event.origin)) {
        return false;
      }

      playerOrigin = event.origin;

      let data = event.data;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }

      switch (data.event) {
        case "ready":
          onReady(playerOrigin);
          break;

        case "playProgress":
        case "timeupdate":
          if (retryTimer) {
            clearTimeout(retryTimer);
            retryTimer = null;
          }
          stateChangeCallback("playing", data);
          postMessageManager("setVolume", "0");

          if (data.data.percent >= 0.98 && startTime > 0) {
            postMessageManager("seekTo", startTime);
          }
          break;
      }

      switch (data.method) {
        case "getVideoHeight":
          logger.call(instance, data.method);
          player.dimensions.height = data.value;
          syncAndStartPlayback();
          break;
        case "getVideoWidth":
          logger.call(instance, data.method);
          player.dimensions.width = data.value;
          syncAndStartPlayback();
          break;
        case "getDuration":
          logger.call(instance, data.method);
          player.duration = data.value;
          if (startTime >= player.duration) {
            startTime = 0;
          }
          syncAndStartPlayback();
          break;
      }
    };

    const messageHandler = (e) => {
      onMessageReceived(e);
    };

    win.addEventListener("message", messageHandler, false);

    player.destroy = () => {
      win.removeEventListener("message", messageHandler);
      // If the iframe node has already been removed from the DOM by the
      // implementer, parentElement.removeChild will error out unless we do
      // this check here first.
      if (player.iframe.parentElement) {
        player.iframe.parentElement.removeChild(player.iframe);
      }
    };

    playerPromiseTimer = setTimeout(() => {
      reject("Ran out of time");
    }, _constants_instance__WEBPACK_IMPORTED_MODULE_1__.TIMEOUT);
  });
};




/***/ }),

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
        'wmode': 'opaque'
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
/******/ 	__webpack_require__.h = () => ("4c7bfd130f90671abc35")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi4yMjRiNWM0YTIyYjRhZmVlMmY0Zi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXVDO0FBQ21DO0FBQ007QUFDbkM7QUFDN0M7QUFDQTtBQUNBLGFBQWEsNERBQWtCO0FBQy9CLGdCQUFnQiwrREFBcUI7QUFDckMsS0FBSztBQUNMO0FBQ0EsYUFBYSxnRUFBb0I7QUFDakMsZ0JBQWdCLG1FQUF1QjtBQUN2QztBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMERBQWlCLEdBQUcsMkJBQTJCLFVBQVUsZUFBZTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCLGtCQUFrQixHQUFHLGtDQUFrQyxXQUFXLHFCQUFxQixhQUFhO0FBQ3pLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCw0REFBNEQ7QUFDdEg7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLCtCQUErQjtBQUN2RTtBQUNBLDZDQUE2QyxzREFBc0Q7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSwrQ0FBK0MscUNBQXFDO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDBEQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QiwwREFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsSUFBSTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SkFBNkosS0FBSztBQUNsSztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMWhCa0Q7QUFDaUI7O0FBRW5FO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhEQUFnQjtBQUNwQzs7QUFFQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEVBQUUsd0RBQWU7QUFDMUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUssRUFBRSx3REFBZTtBQUN0QixHQUFHO0FBQ0g7O0FBRXFEOzs7Ozs7Ozs7Ozs7Ozs7OztBQzFNSjs7QUFFakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELHNCQUFzQiw4REFBZ0I7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7OztVQ25IQSIsInNvdXJjZXMiOlsid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy92aWRlb0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vQGF0bXRmeS92aWRlby1iYWNrZ3JvdW5kLy4vc3JjL3V0aWxzL3ZpbWVvLmpzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC8uL3NyYy91dGlscy95b3V0dWJlLmpzIiwid2VicGFjazovL0BhdG10ZnkvdmlkZW8tYmFja2dyb3VuZC93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNhbkF1dG9QbGF5IGZyb20gJ2Nhbi1hdXRvcGxheSc7XG5pbXBvcnQgeyBpbml0aWFsaXplVmltZW9BUEksIGluaXRpYWxpemVWaW1lb1BsYXllciB9IGZyb20gJy4vdXRpbHMvdmltZW8nO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVlvdVR1YmVBUEksIGluaXRpYWxpemVZb3VUdWJlUGxheWVyIH0gZnJvbSAnLi91dGlscy95b3V0dWJlJztcbmltcG9ydCB7IGdldFN0YXJ0VGltZSB9IGZyb20gJy4vdXRpbHMvdXRpbHMnO1xuY29uc3QgdmlkZW9Tb3VyY2VNb2R1bGVzID0ge1xuICAgIHZpbWVvOiB7XG4gICAgICAgIGFwaTogaW5pdGlhbGl6ZVZpbWVvQVBJLFxuICAgICAgICBwbGF5ZXI6IGluaXRpYWxpemVWaW1lb1BsYXllclxuICAgIH0sXG4gICAgeW91dHViZToge1xuICAgICAgICBhcGk6IGluaXRpYWxpemVZb3VUdWJlQVBJLFxuICAgICAgICBwbGF5ZXI6IGluaXRpYWxpemVZb3VUdWJlUGxheWVyXG4gICAgfVxufTtcbmV4cG9ydCBjbGFzcyBWaWRlb0JhY2tncm91bmQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgb3ZlcmxheUVsO1xuICAgIHBvc3RlckVsO1xuICAgIGJyb3dzZXJDYW5BdXRvcGxheTtcbiAgICB2aWRlb0VsO1xuICAgIG11dGVCdXR0b247XG4gICAgcGF1c2VCdXR0b247XG4gICAgc2l6ZTtcbiAgICB0eXBlO1xuICAgIGJyZWFrcG9pbnRzO1xuICAgIHdpZHRoU3RvcmU7XG4gICAgc291cmNlc1JlYWR5O1xuICAgIHNvdXJjZXM7XG4gICAgZGVidWc7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYnJvd3NlckNhbkF1dG9wbGF5ID0gZmFsc2U7XG4gICAgICAgIC8vU2V0dGluZyB1cCBkZWJ1Z1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2RlYnVnJykpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnZGVidWcnKSA9PSBcInZlcmJvc2VcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IHRydWUsIHZlcmJvc2U6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZGVidWcgPSB7IGVuYWJsZWQ6IHRydWUsIHZlcmJvc2U6IGZhbHNlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRlYnVnID0geyBlbmFibGVkOiBmYWxzZSwgdmVyYm9zZTogZmFsc2UgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJEZWJ1Z2dpbmcgdmlkZW8tYmFja2dyb3VuZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gXCJ3YWl0aW5nXCI7XG4gICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXModGhpcy5zcmMpO1xuICAgICAgICB0aGlzLmJ1aWxkRE9NKCk7XG4gICAgICAgIHRoaXMuYnVpbGRJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuICAgIH1cbiAgICBidWlsZERPTSgpIHtcbiAgICAgICAgdGhpcy5idWlsZE92ZXJsYXkoKTtcbiAgICAgICAgdGhpcy5idWlsZFBvc3RlcigpO1xuICAgICAgICBjYW5BdXRvUGxheS52aWRlbyh7IHRpbWVvdXQ6IDUwMCwgbXV0ZWQ6IHRydWUgfSkudGhlbigoeyByZXN1bHQsIGVycm9yIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUZhbGxiYWNrTm9WaWRlbygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZFZpZGVvKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvL0NoZWNrIGZvciBvdmVybGF5IHRoaW5ncy5cbiAgICB9XG4gICAgYnVpbGRWaWRlbygpIHtcbiAgICAgICAgLy9OZXZlciBzaG91bGQgaGF2ZSBtaXhlZCBzb3VyY2VzLlxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNvdXJjZXMpO1xuICAgICAgICBpZiAoIXRoaXMuc291cmNlc1JlYWR5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2dnZXIoXCJCdWlsZGluZyB2aWRlbyBiYXNlZCBvbiB0eXBlOiBcIiArIHRoaXMudHlwZSk7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT0gJ2xvY2FsJykge1xuICAgICAgICAgICAgdGhpcy5idWlsZExvY2FsVmlkZW8oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVGYWxsYmFja05vVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKFwiVmlkZW8gV29uJ3QgcGxheSwgZGVmYXVsdGluZyB0byBmYWxsYmFja1wiKTtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBcImZhbGxiYWNrXCI7XG4gICAgfVxuICAgIGJ1aWxkTG9jYWxWaWRlbygpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIoXCJCdWlsZGluZyBsb2NhbCB2aWRlb1wiKTtcbiAgICAgICAgaWYgKHRoaXMudmlkZW9FbCAmJiB0aGlzLnZpZGVvRWwuaGFzQXR0cmlidXRlKCdwbGF5c2lubGluZScpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUNoaWxkKHRoaXMudmlkZW9FbCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnNvdXJjZXMpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiTm8gc291cmNlcyBmb3IgbG9jYWwgdmlkZW9cIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVGYWxsYmFja05vVmlkZW8oKTtcbiAgICAgICAgfVxuICAgICAgICAvL1dlIG5lZWQgdG8gZ2V0IHNpemUgd2hlbiBicmVha3BvaW50c1xuICAgICAgICBsZXQgc3JjU2V0ID0gdGhpcy5zb3VyY2VzO1xuICAgICAgICBpZiAodGhpcy5icmVha3BvaW50cyAmJiB0aGlzLmJyZWFrcG9pbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKFwiVmlkZW8gaGFzIGJyZWFrcG9pbnRzXCIpO1xuICAgICAgICAgICAgc3JjU2V0ID0gdGhpcy5nZXRTb3VyY2VzRmlsdGVyZWRCeVNpemUodGhpcy5zb3VyY2VzKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNoZWNrSWZQYXNzZWRCcmVha3BvaW50cy5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjU2V0ICYmIHNyY1NldC5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuY2xhc3NMaXN0LmFkZCgndmJnX192aWRlbycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmNsYXNzTGlzdC5hZGQoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgdGhpcy52aWRlb0VsLnNldEF0dHJpYnV0ZSgncGxheXNpbmxpbmUnLCAnJyk7XG4gICAgICAgICAgICB0aGlzLnZpZGVvRWwuc2V0QXR0cmlidXRlKCdwb3N0ZXInLCB0aGlzLnBvc3Rlcik7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ2xvb3AnLCAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tdXRlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMudmlkZW9FbC5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy52aWRlb0VsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgc3JjU2V0LmZvckVhY2goc3JjID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NvdXJjZScpO1xuICAgICAgICAgICAgICAgIGlmICgnZmlsZVR5cGUnIGluIHNyYykge1xuICAgICAgICAgICAgICAgICAgICBjaGlsZC50eXBlID0gJ3ZpZGVvLycgKyBzcmMuZmlsZVR5cGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoaWxkLnNyYyA9IHNyYy51cmw7XG4gICAgICAgICAgICAgICAgY2hpbGQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi52aWRlb0VsICYmIHNlbGYudmlkZW9FbC5jbGFzc0xpc3QucmVtb3ZlKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZGVvRWw/LmFwcGVuZChjaGlsZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmQodGhpcy52aWRlb0VsKTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9FbC5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbGYudmlkZW9FbD8uY2xhc3NMaXN0LnJlbW92ZSgndmJnLS1sb2FkaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm11dGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tdXRlVmlkZW8oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtdXRlVmlkZW8oKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyKCdtdXRpbmcgdmlkZW8nKTtcbiAgICAgICAgY29uc3QgdmlkZW9Ub011dGUgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJyk7XG4gICAgICAgIGlmICh2aWRlb1RvTXV0ZSkge1xuICAgICAgICAgICAgdmlkZW9Ub011dGUudm9sdW1lID0gMDtcbiAgICAgICAgICAgIHZpZGVvVG9NdXRlLm11dGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRTb3VyY2VzRmlsdGVyZWRCeVNpemUoc291cmNlcykge1xuICAgICAgICBjb25zdCB3VyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB0aGlzLndpZHRoU3RvcmUgPSB3VztcbiAgICAgICAgbGV0IHNvcnRlZEJ5U2l6ZSA9IHsgJ21heCc6IFtdIH07XG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoKCdtYXhXaWR0aCcgaW4gc291cmNlKSAmJiBzb3VyY2UubWF4V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB3ID0gc291cmNlLm1heFdpZHRoLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRlZEJ5U2l6ZSAhPSB1bmRlZmluZWQgJiYgIU9iamVjdC5rZXlzKHNvcnRlZEJ5U2l6ZSkuaW5jbHVkZXModykpIHtcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkQnlTaXplW3ddID0gW3NvdXJjZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRCeVNpemVbd10ucHVzaChzb3VyY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCdtYXhXaWR0aCcgaW4gc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc29ydGVkQnlTaXplWydtYXgnXS5wdXNoKHNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyKCdCcmVha3BvaW50cyBub3QgZGVmaW5lZCBhdCBzaXplIGZpbHRlci4gU29tZXRoaW5nXFwncyB3cm9uZycsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFByZXNlbnQgPSBbLi4udGhpcy5icmVha3BvaW50cywgd1ddLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgICAgY29uc3QgY3VycmVudEluZGV4ID0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5pbmRleE9mKHdXKTtcbiAgICAgICAgY29uc29sZS5sb2coYnJlYWtwb2ludHNXaXRoUHJlc2VudCk7XG4gICAgICAgIGlmIChjdXJyZW50SW5kZXggPT0gYnJlYWtwb2ludHNXaXRoUHJlc2VudC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gc29ydGVkQnlTaXplWydtYXgnXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWRCeVNpemVbYnJlYWtwb2ludHNXaXRoUHJlc2VudFtjdXJyZW50SW5kZXggKyAxXS50b1N0cmluZygpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0lmUGFzc2VkQnJlYWtwb2ludHMoKSB7XG4gICAgICAgIGlmICghdGhpcy53aWR0aFN0b3JlIHx8ICF0aGlzLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgd1cgPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgbGV0IGJyZWFrcG9pbnRzV2l0aFBhc3QgPSBbLi4udGhpcy5icmVha3BvaW50cywgdGhpcy53aWR0aFN0b3JlXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGxldCBicmVha3BvaW50c1dpdGhQcmVzZW50ID0gWy4uLnRoaXMuYnJlYWtwb2ludHMsIHdXXS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XG4gICAgICAgIGNvbnN0IHBhc3RJbmRleCA9IGJyZWFrcG9pbnRzV2l0aFBhc3QuaW5kZXhPZih0aGlzLndpZHRoU3RvcmUpO1xuICAgICAgICBjb25zdCBjdXJyZW50SW5kZXggPSBicmVha3BvaW50c1dpdGhQcmVzZW50LmluZGV4T2Yod1cpO1xuICAgICAgICB0aGlzLmxvZ2dlcihgY29tcGFyaW5nIHBhc3QgYnJlYWtwb2ludCBvZiAke3RoaXMud2lkdGhTdG9yZX0gd2l0aCBjdXJyZW50IG9mICR7d1d9LiBBcmUgd2UgZ29vZD8gVGhlIHBhc3Qgb25lIHdhcyAke3Bhc3RJbmRleH0gYW5kIGN1cnJlbnRseSBpdCdzICR7Y3VycmVudEluZGV4fWApO1xuICAgICAgICBpZiAocGFzdEluZGV4ICE9IGN1cnJlbnRJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5idWlsZExvY2FsVmlkZW8oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBidWlsZFBvc3RlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnBvc3RlclNldCAmJiAhdGhpcy5wb3N0ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBvc3RlckVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIHRoaXMucG9zdGVyRWwuY2xhc3NMaXN0LmFkZCgndmJnX19wb3N0ZXInKTtcbiAgICAgICAgdGhpcy5wb3N0ZXJFbC5jbGFzc0xpc3QuYWRkKCd2YmctLWxvYWRpbmcnKTtcbiAgICAgICAgaWYgKHRoaXMucG9zdGVyKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNvbnN0IGltYWdlTG9hZGVyRWwgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlTG9hZGVyRWwuc3JjID0gdGhpcy5wb3N0ZXI7XG4gICAgICAgICAgICBpbWFnZUxvYWRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYgJiYgc2VsZi5wb3N0ZXJFbCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLnNyYyA9IGltYWdlTG9hZGVyRWwuc3JjO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnBvc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ3ZiZy0tbG9hZGluZycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnBvc3RlclNldCkge1xuICAgICAgICAgICAgdGhpcy5wb3N0ZXJFbC5zcmNzZXQgPSB0aGlzLnBvc3RlclNldDtcbiAgICAgICAgICAgIHRoaXMucG9zdGVyRWwuc2l6ZXMgPSB0aGlzLnNpemUgfHwgXCIxMDB2d1wiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5wb3N0ZXJFbCk7XG4gICAgfVxuICAgIGJ1aWxkT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdGhpcy5vdmVybGF5RWwuY2xhc3NMaXN0LmFkZCgndmJnX19vdmVybGF5Jyk7XG4gICAgICAgIHRoaXMuYXBwZW5kQ2hpbGQodGhpcy5vdmVybGF5RWwpO1xuICAgIH1cbiAgICBidWlsZEludGVyc2VjdGlvbk9ic2VydmVyKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjVcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0IGF1dG9wbGF5KCkge1xuICAgICAgICBpZiAodGhpcy5nZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbG9vcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2V0QXR0cmlidXRlKCdsb29wJykgIT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBnZXQgbXV0ZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmdldEF0dHJpYnV0ZSgnbXV0ZWQnKSAhPSAnZmFsc2UnKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHNldCBhdXRvcGxheShpc0F1dG9wbGF5KSB7XG4gICAgICAgIGlmIChpc0F1dG9wbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnYXV0b3BsYXknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnYXV0b3BsYXknKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgbXV0ZWQoaXNNdXRlZCkge1xuICAgICAgICBpZiAoaXNNdXRlZCkge1xuICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoJ211dGVkJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ211dGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IGxvb3AoaXNMb29wKSB7XG4gICAgICAgIGlmIChpc0xvb3ApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdsb29wJywgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoJ2xvb3AnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc3RhdHVzKCkge1xuICAgICAgICBjb25zdCBzdGF0dXNTdHJpbmcgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3RhdHVzJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdHVzU3RyaW5nID09ICdzdHJpbmcnICYmIChzdGF0dXNTdHJpbmcgPT0gXCJsb2FkaW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwiZmFsbGJhY2tcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJsb2FkZWRcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJidWZmZXJpbmdcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJmYWlsZWRcIiB8fCBzdGF0dXNTdHJpbmcgPT0gXCJ3YWl0aW5nXCIgfHwgc3RhdHVzU3RyaW5nID09IFwibm9uZVwiIHx8IHN0YXR1c1N0cmluZyA9PSBcImVycm9yXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdHVzU3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIHJldHVybiBcIm5vbmVcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiogVXBkYXRlcyBzdGF0dXMgb24gdGhlIGFjdHVhbCBlbGVtZW50IGFzIHdlbGwgYXMgdGhlIHByb3BlcnR5IG9mIHRoZSBjbGFzcyAqL1xuICAgIHNldCBzdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyAgIGNhc2UgKFwid2FpdGluZ1wiIHx8IFwibG9hZGluZ1wiKTpcbiAgICAgICAgICAgIC8vICAgYnJlYWs7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKCdzdGF0dXMnLCAnZXJyb3InKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcG9zdGVyKCkge1xuICAgICAgICBjb25zdCBwb3N0ZXJWYWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgncG9zdGVyJyk7XG4gICAgICAgIGlmIChwb3N0ZXJWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RlclZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgcG9zdGVyU2V0KCkge1xuICAgICAgICBjb25zdCBwb3N0ZXJWYWwgPSB0aGlzLmdldEF0dHJpYnV0ZSgncG9zdGVyc2V0Jyk7XG4gICAgICAgIGlmIChwb3N0ZXJWYWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RlclZhbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXQgc3JjKCkge1xuICAgICAgICBjb25zdCBzcmMgPSB0aGlzLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIGlmICh0eXBlb2Ygc3JjID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBpbGVTb3VyY2VzKHNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNyYztcbiAgICB9XG4gICAgc2V0IHNyYyhzcmNTdHJpbmcpIHtcbiAgICAgICAgaWYgKHNyY1N0cmluZyA9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnc3JjJywgc3JjU3RyaW5nKTtcbiAgICAgICAgICAgIHRoaXMuY29tcGlsZVNvdXJjZXMoc3JjU3RyaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBwb3N0ZXIgdXJsIHN0cmluZywgYW5kIHNldHMgbG9hZGluZyB0aGF0IHBvc3RlciBpbnRvIG1vdGlvblxuICAgICAqL1xuICAgIHNldCBwb3N0ZXIocG9zdGVyU3RyaW5nKSB7XG4gICAgICAgIGlmIChwb3N0ZXJTdHJpbmcpIHtcbiAgICAgICAgICAgIC8vIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgICAgICAvLyAgIGNhc2UgKFwid2FpdGluZ1wiIHx8IFwibG9hZGluZ1wiKTpcbiAgICAgICAgICAgIC8vICAgYnJlYWs7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgncG9zdGVyJywgcG9zdGVyU3RyaW5nKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRQb3N0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKCdwb3N0ZXInKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvL1xuICAgIGNvbXBpbGVTb3VyY2VzKHNyY1N0cmluZykge1xuICAgICAgICBpZiAoc3JjU3RyaW5nID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmRlYnVnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBzb3VyY2UgcHJvdmlkZWQgZm9yIHZpZGVvIGJhY2tncm91bmRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNyYyA9IHNyY1N0cmluZy50cmltKCk7XG4gICAgICAgIGxldCBzcmNzVG9SZXR1cm4gPSBbXTtcbiAgICAgICAgbGV0IHNyY1N0cmluZ3MgPSBbXTtcbiAgICAgICAgbGV0IHNpemVTdHJpbmdzID0gW107XG4gICAgICAgIGxldCBoYXNNdWx0aXBsZVNyY3MgPSBmYWxzZSwgaGFzU2l6ZXMgPSBmYWxzZTtcbiAgICAgICAgaWYgKHNyYy5pbmRleE9mKCcsJykgPj0gMCkge1xuICAgICAgICAgICAgLy9Mb29rcyBsaWtlIGh0dHBzOi8vc29tZXRoaW5nIDMwMHcsIGh0dHBzOi8vc29tZXRoaW5nIGh0dHBzOi8vYW5vdGhlciBvbmUsIGVsc2UgZXRjIDUwMHcsXG4gICAgICAgICAgICB0aGlzLmRlYnVnICYmIGNvbnNvbGUubG9nKCdIYXMgc2l6ZXMgc2VwYXJhdGVkIGJ5IGNvbW1hJyk7XG4gICAgICAgICAgICBzaXplU3RyaW5ncyA9IHNyY1N0cmluZy5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgaWYgKHNpemVTdHJpbmdzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgc2l6ZVN0cmluZ3MuZm9yRWFjaChzaXplU3RyaW5nID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BsaXRTdHJpbmcgPSBzaXplU3RyaW5nLnRyaW0oKS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3BsaXRTdHJpbmcubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzaXplU3RyaW5nKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaXplID0gcGFyc2VJbnQoc3BsaXRTdHJpbmdbc3BsaXRTdHJpbmcubGVuZ3RoIC0gMV0ucmVwbGFjZSgndycsICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZ2dlcihcIkZvdW5kIGEgc2l6ZTogXCIgKyBzaXplICsgJyBmcm9tIHN0cmluZyAnICsgc2l6ZVN0cmluZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGxpdFN0cmluZy5mb3JFYWNoKChzdHJpbmcpID0+IHsgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHN0cmluZywgc2l6ZSkpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaGFzU2l6ZXMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcmMuaW5kZXhPZignICcpID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgJiYgY29uc29sZS5sb2coJ0hhcyBtdWx0aXBsZSBzb3VyY2VzIHNlcGFyYXRlZCBieSBzcGFjZXMnKTtcbiAgICAgICAgICAgIGlmIChzaXplU3RyaW5ncy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXJyYXkgPSBzcmNTdHJpbmcuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBhcnJheS5mb3JFYWNoKGl0ZW0gPT4geyBzcmNTdHJpbmdzLnB1c2goaXRlbS50cmltKCkpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNyY1N0cmluZ3MuZm9yRWFjaCgoc3RyaW5nKSA9PiB7IHNyY3NUb1JldHVybi5wdXNoKHRoaXMucHJlcGFyZVNpbmdsZVNvdXJjZShzdHJpbmcpKTsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFoYXNTaXplcyAmJiAhaGFzTXVsdGlwbGVTcmNzKSB7XG4gICAgICAgICAgICAvL0J1aWxkIGZyb20gc2luZ2xlIHNvdXJjZVxuICAgICAgICAgICAgc3Jjc1RvUmV0dXJuLnB1c2godGhpcy5wcmVwYXJlU2luZ2xlU291cmNlKHNyYykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc291cmNlcyA9IHRoaXMuY2xlYW51cFNvdXJjZXMoc3Jjc1RvUmV0dXJuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBjb25mbGljdGluZyBzb3VyY2VzIG9mIGRpZmZlcmVudCB0eXBlcyAoY2FuIG9ubHkgaGF2ZSBvbmUgb2YgZWFjaCB0eXBlKVxuICAgICAqL1xuICAgIGNsZWFudXBTb3VyY2VzKHNvdXJjZXMpIHtcbiAgICAgICAgLy9UeXBlIGZpcnN0XG4gICAgICAgIGNvbnN0IGZpcnN0U291cmNlVHlwZSA9IHNvdXJjZXNbMF0udHlwZTtcbiAgICAgICAgaWYgKGZpcnN0U291cmNlVHlwZSA9PSAneW91dHViZScgfHwgZmlyc3RTb3VyY2VUeXBlID09ICd2aW1lbycpIHtcbiAgICAgICAgICAgIHRoaXMudHlwZSA9ICdlbWJlZCc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnR5cGUgPSBmaXJzdFNvdXJjZVR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgLy9SZXR1cm4gb2JqZWN0IGlmIG9ubHkgb25lLlxuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZXMgIT0gJ29iamVjdCcgfHwgc291cmNlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHNvdXJjZXM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZmlyc3RTb3VyY2VUeXBlID09ICd5b3V0dWJlJyB8fCBmaXJzdFNvdXJjZVR5cGUgPT0gJ3ZpbWVvJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc291cmNlc1JlYWR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW3NvdXJjZXNbMF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR2V0IHNpemVzXG4gICAgICAgICAgICAgICAgbGV0IHNpemVzID0gW107XG4gICAgICAgICAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoJ21heFdpZHRoJyBpbiBzb3VyY2UpIHx8IHR5cGVvZiBzb3VyY2UubWF4V2lkdGggIT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNpemVzLmluY2x1ZGVzKHNvdXJjZS5tYXhXaWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemVzLnB1c2goc291cmNlLm1heFdpZHRoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJyZWFrcG9pbnRzID0gc2l6ZXM7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3VyY2VzUmVhZHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBzb3VyY2VzLmZpbHRlcihzcmMgPT4geyByZXR1cm4gc3JjLnR5cGUgPT0gZmlyc3RTb3VyY2VUeXBlOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcmVwYXJlU2luZ2xlU291cmNlKHVybCwgc2l6ZSkge1xuICAgICAgICBjb25zdCB1cmxUeXBlID0gdGhpcy5nZXRTb3VyY2VUeXBlKHVybCk7XG4gICAgICAgIGxldCByZXR1cm5lciA9IHtcbiAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgdHlwZTogdXJsVHlwZSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHVybFR5cGUgPT0gJ3lvdXR1YmUnKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBnZXRTdGFydFRpbWUodXJsLCAneW91dHViZScpO1xuICAgICAgICAgICAgaWYgKHN0YXJ0VGltZSkge1xuICAgICAgICAgICAgICAgIHJldHVybmVyLnN0YXJ0VGltZSA9IHN0YXJ0VGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IC4uLnJldHVybmVyLFxuICAgICAgICAgICAgICAgIGlkOiB0aGlzLmdldFlvdXR1YmVJZEZyb21Tb3VyY2UodXJsKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodXJsVHlwZSA9PSAndmltZW8nKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydFRpbWUgPSBnZXRTdGFydFRpbWUodXJsLCAndmltZW8nKTtcbiAgICAgICAgICAgIGlmIChzdGFydFRpbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm5lci5zdGFydFRpbWUgPSBzdGFydFRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lcixcbiAgICAgICAgICAgICAgICBpZDogdGhpcy5nZXRWaW1lb0lkRnJvbVNvdXJjZSh1cmwpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgZnQgPSB0aGlzLmdldEZpbGVUeXBlKHVybCk7XG4gICAgICAgICAgICBpZiAoc2l6ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybmVyLm1heFdpZHRoID0gc2l6ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybmVyLm1heFdpZHRoID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5yZXR1cm5lciwgZmlsZVR5cGU6IGZ0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTWFsZm9ybWVkU291cmNlKHVybCk7XG4gICAgfVxuICAgIGdldEZpbGVUeXBlKHVybCkge1xuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcubXA0JykpIHtcbiAgICAgICAgICAgIHJldHVybiAnbXA0JztcbiAgICAgICAgfVxuICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCcud2VibScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3dlYm0nO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5vZ2cnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdvZ2cnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmwuaW5jbHVkZXMoJy5vZ20nKSkge1xuICAgICAgICAgICAgcmV0dXJuICdvZ20nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaGFuZGxlTWFsZm9ybWVkU291cmNlKHVybCkge1xuICAgICAgICB0aGlzLmxvZ2dlcihgSGFuZGxpbmcgZXJyb3IgZm9yICR7dXJsfWApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICB0eXBlOiAnZXJyb3InLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRTb3VyY2VUeXBlKHVybCkge1xuICAgICAgICBjb25zdCB5dFRlc3QgPSBuZXcgUmVnRXhwKC9eKD86aHR0cHM/Oik/KD86XFwvXFwvKT8oPzp5b3V0dVxcLmJlXFwvfCg/Ond3d1xcLnxtXFwuKT95b3V0dWJlXFwuY29tXFwvKD86d2F0Y2h8dnxlbWJlZCkoPzpcXC5waHApPyg/OlxcPy4qdj18XFwvKSkoW2EtekEtWjAtOVxcXy1dezcsMTV9KSg/OltcXD8mXVthLXpBLVowLTlcXF8tXSs9W2EtekEtWjAtOVxcXy1dKykqJC8pO1xuICAgICAgICBjb25zdCB2aW1lb1Rlc3QgPSBuZXcgUmVnRXhwKC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbMC05YS16XFwtX10rKS9pKTtcbiAgICAgICAgY29uc3QgdmlkZW9UZXN0ID0gbmV3IFJlZ0V4cCgvLio/XFwvLiood2VibXxtcDR8b2dnfG9nbSkuKj8vaSk7XG4gICAgICAgIGlmICh5dFRlc3QudGVzdCh1cmwpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3lvdXR1YmUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpbWVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAndmltZW8nO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZpZGVvVGVzdC50ZXN0KHVybCkpIHtcbiAgICAgICAgICAgIHJldHVybiAnbG9jYWwnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICdlcnJvcic7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0WW91dHViZUlkRnJvbVNvdXJjZSh1cmwpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcL1xcLyg/Ond3d1xcLik/eW91dHUoPzpcXC5iZXxiZVxcLmNvbSlcXC8oPzp3YXRjaFxcP3Y9fGVtYmVkXFwvKT8oW2EtejAtOV9cXC1dKykvaTtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSByZS5leGVjKHVybCk7XG4gICAgICAgIGlmIChtYXRjaGVzICYmIG1hdGNoZXNbMV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGVzWzFdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZ2V0VmltZW9JZEZyb21Tb3VyY2UodXJsKSB7XG4gICAgICAgIHZhciByZSA9IC9cXC9cXC8oPzp3d3dcXC4pP3ZpbWVvLmNvbVxcLyhbYS16MC05X1xcLV0rKS9pO1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IHJlLmV4ZWModXJsKTtcbiAgICAgICAgaWYgKG1hdGNoZXMgJiYgbWF0Y2hlc1sxXSkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoZXNbMV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQG1ldGhvZCBsb2dnZXIgQSBndWFyZGVkIGNvbnNvbGUgbG9nZ2VyLlxuICAgICAqIEBwYXJhbSBtc2cgdGhlIG1lc3NhZ2UgdG8gc2VuZFxuICAgICAqIEBwYXJhbSBhbHdheXMgV2hldGhlciB0byBhbHdheXMgc2hvdyBpZiBub3QgdmVyYm9zZVxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBsb2dnZXIobXNnLCBhbHdheXMgPSBmYWxzZSkge1xuICAgICAgICBpZiAoYWx3YXlzICYmIHRoaXMuZGVidWcuZW5hYmxlZCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kZWJ1Zy5lbmFibGVkIHx8ICF0aGlzLmRlYnVnLnZlcmJvc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0UGxheWVyRWxlbWVudCB9IGZyb20gXCIuLi91dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgVElNRU9VVCBhcyB0aW1lb3V0RHVyYXRpb24gfSBmcm9tIFwiLi4vY29uc3RhbnRzL2luc3RhbmNlXCI7XG5cbmxldCBwbGF5ZXJJZnJhbWU7XG5sZXQgcGxheWVyT3JpZ2luID0gXCIqXCI7XG5sZXQgcGxheWVyUHJvbWlzZVRpbWVyID0gbnVsbDtcblxuLyoqXG4gKiBDYWxsIHRoZSBWaW1lbyBBUEkgcGVyIHRoZWlyIGd1aWRlbGluZXMuXG4gKi9cbmNvbnN0IGluaXRpYWxpemVWaW1lb0FQSSA9ICgpID0+IHtcbiAgLy8gTm8gZXh0ZXJuYWwgQVBJIGNhbGwgaXMgbmVjZXNzYXJ5LCBwcmVzZXJ2ZWQgZm9yIHBhcml0eSB3aXRoIFlvdVR1YmUgYW5kXG4gIC8vIHBvdGVudGlhbCBhZGRpdGlvbmFsIGludGVncmF0aW9ucy5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXNvbHZlKFwibm8gYXBpIG5lZWRlZFwiKTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgY3Jvc3MgZnJhbWUgcG9zdE1lc3NhZ2UgaGFuZGxlcnMsIGdldHMgcHJvcGVyIGRpbWVuc2lvbnMgb2YgcGxheWVyLFxuICogYW5kIHNldHMgcmVhZHkgc3RhdGUgZm9yIHRoZSBwbGF5ZXIgYW5kIGNvbnRhaW5lci5cbiAqXG4gKi9cbmNvbnN0IHBvc3RNZXNzYWdlTWFuYWdlciA9IChhY3Rpb24sIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGRhdGEgPSB7XG4gICAgbWV0aG9kOiBhY3Rpb24sXG4gIH07XG5cbiAgaWYgKHZhbHVlKSB7XG4gICAgZGF0YS52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICBwbGF5ZXJJZnJhbWUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5ldmFsKFxuICAgIFwiKGZ1bmN0aW9uKHBsYXllcklmcmFtZSl7IHBsYXllcklmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKFwiICtcbiAgICAgIG1lc3NhZ2UgK1xuICAgICAgXCIsIFwiICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHBsYXllck9yaWdpbikgK1xuICAgICAgXCIpIH0pXCJcbiAgKShwbGF5ZXJJZnJhbWUpO1xufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBwbGF5ZXIgYW5kIGJpbmQgcGxheWVyIGV2ZW50cyB3aXRoIGEgcG9zdE1lc3NhZ2UgaGFuZGxlci5cbiAqL1xuY29uc3QgaW5pdGlhbGl6ZVZpbWVvUGxheWVyID0gKHtcbiAgd2luLFxuICBpbnN0YW5jZSxcbiAgY29udGFpbmVyLFxuICB2aWRlb0lkLFxuICBzdGFydFRpbWUsXG4gIHJlYWR5Q2FsbGJhY2ssXG4gIHN0YXRlQ2hhbmdlQ2FsbGJhY2ssXG59KSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgbG9nZ2VyID0gaW5zdGFuY2UubG9nZ2VyIHx8IGZ1bmN0aW9uICgpIHt9O1xuICAgIHBsYXllcklmcmFtZSA9IHdpbi5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO1xuICAgIHBsYXllcklmcmFtZS5pZCA9IFwidmltZW9wbGF5ZXJcIjtcbiAgICBjb25zdCBwbGF5ZXJDb25maWcgPSBcIiZiYWNrZ3JvdW5kPTFcIjtcbiAgICBwbGF5ZXJJZnJhbWUuc3JjID1cbiAgICAgIFwiLy9wbGF5ZXIudmltZW8uY29tL3ZpZGVvL1wiICsgdmlkZW9JZCArIFwiP2FwaT0xXCIgKyBwbGF5ZXJDb25maWc7XG4gICAgY29uc3Qgd3JhcHBlciA9IGdldFBsYXllckVsZW1lbnQoY29udGFpbmVyKTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHBsYXllcklmcmFtZSk7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSB7XG4gICAgICBpZnJhbWU6IHBsYXllcklmcmFtZSxcbiAgICAgIHNldFBsYXliYWNrUmF0ZTogKCkgPT4ge30sXG4gICAgfTtcbiAgICByZXNvbHZlKHBsYXllcik7XG5cbiAgICBjb25zdCBnZXRWaWRlb0RldGFpbHMgPSAoKSA9PiB7XG4gICAgICBwb3N0TWVzc2FnZU1hbmFnZXIoXCJnZXREdXJhdGlvblwiKTtcbiAgICAgIHBvc3RNZXNzYWdlTWFuYWdlcihcImdldFZpZGVvSGVpZ2h0XCIpO1xuICAgICAgcG9zdE1lc3NhZ2VNYW5hZ2VyKFwiZ2V0VmlkZW9XaWR0aFwiKTtcbiAgICB9O1xuXG4gICAgbGV0IHJldHJ5VGltZXIgPSBudWxsO1xuICAgIGNvbnN0IHN5bmNBbmRTdGFydFBsYXliYWNrID0gKGlzUmV0cnlpbmcgPSBmYWxzZSkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhaXNSZXRyeWluZyAmJlxuICAgICAgICAoIXBsYXllci5kaW1lbnNpb25zLndpZHRoIHx8XG4gICAgICAgICAgIXBsYXllci5kaW1lbnNpb25zLmhlaWdodCB8fFxuICAgICAgICAgICFwbGF5ZXIuZHVyYXRpb24pXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNSZXRyeWluZykge1xuICAgICAgICBnZXRWaWRlb0RldGFpbHMoKTtcbiAgICAgIH1cblxuICAgICAgcGxheWVyLmRpbWVuc2lvbnMud2lkdGggPVxuICAgICAgICBwbGF5ZXIuZGltZW5zaW9ucy53aWR0aCB8fCBwbGF5ZXIuaWZyYW1lLnBhcmVudE5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICBwbGF5ZXIuZGltZW5zaW9ucy5oZWlnaHQgPVxuICAgICAgICBwbGF5ZXIuZGltZW5zaW9ucy5oZWlnaHQgfHwgcGxheWVyLmlmcmFtZS5wYXJlbnROb2RlLm9mZnNldEhlaWdodDtcbiAgICAgIHBsYXllci5kdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbiB8fCAxMDtcblxuICAgICAgLy8gT25seSByZXF1aXJlZCBmb3IgVmltZW8gQmFzaWMgdmlkZW9zLCBvciB2aWRlbyBVUkxzIHdpdGggYSBzdGFydCB0aW1lIGhhc2guXG4gICAgICAvLyBQbHVzIGFuZCBQcm8gdXRpbGl6ZSBgYmFja2dyb3VuZD0xYCBVUkwgcGFyYW1ldGVyLlxuICAgICAgLy8gU2VlIGh0dHBzOi8vdmltZW8uY29tL2ZvcnVtcy90b3BpYzoyNzgwMDFcbiAgICAgIHBvc3RNZXNzYWdlTWFuYWdlcihcInNldFZvbHVtZVwiLCBcIjBcIik7XG4gICAgICBwb3N0TWVzc2FnZU1hbmFnZXIoXCJzZXRMb29wXCIsIFwidHJ1ZVwiKTtcbiAgICAgIHBvc3RNZXNzYWdlTWFuYWdlcihcInNlZWtUb1wiLCBzdGFydFRpbWUpOyAvLyBgc2Vla1RvYCBoYW5kbGVzIHBsYXliYWNrIGFzIHdlbGxcbiAgICAgIHBvc3RNZXNzYWdlTWFuYWdlcihcImFkZEV2ZW50TGlzdGVuZXJcIiwgXCJwbGF5UHJvZ3Jlc3NcIik7XG5cbiAgICAgIHJlYWR5Q2FsbGJhY2socGxheWVyKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWFkeSA9ICgpID0+IHtcbiAgICAgIGlmIChwbGF5ZXJQcm9taXNlVGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHBsYXllclByb21pc2VUaW1lcik7XG4gICAgICAgIHBsYXllclByb21pc2VUaW1lciA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGxheWVyLmRpbWVuc2lvbnMpIHtcbiAgICAgICAgcGxheWVyLmRpbWVuc2lvbnMgPSB7fTtcbiAgICAgICAgZ2V0VmlkZW9EZXRhaWxzKCk7XG5cbiAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjayhcImJ1ZmZlcmluZ1wiKTtcbiAgICAgICAgcmV0cnlUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGxvZ2dlci5jYWxsKGluc3RhbmNlLCBcInJldHJ5aW5nXCIpO1xuICAgICAgICAgIHN5bmNBbmRTdGFydFBsYXliYWNrKHRydWUpO1xuICAgICAgICB9LCB0aW1lb3V0RHVyYXRpb24gKiAwLjc1KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgb25NZXNzYWdlUmVjZWl2ZWQgPSAoZXZlbnQpID0+IHtcbiAgICAgIGlmICghL15odHRwcz86XFwvXFwvcGxheWVyLnZpbWVvLmNvbS8udGVzdChldmVudC5vcmlnaW4pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcGxheWVyT3JpZ2luID0gZXZlbnQub3JpZ2luO1xuXG4gICAgICBsZXQgZGF0YSA9IGV2ZW50LmRhdGE7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoZGF0YS5ldmVudCkge1xuICAgICAgICBjYXNlIFwicmVhZHlcIjpcbiAgICAgICAgICBvblJlYWR5KHBsYXllck9yaWdpbik7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcInBsYXlQcm9ncmVzc1wiOlxuICAgICAgICBjYXNlIFwidGltZXVwZGF0ZVwiOlxuICAgICAgICAgIGlmIChyZXRyeVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQocmV0cnlUaW1lcik7XG4gICAgICAgICAgICByZXRyeVRpbWVyID0gbnVsbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjayhcInBsYXlpbmdcIiwgZGF0YSk7XG4gICAgICAgICAgcG9zdE1lc3NhZ2VNYW5hZ2VyKFwic2V0Vm9sdW1lXCIsIFwiMFwiKTtcblxuICAgICAgICAgIGlmIChkYXRhLmRhdGEucGVyY2VudCA+PSAwLjk4ICYmIHN0YXJ0VGltZSA+IDApIHtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlTWFuYWdlcihcInNlZWtUb1wiLCBzdGFydFRpbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChkYXRhLm1ldGhvZCkge1xuICAgICAgICBjYXNlIFwiZ2V0VmlkZW9IZWlnaHRcIjpcbiAgICAgICAgICBsb2dnZXIuY2FsbChpbnN0YW5jZSwgZGF0YS5tZXRob2QpO1xuICAgICAgICAgIHBsYXllci5kaW1lbnNpb25zLmhlaWdodCA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgc3luY0FuZFN0YXJ0UGxheWJhY2soKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcImdldFZpZGVvV2lkdGhcIjpcbiAgICAgICAgICBsb2dnZXIuY2FsbChpbnN0YW5jZSwgZGF0YS5tZXRob2QpO1xuICAgICAgICAgIHBsYXllci5kaW1lbnNpb25zLndpZHRoID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICBzeW5jQW5kU3RhcnRQbGF5YmFjaygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiZ2V0RHVyYXRpb25cIjpcbiAgICAgICAgICBsb2dnZXIuY2FsbChpbnN0YW5jZSwgZGF0YS5tZXRob2QpO1xuICAgICAgICAgIHBsYXllci5kdXJhdGlvbiA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgaWYgKHN0YXJ0VGltZSA+PSBwbGF5ZXIuZHVyYXRpb24pIHtcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN5bmNBbmRTdGFydFBsYXliYWNrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNvbnN0IG1lc3NhZ2VIYW5kbGVyID0gKGUpID0+IHtcbiAgICAgIG9uTWVzc2FnZVJlY2VpdmVkKGUpO1xuICAgIH07XG5cbiAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgbWVzc2FnZUhhbmRsZXIsIGZhbHNlKTtcblxuICAgIHBsYXllci5kZXN0cm95ID0gKCkgPT4ge1xuICAgICAgd2luLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG1lc3NhZ2VIYW5kbGVyKTtcbiAgICAgIC8vIElmIHRoZSBpZnJhbWUgbm9kZSBoYXMgYWxyZWFkeSBiZWVuIHJlbW92ZWQgZnJvbSB0aGUgRE9NIGJ5IHRoZVxuICAgICAgLy8gaW1wbGVtZW50ZXIsIHBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQgd2lsbCBlcnJvciBvdXQgdW5sZXNzIHdlIGRvXG4gICAgICAvLyB0aGlzIGNoZWNrIGhlcmUgZmlyc3QuXG4gICAgICBpZiAocGxheWVyLmlmcmFtZS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgIHBsYXllci5pZnJhbWUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChwbGF5ZXIuaWZyYW1lKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcGxheWVyUHJvbWlzZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZWplY3QoXCJSYW4gb3V0IG9mIHRpbWVcIik7XG4gICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyBpbml0aWFsaXplVmltZW9BUEksIGluaXRpYWxpemVWaW1lb1BsYXllciB9O1xuIiwiaW1wb3J0IHsgZ2V0UGxheWVyRWxlbWVudCB9IGZyb20gJy4uL3V0aWxzL3V0aWxzJ1xuXG4vKipcbiAqIFNldCB1cCB0aGUgWW91VHViZSBzY3JpcHQgaW5jbHVkZSBpZiBpdCdzIG5vdCBwcmVzZW50XG4gKi9cbmNvbnN0IGluaXRpYWxpemVZb3VUdWJlQVBJID0gKHdpbikgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIGlmICh3aW4uZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdFtzcmMqPVwid3d3LnlvdXR1YmUuY29tL2lmcmFtZV9hcGlcIl0ubG9hZGVkJykpIHtcbiAgICAgIHJlc29sdmUoJ2FscmVhZHkgbG9hZGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGFnID0gd2luLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHRhZy5zcmMgPSAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaSc7XG4gICAgY29uc3QgZmlyc3RTY3JpcHRUYWcgPSB3aW4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgIGZpcnN0U2NyaXB0VGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRhZywgZmlyc3RTY3JpcHRUYWcpO1xuICAgIHRhZy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2dCkgPT4ge1xuICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJyk7XG4gICAgICByZXNvbHZlKCdhcGkgc2NyaXB0IHRhZyBjcmVhdGVkIGFuZCBsb2FkZWQnKTtcbiAgICB9LCB0cnVlKTtcbiAgICB0YWcuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCAoZXZ0KSA9PiB7XG4gICAgICByZWplY3QoJ0ZhaWxlZCB0byBsb2FkIFlvdVR1YmUgc2NyaXB0OiAnLCBldnQpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogWW91VHViZSBldmVudCBoYW5kbGVyLiBBZGQgdGhlIHByb3BlciBjbGFzcyB0byB0aGUgcGxheWVyIGVsZW1lbnQsIGFuZCBzZXRcbiAqIHBsYXllciBwcm9wZXJ0aWVzLiBBbGwgcGxheWVyIG1ldGhvZHMgdmlhIFlvdVR1YmUgQVBJLlxuICovXG5jb25zdCBvbllvdVR1YmVQbGF5ZXJSZWFkeSA9IChldmVudCwgc3RhcnRUaW1lKSA9PiB7XG4gIGNvbnN0IHBsYXllciA9IGV2ZW50LnRhcmdldDtcbiAgcGxheWVyLmlmcmFtZSA9IHBsYXllci5nZXRJZnJhbWUoKTtcbiAgcGxheWVyLm11dGUoKTtcbiAgcGxheWVyLnJlYWR5ID0gdHJ1ZTtcbiAgcGxheWVyLnNlZWtUbyhzdGFydFRpbWUgPCBwbGF5ZXIuZ2V0RHVyYXRpb24oKSA/IHN0YXJ0VGltZSA6IDApO1xuICBwbGF5ZXIucGxheVZpZGVvKCk7XG59O1xuXG4vKipcbiAqIFlvdVR1YmUgZXZlbnQgaGFuZGxlci4gRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHRvIGxvb3AgdGhlIHZpZGVvLlxuICovXG5jb25zdCBvbllvdVR1YmVQbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCwgc3RhcnRUaW1lLCB3aW4sIHNwZWVkID0gMSkgPT4ge1xuICBjb25zdCBwbGF5ZXIgPSBldmVudC50YXJnZXQ7XG4gIGNvbnN0IGR1cmF0aW9uID0gKHBsYXllci5nZXREdXJhdGlvbigpIC0gc3RhcnRUaW1lKSAvIHNwZWVkO1xuXG4gIGNvbnN0IGRvTG9vcCA9ICgpID0+IHtcbiAgICBpZiAoKHBsYXllci5nZXRDdXJyZW50VGltZSgpICsgMC4xKSA+PSBwbGF5ZXIuZ2V0RHVyYXRpb24oKSkge1xuICAgICAgcGxheWVyLnBhdXNlVmlkZW8oKTtcbiAgICAgIHBsYXllci5zZWVrVG8oc3RhcnRUaW1lKTtcbiAgICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvTG9vcCk7XG4gIH07XG5cbiAgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5CVUZGRVJJTkcgJiZcbiAgICAgKHBsYXllci5nZXRWaWRlb0xvYWRlZEZyYWN0aW9uKCkgIT09IDEpICYmXG4gICAgIChwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA9PT0gMCB8fCBwbGF5ZXIuZ2V0Q3VycmVudFRpbWUoKSA+IGR1cmF0aW9uIC0gLTAuMSkpIHtcbiAgICByZXR1cm4gJ2J1ZmZlcmluZyc7XG4gIH0gZWxzZSBpZiAoZXZlbnQuZGF0YSA9PT0gd2luLllULlBsYXllclN0YXRlLlBMQVlJTkcpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9Mb29wKTtcbiAgICByZXR1cm4gJ3BsYXlpbmcnO1xuICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEgPT09IHdpbi5ZVC5QbGF5ZXJTdGF0ZS5FTkRFRCkge1xuICAgIHBsYXllci5wbGF5VmlkZW8oKTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIHRoZSBwbGF5ZXIgYW5kIGJpbmQgcGxheWVyIGV2ZW50cy5cbiAqL1xuY29uc3QgaW5pdGlhbGl6ZVlvdVR1YmVQbGF5ZXIgPSAoe1xuICBjb250YWluZXIsIHdpbiwgdmlkZW9JZCwgc3RhcnRUaW1lLCBzcGVlZCwgcmVhZHlDYWxsYmFjaywgc3RhdGVDaGFuZ2VDYWxsYmFja1xufSkgPT4ge1xuICBsZXQgcGxheWVyRWxlbWVudCA9IGdldFBsYXllckVsZW1lbnQoY29udGFpbmVyKVxuXG4gIGNvbnN0IG1ha2VQbGF5ZXIgPSAoKSA9PiB7XG4gICAgcmV0dXJuIG5ldyB3aW4uWVQuUGxheWVyKHBsYXllckVsZW1lbnQsIHtcbiAgICAgIHZpZGVvSWQ6IHZpZGVvSWQsXG4gICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgICdhdXRvaGlkZSc6IDEsXG4gICAgICAgICdhdXRvcGxheSc6IDAsXG4gICAgICAgICdjb250cm9scyc6IDAsXG4gICAgICAgICdlbmFibGVqc2FwaSc6IDEsXG4gICAgICAgICdpdl9sb2FkX3BvbGljeSc6IDMsXG4gICAgICAgICdsb29wJzogMCxcbiAgICAgICAgJ21vZGVzdGJyYW5kaW5nJzogMSxcbiAgICAgICAgJ3BsYXlzaW5saW5lJzogMSxcbiAgICAgICAgJ3JlbCc6IDAsXG4gICAgICAgICdzaG93aW5mbyc6IDAsXG4gICAgICAgICd3bW9kZSc6ICdvcGFxdWUnXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgb25Zb3VUdWJlUGxheWVyUmVhZHkoZXZlbnQsIHN0YXJ0VGltZSk7XG4gICAgICAgICAgcmVhZHlDYWxsYmFjayhldmVudC50YXJnZXQpO1xuICAgICAgICB9LFxuICAgICAgICBvblN0YXRlQ2hhbmdlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gb25Zb3VUdWJlUGxheWVyU3RhdGVDaGFuZ2UoZXZlbnQsIHN0YXJ0VGltZSwgd2luLCBzcGVlZCk7XG4gICAgICAgICAgc3RhdGVDaGFuZ2VDYWxsYmFjayhzdGF0ZSwgc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBjaGVja0FQSUxvYWRlZCA9ICgpID0+IHtcbiAgICAgIGlmICh3aW4uWVQubG9hZGVkID09PSAxKSB7XG4gICAgICAgIHJlc29sdmUobWFrZVBsYXllcigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2hlY2tBUElMb2FkZWQsIDEwMCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrQVBJTG9hZGVkKCk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHtcbiAgaW5pdGlhbGl6ZVlvdVR1YmVBUEksXG4gIGluaXRpYWxpemVZb3VUdWJlUGxheWVyXG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjRjN2JmZDEzMGY5MDY3MWFiYzM1XCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9