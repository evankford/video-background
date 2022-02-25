import { checkForAutoplay } from "./utils/vidUtils";
import { compileSources } from "./utils/sources";
import { initializeVimeoAPI, initializeVimeoPlayer } from './utils/vimeo';
import { initializeYouTubeAPI, initializeYouTubePlayer } from './utils/youtube';
import Icons from './utils/icons';

import Logger from './utils/logger';

import { LocalPlayer } from "./players/localPlayer";
import { VimeoPlayer } from "./players/vimeoPlayer";
import { YoutubePlayer } from "./players/youtubePlayer";

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

interface CanAutoPlayShape {
  video: boolean,
  audio: boolean
}

/**
 * @class VideoBackground creates a custom web component
 * @todo separate statuses and capabilities and stores into their own objects
 * @todo allow unmuting
 */
export class VideoBackground extends HTMLElement {
  initialized?: boolean
  breakpoints?:number[] /** Contains an array of breakpoints to reload smaller sources when passed */
  container : HTMLElement
  can: VideoCan
  canAutoplay?:CanAutoPlayShape
  muteButton?:HTMLElement
  overlayEl?:HTMLElement
  pauseButton?:HTMLElement
  player?:  YoutubePlayer | VimeoPlayer | LocalPlayer
  icons?: Icons
  playerReadyTimeout?: NodeJS.Timeout
  paused: boolean
  size?: string
  muted: boolean
  posterEl?:HTMLImageElement|HTMLPictureElement
  startTime?:number
  sourceId?:string
  sources?: SourcesShape
  type?: 'local' | 'youtube' | 'vimeo' | 'error'
  url?:string
  videoEl?:HTMLVideoElement

  logger: Logger

  constructor() {
    super();
    //Setting up props
    //Get this started ASAP

    this.initialized = false
    this.container = this;

    this.can = { unmute: this.hasAttribute('can-unmute'), pause:  this.hasAttribute('can-pause')};
    this.muted = this.getAttribute('muted') !== 'false';
    this.logger = new Logger(this.getAttribute('debug'));

    if (is_ios && is_safari) {
      this.muted = true;
    }
    this.paused = false;
    // this.init();
  }



  init() {
    /*Check if we need to re-init */
    console.log('Initializing video background')
    if (this.initialized != true) {
      this.initSync();

      this.buildDOM();
    } else {
      this.reset();
      this.init();
    }
  }
  initSync() {
    console.log('Initializing video background sources')
    // this.logger.log('Initializing video background')

      this.status = "loading";

      //Compile sources
      const compiled = compileSources(this.src);

      console.log("Sources Compiled: " + this.src);
      console.log(compiled)
      if (compiled) {
        this.type = compiled.type;
        this.sources = compiled.sources;
        this.url = compiled.url;
        if (compiled.breakpoints) {
          this.breakpoints = compiled.breakpoints
        }
      }
  }

  afterAutoplay() {
    console.log("After Autoplay")
    if (!this.canAutoplay) {
      throw new Error("Should never run before autoplay support is defined")
    }
    if (!this.canAutoplay.audio) {

      this.can.unmute = false
    }
    if (this.canAutoplay.video) {
          console.log("Can Autoplay Video, should build video")

      this.buildVideo();
      this.buildIcons();
    } else {
      this.logger.log("Can't play video: Autoplay is not supported", true)
      this.handleFallbackNoVideo();
    }
    this.initialized = true
  }


  async buildDOM() {
    console.log("Building DOM")
    this.buildOverlay();
    this.buildPoster();

    if (this.canAutoplay) {
      this.afterAutoplay()
    }
    checkForAutoplay().then((autoplay:CanAutoPlayShape)=> {
      this.canAutoplay = autoplay;
      this.afterAutoplay()

    }).catch(e => {
      console.error(e);
      this.handleFallbackNoVideo();
    })
  }

  buildIcons() {
    if (this.can.unmute || this.can.pause) {
      this.icons = new Icons({wrapper: this,can: this.can, onMuteUnmute: this.toggleMute.bind(this), onPausePlay: this.togglePause.bind(this) , initialState: { muted: this.player?.muted ?? true, paused: false}})
    }
  }

  async buildVideo() {
    //Never should have mixed sources.


    if (!this.sources || !this.type)  {
      console.log(`No sources or type, sources: ${this.sources}, type: ${this.type} `)
      this.initSync();
      //  return this.handleFallbackNoVideo();
    }
    if (!this.sources || !this.type)  {
      console.log(`Still no sources, WTF????, sources: ${this.sources}, type: ${this.type} `)
       return this.handleFallbackNoVideo();
    }

    // this.logger.log(`Building ${this.type} video based on source: ${this.sources[0].url}` );
    console.log(`Building ${this.type} video based on source: ${this.sources[0].url}` );

    if (this.type == 'local' ) {
      this.player = new LocalPlayer({source: this.sources!, parent: this, breakpoints: this.breakpoints})
      // this.buildLocalVideo()
      //Check to make sure we have sources
    } else if (this.type == 'vimeo') {
      this.player = new VimeoPlayer({source: this.sources, parent: this})
      console.log(this.player);
    } else if (this.type == 'youtube') {
      this.player = new YoutubePlayer({source: this.sources, parent: this})
    }
  }


  handleFallbackNoVideo() {
    this.status = "fallback";
    this.logger.log("Video Won't play, defaulting to fallback")
    this.status = "fallback";
  }

  toggleMute() {
    if (this.muted == true) {
      this.unmuteVideo()
      this.muted = false;
    } else {
      this.muteVideo();
      this.muted = true;
    }
  }

  togglePause() {
    if (this.player) {
      if (this.player.paused) {
        this.player.play()
      } else {
        this.player.pause()
      }

    } else {
      this.logger.log("No video to pause/play")
    }
  }


  muteVideo() {
    if (this.player) {
      this.player.mute()
    } else {
      this.logger.log('No player to mute')
    }
  }
  unmuteVideo() {
    if (this.player) {
      this.logger.log('unmuting video');
      this.player.unmute()
    } else {
      this.logger.log('No player to unmute')
    }
  }


  checkForInherentPoster():HTMLImageElement|HTMLPictureElement|false {
    const inherentPoster = this.container.querySelector('img') ? this.container.querySelector('img') : this.container.querySelector('picture')
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
    if (inherentPoster != false) {
      this.logger.log("Found an inherent poster");
      //Found a poster element
      hasInherentPoster = true;
      this.posterEl = inherentPoster;
      this.container.innerHTML = '';
    } else {
      this.container.innerHTML = '';
      //Create a poster element if none found.
      this.posterEl = document.createElement('img');
      this.posterEl.classList.add('vbg--loading')
      if (this.poster && 'src' in this.posterEl) {
          const self = this;
          const imageLoaderEl = new Image();
          imageLoaderEl.src = this.poster;

          imageLoaderEl.addEventListener('load', function() {
            if (self && self.posterEl && 'src' in self.posterEl) {
              self.posterEl.src = imageLoaderEl.src;
              self.posterEl.classList.remove('vbg--loading')
            }
          })
        }
        if (this.posterSet && 'srcset' in this.posterEl) {
          this.posterEl.srcset = this.posterSet;
          this.posterEl.sizes = this.size ??  "100vw";
        }
    }

    //Add styling classes;
    this.posterEl.classList.add('vbg__poster')


      this.appendChild(this.posterEl);
  }


  buildOverlay() {
    console.log("Building Overlay")
    this.overlayEl = document.createElement('div');
    this.overlayEl.classList.add('vbg__overlay');
    this.appendChild(this.overlayEl);
  }

  get status():loadingStatus {
    const statusString = this.getAttribute('status');
    if (typeof statusString == 'string' && (statusString == "loading" || statusString == "none" || statusString == "ready" || statusString == "fallback")) {
      return statusString;
    } else {
      this.status = "none";
      return "none"
    }
  }

  /** Updates status on the actual element as well as the property of the class */

  set status(status) {
    if (!status) {
      this.status = "fallback"
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
      compileSources(src)

    }
    return src;
  }

  set src(srcString:string|null) {
    // this.src = srcString
    compileSources(srcString);
    // if (srcString == null) {
    //   this.removeAttribute('src');
    // } else {
    //   this.setAttribute('src',  srcString);
    // }
  }


  /**
   * Sets the poster url string, and sets loading that poster into motion
   */
  set poster(posterString) {

  }


  //


  handleMalformedSource(url:string):Source {
    this.logger.log(`Handling error for ${url}`)
    return {
      url: url,
      type: 'error',
    }
  }



  reset() {
    if (this.initialized) {
      this.logger.log("Resetting video-background.");
      console.log("Resetting video-background.");
      //Setting up props
      this.initialized = false;
      this.container = this;
      this.status = "none";

      this.muted = this.getAttribute('muted') !== 'false';
      if (is_ios && is_safari) {
        this.muted = true;
      }
      this.paused = false;
    }
  }

  attributeChangedCallback() {
    console.log("Attribute is changed");
    this.reset();
    this.init();
  }
  connectedCallback() {
    console.log("Connected, let's init!")
    this.init()
  }
  disconnectedCallback() {
    this.reset()
  }
}
