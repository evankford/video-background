import { YOUTUBE_REGEX, VIMEO_REGEX } from 'constants/instance';

import { initializeVimeoAPI, initializeVimeoPlayer } from './utils/vimeo';
import { initializeYouTubeAPI, initializeYouTubePlayer } from './utils/youtube';
import { findPlayerAspectRatio, getStartTime, getVideoID, getVideoSource } from './utils/utils'
import Icons from './utils/icons';

 var
    is_ios = /iP(ad|od|hone)/i.test(window.navigator.userAgent),
    is_safari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

/**
 * Object for choosing the correct video initializer.
 */
const videoSourceModules = {
  vimeo: {
    api: initializeVimeoAPI,
    player: initializeVimeoPlayer
  },
  youtube: {
    api: initializeYouTubeAPI,
    player: initializeYouTubePlayer
  }
}


/**
 * @class VideoBackground creates a custom web component
 * @todo separate statuses and capabilities and stores into their own objects
 * @todo allow unmuting
 */
export class VideoBackground extends HTMLElement {
  breakpoints?:number[] /** Contains an array of breakpoints to reload smaller sources when passed */
  browserCanAutoPlay: boolean /** Dynamically checks when  */
  container : HTMLElement
  debug: {
    enabled: boolean,
    verbose: boolean,
  };
  can: VideoCan
  observer?: IntersectionObserver
  muteButton?:HTMLElement
  overlayEl?:HTMLElement
  pauseButton?:HTMLElement
  player?: YoutubeAPIPlayer
  playerReady: boolean;
  isIntersecting: boolean;
  icons?: Icons
  paused: boolean
  muted: boolean
  posterEl?:HTMLImageElement
  scaleFactor: number
  size?: string
  startTime?:number
  sourceId?:string
  hasStarted: boolean;
  sources?: SourcesShape
  sourcesReady: boolean
  type?: 'local' | 'youtube' | 'vimeo' | 'error'
  url?:string
  videoAspectRatio:number
  videoCanAutoPlay: boolean
  videoEl?:HTMLVideoElement
  widthStore?:number

  constructor() {
    super();


    //Setting up props
    this.sourcesReady = false;
    this.container = this;
    this.browserCanAutoPlay = false;
    this.videoCanAutoPlay = false
    this.scaleFactor = 1.2;
    this.videoAspectRatio = .69;
    this.hasStarted = false;
    this.playerReady = false;
    this.isIntersecting = false;
    this.can = { unmute: this.hasAttribute('can-unmute'), pause:  this.hasAttribute('can-pause')};
    this.muted = this.getAttribute('muted') !== 'false';

    if (is_ios && is_safari) {
      this.muted = true;
    }
    this.paused = false;
    this.player = {
      ready: false,
      shouldPlay: false,
      playVideo: ()=>{},
      pauseVideo: ()=>{},
      mute: ()=>{},
      unmute: ()=> {},
    }



    //Setting up debug
    if (this.getAttribute('debug')) {
      if (this.getAttribute('debug') == "verbose") {

        this.debug = { enabled: true, verbose: true}
      }else {
        this.debug = { enabled: true, verbose: false}
      }
    } else {
      this.debug = {enabled : false, verbose: false}
    }
    this.logger("Debugging video-background.");
    this.logger(this)
    this.init();
  }


  init() {

    this.status = "waiting";
    this.compileSources(this.src)
    this.buildDOM();
    this.buildIntersectionObserver();

    this.addEventListener('playCheck', this.handlePlayCheck.bind(this));

  }


  buildDOM() {
    this.buildOverlay();
    this.buildPoster();

    // canAutoPlay.video({timeout: 1200, muted:true}).then(({result, error}) => {
    //   if (result == false) {
    //     this.logger("Browser autoplay check failed");
    //     this.handleFallbackNoVideo();
    //   } else {
        this.browserCanAutoPlay = true;
        this.buildVideo();
      // }
    // })
    //Check for overlay things.
    this.buildIcons();
  }

  buildIcons() {
    console.log(this.can);
    if (this.can.unmute || this.can.pause) {
      this.icons = new Icons({wrapper: this,can: this.can, onMuteUnmute: this.toggleMute.bind(this), onPausePlay: this.togglePause.bind(this) , initialState: { muted: this.muted, paused: false}})
    }
  }

  buildVideo() {
    //Never should have mixed sources.

    if (!this.sourcesReady) {
      return false;
    }
    this.logger("Building video based on type: " + this.type);
    if (this.type == 'local' ) {
      this.buildLocalVideo()
      //Check to make sure we have sources
    } else {
      this.initializeVideoAPI();
      window.addEventListener('resize' , this.syncPlayer.bind(this));
    }
  }


  handleFallbackNoVideo() {
    this.status = "fallback";
    this.logger("Video Won't play, defaulting to fallback")
    this.status = "fallback";
  }

  /**
   * @method initializeVideoAPI Load the API for the appropriate source. This abstraction normalizes the
   * interfaces for YouTube and Vimeo, and potentially other providers.
   * @return {undefined}
   */
  initializeVideoAPI() {
    if (!this.url || !this.player || (this.type != 'youtube' && this.type != 'vimeo')) {
      this.logger('Problem with initializing video API. Contact the developer', true);
      return
    }

    this.sourceId = getVideoID(this.url, this.type);

    if (this.browserCanAutoPlay  && this.sourceId ) {
      this.player.ready = false

      const sourceAPIFunction = videoSourceModules[this.type].api
      const apiPromise = sourceAPIFunction(window);
      apiPromise.then((message) => {
        this.logger(message);
        if (this.player) {
          this.player.ready = false
        }
        this.initializeVideoPlayer()
      }).catch((message) => {
        document.body.classList.add('ready')
        this.logger(message)
      })
    } else {
      document.body.classList.add('ready')
    }
  }

   /**
   * @method initializeVideoPlayer Initialize the video player and register its callbacks.
   * @return {undefined}
   */
  initializeVideoPlayer() {
     if (!this.url || !this.player || (this.type != 'youtube' && this.type != 'vimeo')) {
      this.logger('Problem with initializing video API. Contact the developer', true);
      return
    }
    if (this.player.ready) {
      try {
        this.player.destroy()
      } catch (e) {
        // nothing to destroy
      }
      this.player.ready = false
    }

    if ((this.type != 'youtube' && this.type != 'vimeo')) {
      return false;
    }

    const sourcePlayerFunction = videoSourceModules[this.type].player
    const playerPromise = sourcePlayerFunction({
      instance: this,
      container: this,
      win: window,
      videoId: this.sourceId,
      speed: 1,
      startTime: this.startTime,
      readyCallback: () => {

        if (this.player && this.player.iframe) {
          this.player.iframe.classList.add('background-video')
        }
        this.videoAspectRatio = findPlayerAspectRatio(this.container, this.player, this.type)
        this.syncPlayer()
        const readyEvent = new CustomEvent('ready')
        this.container.dispatchEvent(readyEvent)
        this.container.dispatchEvent(new CustomEvent('playCheck'))
        this.playerReady = true;
      },
      stateChangeCallback: (state:string, data:number) => {
        switch (state) {
        case 'playing':
          this.status = 'playing';
          this.syncPlayer();
          if (!this.videoCanAutoPlay) {
            // The video element begain to auto play.
            // this.logger('video started playing')
            this.videoCanAutoPlay = true
            if (this.player) {
              this.player.ready = true
              if (this.player.iframe) {
                this.player.iframe.classList.add('ready')
              }
            }
            this.container.classList.remove('mobile')
          }
          break
        }
        if (state) {
          // this.logger(state)
        }
        if (data) {
          this.logger(data.toString())
        }
      }
    })

    playerPromise.then(player => {
      this.player = player
    }, reason => {
      // Either the video embed failed to load for any reason (e.g. network latency, deleted video, etc.),
      // or the video element in the embed was not configured to properly auto play.
      this.logger(reason)
    })
  }

  syncPlayer() {
    this.scaleVideo();
  }

  /**
   * @method scaleVideo The IFRAME will be the entire width and height of its container, but the video
   * may be a completely different size and ratio. Scale up the IFRAME so the inner video
   * behaves in the proper `mode`, with optional additional scaling to zoom in. Also allow
   * ImageLoader to reload the custom fallback image, if appropriate.
   * @param {Number} [scaleValue] A multiplier used to increase the scaled size of the media.
   * @return {undefined}
   */
  scaleVideo(scaleValue = 1.3) {
    if (!this.player) {
      return;
    }

    const playerIframe = this.player.iframe
    if (!playerIframe) {
      return
    }

    let scale:number = this.scaleFactor ?? scaleValue;


    if (this.mode !== 'fill') {

      playerIframe.style.width = ''
      playerIframe.style.height = ''
      return
    }

    const iframeParent = playerIframe.parentElement;
    if (iframeParent == null ) {
      return;
    }
    const containerWidth = iframeParent.clientWidth
    const containerHeight = iframeParent.clientHeight
    const containerRatio = containerWidth / containerHeight
    let pWidth = 0
    let pHeight = 0
    if (containerRatio > this.videoAspectRatio) {
      // at the same width, the video is taller than the window
      pWidth = containerWidth * scale
      pHeight = containerWidth * scale / this.videoAspectRatio
    } else if (this.videoAspectRatio > containerRatio) {
      // at the same width, the video is shorter than the window
      pWidth = containerHeight * scale * this.videoAspectRatio
      pHeight = containerHeight * scale
    } else {
      // the window and video ratios match
      pWidth = containerWidth * scale
      pHeight = containerHeight * scale
    }
    playerIframe.style.width = pWidth + 'px'
    playerIframe.style.height = pHeight + 'px'
    playerIframe.style.left = 0 - ((pWidth - containerWidth) / 2) + 'px'
    playerIframe.style.top = 0 - ((pHeight - containerHeight) / 2) + 'px'
  }



  /**
   * @method buildLocalVideo Load a video element using local files or sets of files.
   * @todo abstract out these functions, maybe to a separate class?
   * @returns {undefined}
   */

  buildLocalVideo() {
    this.logger("Building local video")
    if (this.videoEl && this.videoEl.hasAttribute('playsinline')) {
      this.removeChild(this.videoEl);
    }

    if (!this.sources) {
      this.logger("No sources for local video")
      return this.handleFallbackNoVideo();
    }
    //We need to get size when breakpoints
    let srcSet:SourcesShape = this.sources;
    if (this.breakpoints && this.breakpoints.length > 0) {
      this.logger("Video has breakpoints");
        srcSet = this.getSourcesFilteredBySize(this.sources);
        window.addEventListener('resize', this.checkIfPassedBreakpoints.bind(this));
    }
    if (srcSet && srcSet.length ) {
      this.videoEl = document.createElement('video');
      this.videoEl.classList.add('vbg__video')
      this.videoEl.classList.add('vbg--loading')
      this.videoEl.setAttribute('playsinline', '');
      this.videoEl.setAttribute('preload', 'metadata');
      this.videoEl.setAttribute('muted', "true");

      if (typeof this.poster == 'string') {
        this.videoEl.setAttribute('poster', this.poster);
      }
      if (this.autoplay) {
        this.videoEl.setAttribute('autoplay', 'false');
      }
      if (this.loop) {
        this.videoEl.setAttribute('loop', '')
      }
      if (this.muted) {
        this.videoEl.setAttribute('muted', '')
      }

      this.videoEl.innerHTML = "";

      srcSet.forEach(src=> {
        const child = document.createElement('source');

        if ('fileType' in src) {
          child.type = 'video/' + src.fileType;
        }
        child.src = src.url;
        child.addEventListener('loadeddata',   function() {

          self.videoEl && self.videoEl.classList.remove('vbg--loading');
        })
        this.videoEl?.append(child);
      })



      const self = this;
      this.playerReady = true;
      this.append(this.videoEl);

      this.videoEl.addEventListener('canplay', ()=> {
        self.videoEl?.classList.remove('vbg--loading');
      })

      this.container.dispatchEvent(new CustomEvent('playCheck'))
    } else {
      this.logger("No source found!")
    }
  }

  handlePlayCheck() {
    this.logger(`Ready: ${this.playerReady}, intersecting: ${this.isIntersecting}`)
    if (this.type == 'local' && this.videoEl) {
    if (this.playerReady && this.isIntersecting) {
      this.status = 'playing';
      this.hasStarted = true;
        if (this.autoplay) {
          if (!this.videoEl.currentTime || this.videoEl.currentTime <= 0.1) {
            this.videoEl.setAttribute('autoplay', '');
            this.videoEl.load();
          } else {
            this.videoEl.play();
          }
        }
      } else {
        this.videoEl.pause();
      }
    } else { //Handle shouldn't play

       if (this.isIntersecting) {
          this.setPlayerReady(true);
          this.status = this.hasStarted ? 'paused' : 'waiting';
          // this.player.playVideo();


        } else {
            this.setPlayerReady(false)
          }
        }
    if (this.muted) {
      this.muteVideo()
    }
  }

  setPlayerReady(isReady = true) {
    const self = this;
    if (!this.player) {
       setTimeout(() => {
        self.setPlayerReady();
      }, 500);;
      return
    }

    this.player.shouldPlay = isReady;
    if (this.player) {
      if (isReady) {
        this.player.playVideo();


      }else {
        this.player.pauseVideo()
      }
    }
    if (this.player?.iframe) {
      this.player.iframe.setAttribute('data-should-play', isReady.toString())
    }
  }

  toggleMute() {
    console.log("Toggling mute:" + this.muted)
    if (this.muted == true) {
      this.unmuteVideo()
      this.muted = false;
    } else {
      this.muteVideo();
      this.muted = true;
    }
  }

  togglePause() {
    if (this.paused) {
      if (this.type == 'local' && this.videoEl) {
        this.videoEl.play();
      } else if (this.player) {
        this.player.playVideo();
      }
    } else {
      if (this.type == 'local' && this.videoEl) {
        this.videoEl.pause();
      } else if (this.player) {
        this.player.pauseVideo();
      }
    }
    this.paused = !this.paused;
  }


  muteVideo() {
    this.logger('muting video');
    if (this.type == 'local') {
      const videoToMute = this.querySelector('video');
      if (videoToMute) {

        videoToMute.volume = 0;
        videoToMute.muted = true;
      }
    } else if (this.player) {
      this.player.mute();
    }

  }
  unmuteVideo() {
    this.logger('unmuting video');
    if (this.type == 'local' && this.videoEl) {
      const videoToMute = this.querySelector('video');
      if (videoToMute) {
        videoToMute.volume = 0.7;
        videoToMute.muted = false;

      }
    } else if (this.player) {
      this.player.unmute();
    }

  }

  getSourcesFilteredBySize(sources:SourcesShape):SourcesShape {
    const wW = window.innerWidth;
    this.widthStore = wW;

    let sortedBySize:SizedSources = { 'max' : []};
    sources.forEach((source)=> {
      if (('maxWidth' in source) && source.maxWidth ) {
        const w = source.maxWidth.toString();
        if (sortedBySize != undefined && !Object.keys(sortedBySize).includes(w)) {
            sortedBySize[w] = [ source ];

        } else {
          sortedBySize[w].push(source);
        }
      } else if ('maxWidth' in source) {
        sortedBySize['max'].push(source)
      }
    })

    if (!this.breakpoints) {
      this.logger('Breakpoints not defined at size filter. Something\'s wrong', true);
      return sources;
    }

    let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b)
    const currentIndex = breakpointsWithPresent.indexOf(wW);
    if (currentIndex == breakpointsWithPresent.length - 1) {
      return sortedBySize['max'];
    } else {
      return sortedBySize[breakpointsWithPresent[currentIndex+1].toString()];
    }


  }

  checkIfPassedBreakpoints() {

    if (!this.widthStore || !this.breakpoints) {
      return;
    }

    const wW = window.innerWidth;
    let breakpointsWithPast = [...this.breakpoints, this.widthStore].sort((a, b) => a - b)
    let breakpointsWithPresent = [...this.breakpoints, wW].sort((a, b) => a - b)
    const pastIndex = breakpointsWithPast.indexOf(this.widthStore);
    const currentIndex = breakpointsWithPresent.indexOf(wW);

    if (pastIndex != currentIndex) {
      this.buildLocalVideo();
    }
  }

  checkForInherentPoster():HTMLImageElement|false {
    const inherentPoster = this.container.querySelector<HTMLImageElement>('img')
    if (inherentPoster) {
      return inherentPoster;
    }

    return false;
  }

  buildPoster() {

    let hasInherentPoster = false
    //Gets a poster image element that's a child of the video-background element
    const inherentPoster  = this.checkForInherentPoster();
    if (!this.posterSet && !this.poster && !inherentPoster) {
      return false;
    }
    this.logger(`Hello, looking for an inherent image. The result is ${inherentPoster}.`)
    if (inherentPoster != false) {
      this.logger("Found an inherent poster");
      //Found a poster element
      hasInherentPoster = true;
      this.posterEl = inherentPoster;
      this.container.innerHTML = '';
    } else {
      this.container.innerHTML = '';
      //Create a poster element if none found.
      this.posterEl = document.createElement('img');
      this.posterEl.classList.add('vbg--loading')
    }

    //Add styling classes;
    this.posterEl.classList.add('vbg__poster')

    //Using data on the videobackground
    if (this.poster) {
      const self = this;
      const imageLoaderEl = new Image();
      imageLoaderEl.src = this.poster;
      imageLoaderEl.addEventListener('load', function() {
        if (self && self.posterEl) {
          self.posterEl.src = imageLoaderEl.src;
          self.posterEl.classList.remove('vbg--loading')
        }
      })
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
      threshold: 0.3
    }

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), options);
    this.observer.observe(this.container);
  }

  handleIntersection(entries:IntersectionObserverEntry[],observer:IntersectionObserver) {
    entries.forEach((entry:IntersectionObserverEntry)=>{
      if ( entry.target == this.container) {
        this.logger(`Observing! Intersection found: ${entry.isIntersecting}.`)
        this.isIntersecting = entry.isIntersecting;
      }
    })
    this.dispatchEvent(new CustomEvent('playCheck'))
  }

  get autoplay(): boolean  {
    if (this.getAttribute('autoplay') != 'false') {
      return true
    }
    return false;
  }
  get loop(): boolean  {
    if (this.getAttribute('loop') != 'false') {
      return true
    }
    return false;
  }

  set autoplay(isAutoplay:boolean) {
    if (isAutoplay) {
      this.setAttribute('autoplay', '');
    } else {
      this.removeAttribute('autoplay');
    }
  }


  set loop(isLoop:boolean) {
    if (isLoop) {
      this.setAttribute('loop', '');
    } else {
      this.removeAttribute('loop');
    }
  }

  get mode():"fit"|"fill" {
    if (this.getAttribute('mode') == 'fit') {
      return "fit"
    } else {
      return "fill";
    }
  }

  set mode(fitOrFill: "fit" | "fill") {
      this.setAttribute('mode', fitOrFill);
  }

  get status():loadingStatus {
    const statusString = this.getAttribute('status');
    if (typeof statusString == 'string' && (statusString == "loading" || statusString == "playing" || statusString == "paused" || statusString == "fallback" || statusString == "loaded" || statusString == "buffering" ||  statusString ==  "failed" ||  statusString ==  "waiting" || statusString ==  "none" || statusString == "error")) {
      return statusString;
    } else {
      this.status = "none";
      return "none"
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
    } else {
      this.setAttribute('status', 'error')
    }
  }


  get poster():string|false{
    const posterVal = this.getAttribute('poster');
    if (posterVal != null) {
      return posterVal;
    } else {
      return false;
    }
  }

  get posterSet():string|false{
    const posterVal = this.getAttribute('posterset');
    if (posterVal != null) {
      return posterVal;
    } else {
      return false;
    }
  }

  get src():string|null {
    const src = this.getAttribute('src');
    if (typeof src == 'string') {
      this.compileSources(src)

    }
    return src;
  }

  set src(srcString:string|null) {
    if (srcString == null) {
      this.removeAttribute('src');
    } else {
      this.setAttribute('src',  srcString);
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
    } else {
      this.removeAttribute('poster')
    }
  }


  //
  compileSources(srcString:string|null) {
    if ( srcString == null) {
      this.logger("No source provided for video background");
      return false;
    }
    let src = srcString.trim()

    let srcsToReturn:SourcesShape = [];
    let srcStrings: string[]= [];
    let sizeStrings = [];
    let hasMultipleSrcs = false,
        hasSizes = false;


    if (src.indexOf(',') >= 0) {
      //Looks like https://something 300w, https://something https://another one, else etc 500w,
      this.logger('Has sizes separated by comma')

      sizeStrings = srcString.split(',');

      if (sizeStrings.length >= 2) {
        sizeStrings.forEach(sizeString => {
          const splitString = sizeString.trim().split(' ');
          if (splitString.length <= 1) {
            srcsToReturn.push(this.prepareSingleSource(sizeString))
          } else {
            const size = parseInt(splitString[splitString.length -1].replace('w', ''));
            this.logger("Found a size: " + size + ' from string ' + sizeString);
            splitString.forEach((string:string)=>{ srcsToReturn.push(this.prepareSingleSource(string, size))});

          }
        })
      }

      hasSizes = true;
    }
    if (src.indexOf(' ') >= 0) {
      this.logger('Has multiple sources separated by spaces')

      if (sizeStrings.length >=2)  {

      } else {
        const array = srcString.split(' ');
        array.forEach(item=> { srcStrings.push(item.trim())})

      }
      srcStrings.forEach((string:string)=>{ srcsToReturn.push(this.prepareSingleSource(string))});

    }

    if (!hasSizes && !hasMultipleSrcs) {
      //Build from single source
      srcsToReturn.push(this.prepareSingleSource(src))
    }
    this.sources = this.cleanupSources(srcsToReturn);

  }

  /**
   * Removes conflicting sources of different types (can only have one of each type)
   */

  cleanupSources(sources:SourcesShape):SourcesShape {
    //Type first
    this.type = sources[0].type;
    this.url = sources[0].url;
    //Return object if only one.
    if (typeof sources != 'object' || sources.length <= 1) {
      this.sourcesReady = true;
      return sources;
    } else {

      if (this.type  == 'youtube'  || this.type  == 'vimeo' ) {
        this.sourcesReady = true;
        return [sources[0]];
      } else {
        // Get sizes
        let sizes:Array<number> = [];

        sources.forEach((source)=> {
        if (!('maxWidth' in source) || typeof source.maxWidth != 'number') {
          return
        }
        if (!sizes.includes(source.maxWidth)) {
          sizes.push(source.maxWidth);
        }

        this.breakpoints = sizes;
      })
      this.sourcesReady = true;
        return sources.filter(src=>{ return src.type == this.type });
      }
    }
  }

  prepareSingleSource(url:string, size: number|false = false):LocalSource|Source {
    const urlType = this.getSourceType(url);
    let returner:Source|LocalSource = {
        url: url,
        type: urlType,
    }
    if (urlType == 'local' ) {
      const ft = this.getFileType(url)
      if (ft) {
        return {...returner, maxWidth: size, fileType: ft}
      }
    }
     return returner;
  }

  getFileType(url:string):FileType|false {
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
      return false
  }

  handleMalformedSource(url:string):Source {
    this.logger(`Handling error for ${url}`)
    return {
      url: url,
      type: 'error',
    }
  }

  getSourceType(url:string):SourceType {
    const ytTest = new RegExp(/^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*$/);
    const vimeoTest = new RegExp(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i);
    const videoTest = new RegExp(/.*?\/.*(webm|mp4|ogg|ogm).*?/i);
    if (ytTest.test(url)) {
      return 'youtube'
    } else if (vimeoTest.test(url)) {
      return 'vimeo'
    } else if (videoTest.test(url)) {
      return 'local'
    } else {
      return 'error'
    }
  }

  connectedCallback() {

  }

  /**
   * @method logger A guarded console logger.
   * @param msg the message to send
   * @param always Whether to always show if not verbose
   * @return {undefined}
   */
  logger(msg: any, always:boolean = false) {
    if (always && this.debug.enabled) {
      console.log(msg);
    } else {

      if (!this.debug.enabled || !this.debug.verbose) {
        return
      }
      console.log(msg)
    }
  }
}
