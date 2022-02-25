import Player from "@vimeo/player"
import VideoPlayer from "./videoPlayer"

interface PlayerElements {
  parent: HTMLElement
  iframe: HTMLIFrameElement
}



export class VimeoPlayer extends VideoPlayer{
  source: string
  player?: Player
  wrapper: HTMLElement

  constructor(config:PlayerConfigInput) {
    super(config);
    this.type = 'vimeo';
    this.wrapper = this.parent.ownerDocument.createElement('div')
    this.iframe = this.parent.ownerDocument.createElement('iframe')
    this.source = this.config.source![0].url;
    this.build();
  }

  unbuild() {
    if (!this.player) {
      return
    }
    this.player.destroy();
    this.player = undefined;
  }


  build() {
    if (this.player) {
      // this.destroy();
      return;
    }
    this.setupWrapper();
    this.player = new Player(this.wrapper, { url:this.source, controls: false, dnt: true, loop:true, muted:true})
    const self = this;
    this.afterPlayerSetup().then(() => {
      this.status.ready = true;
      this.status.apiReady = true;
      this.do('ready')
      self.parent.status = "ready"
    })
  }

  setupWrapper() {
    // this.wrapper.id = this.source
    this.wrapper.classList.add('vbg__video');
    this.wrapper.classList.add('vbg--loading');
    this.parent.append(this.wrapper)

    // this.iframe.setAttribute('frameborder', "0")
    // this.iframe.setAttribute('allow', "autoplay")

  }

  async afterPlayerSetup() {
    if (this.player) {
      if (this.config.loop) {
        this.player.on('timeupdate', (e:{percent:number})=> {
          if (e.percent > 0.97) {
            this.player!.setCurrentTime(this.config.startTime).then(()=>{this.player!.play()})
          }
        })
      }

      this.props.aspectRatio = await this.getAspectRatio();
      this.resize();
    }
    return false
  }


  async getAspectRatio() {
    const h = await this.player!.getVideoHeight()
    const w = await this.player!.getVideoWidth()
    return h && w ? h / w : 0.5625
  }

  async getPlayState() {
    if (this.player) {
      const ended = await this.player.getEnded()
      const paused = await this.player.getPaused()
      const currentTime = await this.player.getCurrentTime()
      return currentTime > 0 && !ended && !paused;
    }
    return false
  }

  get paused():boolean {
    return this.paused ?? false;
  }
  set paused(paused) {

  }
  set muted(isMuted) {
  }

  get muted():boolean {
    return this.muted ?? true
  }

  get playing() {
   this.getPlayState().then(resp=> {
     return resp;
   })
    return false
  }

  get aspectRatio() {
    return 1
  }
  get currentTime() {
    return 0
  }

setPlayStatuses() {
  this.paused = false;
  this.status.started = true;
  this.status.playing = true;
}

  async play() {
    if (this.player) {
      this.wrapper.classList.remove('vbg--loading')
      if (this.status.started == true) {
         this.player.play().then(()=> { this.setPlayStatuses()})
      } else {
        this.player.ready().then(()=>{this.player!.setCurrentTime(this.config.startTime).then(()=> { this.setPlayStatuses()})
        })
         this.player.ready().then(()=>{this.player!.play().then(()=> { this.setPlayStatuses()})
        })
      }
      return true
    } else {
      this.on('ready', this.play.bind(this), 'playCheck')
      return false
    }
  }


  async pause() {
    if (this.player && this.status.playing) {
      await this.player.ready().then(()=>{this.player!.pause();  this.paused = true;});

      return true
    } else {
      return false
    }
  }


  async mute() {
    if (this.player) {
       await this.player.setVolume(0)
       this.muted = true
       return
    }
    return;
  }
  async unmute() {
    if (this.player) {
       await this.player.setVolume(0.7)
       this.muted = false
       return;
    } else {
       this.on('ready', this.unmute.bind(this), 'muteCheck')
    }
    return;
  }

}