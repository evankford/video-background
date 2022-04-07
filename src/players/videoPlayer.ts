import Logger from "../utils/logger";
import type { VideoBackground } from "videoBackground";

const defaults: DefaultShape = {
  status: {
    ready: false,
    error: false,
    paused: true,
    playing: false,
    started: false,
    muted: true,
    apiReady: false,
    intersecting: false,
  },
  props: {
    aspectRatio: 0.5625,
    muted: true,
    poster: false,
    autoplay: true,
  },
  config  : {
    loop: true,
    zoom: 1.3,
    can: {unmute: false, pause: false},
    startTime: 0,
    fillMode: 'fill',
    threshold: 0.2,
  },

}

interface ListenersShape {
  [key:string] : number
}



export default class VideoPlayer {
  passedConfig: PlayerConfigInput
  config: PlayerConfigShape
  status: PlayerStatusShape
  props: PlayerPropsShape
  observer?: IntersectionObserver
  logger:  Logger

  type: PlayerType
  callbacks: PlayerCallbacks
  iframe?: HTMLIFrameElement
  wrapper?: HTMLElement
  parent: VideoBackground

  parseParams():void {
    if(this.parent.hasAttribute('zoom')) {
      this.config.zoom = parseFloat(this.parent.getAttribute('zoom')!)
    }
    if(this.parent.hasAttribute('can-unmute')) {
      this.config.can.pause = this.parent.getAttribute('can-unmute') != "false"
    }
    if(this.parent.hasAttribute('loop')) {
      this.config.can.pause = this.parent.getAttribute('loop') != "false"
    }
    if(this.parent.hasAttribute('can-pause')) {
      this.config.can.pause = this.parent.getAttribute('can-pause') != "false"
    }
    if(this.parent.hasAttribute('fill-mode')) {
      this.config.fillMode = this.parent.getAttribute('fill-mode') == 'fit' ? 'fit' : 'fill'
    }
    if(this.parent.hasAttribute('start')) {
      this.config.startTime = parseInt(this.parent.getAttribute('start')!)
     }
  }

  hasRequiredParams(config:PlayerConfigShape):boolean {
    if (config.parent == null) {
      console.log("Cannot initialize player: No parent provided to Player via constructor")
      return false;
    }

    if (config.source == null ) {
      console.log("Cannot initialize player: No source provided to Player via constructor")
      return false;
    }
    return true;
  }



  constructor(config: PlayerConfigInput) {
    this.status = defaults.status;
    this.props = defaults.props;
    this.type = "local";
    this.passedConfig = config;
    this.callbacks ={'ready': [{fn: this.playCheck.bind(this)}], 'intersecting':[{fn:this.playCheck.bind(this)}] }
    this.config = this.mergeConfig(config);
    this.logger = this.config.parent.logger;
    this.parent = this.config.parent;
    this.parseParams();


    if (!this.hasRequiredParams(this.config)){
      this.status.error = true;
      throw new Error("No parent passed, cannot create player");
    }

    this.init();


  }

  build() {
    //Defined these in individual functions
  }
  unbuild() {
    //Defined these in individual functions
  }

  init() {
    // this.build();
    window.addEventListener('resize', this.resize.bind(this))
    this.buildIntersectionObserver()
  }

  destroy() {
    this.unbuild();
    this.removeIntersectionObserver();
    window.removeEventListener('resize', this.resize.bind(this))
  }

  mergeConfig(config:PlayerConfigInput):PlayerConfigShape {
    return Object.assign(defaults.config, config);
  }

  do(eventName:string) {
    const callbacks = this.callbacks[eventName];
    if (typeof callbacks == 'object') {
      callbacks.forEach(c=> {
        return c.fn()
      })
    }
  }

  on(eventName:string, callback:()=>void, uniqueKey: string | undefined = undefined) {
    const arrayExists = typeof this.callbacks[eventName] == 'object'

    if (arrayExists && uniqueKey) {
      const callbackExists = this.callbacks[eventName].find(c=>c.key == uniqueKey)

      if (!callbackExists) {
        this.callbacks[eventName].push({fn:callback, key: uniqueKey})
      }
    } else {
      if (arrayExists) {
         this.callbacks[eventName].push({fn:callback})
      } else {
        this.callbacks[eventName] = [{fn:callback}]
      }
    }
  }

  playCheck():void {
    const { ready, intersecting } = this.status;
    if (ready) {

      if ( intersecting) {
          this.play()
      } else {
        this.pause()
      }
    }
  }

  async pause():Promise<boolean> {
    return true;
  }
  async play():Promise<boolean> {
    return true;
  }
  async mute():Promise<void> {
    return ;
  }
  async unmute():Promise<void> {
    return ;
  }

  resize() {
    if (this.type != 'local') { //Common for iframes
      let iframe:HTMLElement | undefined | null = null;
      if (this.wrapper) {
       iframe = this.wrapper.querySelector('iframe');

      } else {
        iframe = this.iframe;
      }
      if (!iframe) {
        console.log('No iframe found.')
        return;
      }
      iframe.removeAttribute('width')
      iframe.removeAttribute('height')
      if (this.config.fillMode == 'fit') {
        iframe.style.removeProperty('top')
        iframe.style.removeProperty('left')
        iframe.style.removeProperty('width')
        iframe.style.removeProperty('height')
        return;
      }
      const container = {w: this.parent.clientWidth, h: this.parent.clientHeight, ratio: this.parent.clientHeight / this.parent.clientWidth }
      let final = {w:container.w * this.config.zoom, h: container.h* this.config.zoom}
      const {aspectRatio }= this.props
      const { zoom }= this.config
      if (container.ratio < aspectRatio) {
        final.w = container.w * zoom
        final.h = final.w / aspectRatio
      } else if (container.ratio > aspectRatio) {
        final.h = container.h * zoom
        final.w = final.h / aspectRatio
      } else {
        final.h = container.h
        final.w = container.w
      }

      iframe.style.width = final.w + 'px'
      iframe.style.height = final.h + 'px'
      iframe.style.left = 0 - ((final.w - container.w) / 2) + 'px'
      iframe.style.top = 0 - ((final.h - container.h) / 2) + 'px'

    }

  }

  buildIntersectionObserver() {
    const options = {
      threshold: this.config.threshold
    }

    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), options);
    this.observer.observe(this.parent);
  }
  removeIntersectionObserver() {

    this.observer?.disconnect();
  }

  handleIntersection(entries:IntersectionObserverEntry[],observer:IntersectionObserver) {
    entries.forEach((entry:IntersectionObserverEntry)=>{
      if ( entry.target == this.parent) {

        this.status.intersecting = entry.isIntersecting;
        this.do('intersecting')
      }
    })

    // this.do('intersect')
  }

}

