import { getSourcesFilteredBySize, getFileType } from "../utils/sources";
import VideoPlayer from "../players/videoPlayer";

export class LocalPlayer extends VideoPlayer {
  source: LocalSource[]
  el?: HTMLVideoElement
  lastWindowWidth: number
  constructor(config:PlayerConfigInput) {
    super(config)
    this.lastWindowWidth = window.innerWidth;

    //Config parsing
    if (this.config.breakpoints) {
      this.source = getSourcesFilteredBySize(this.config.source!),
      window.addEventListener('resize', this.checkResize.bind(this));
    } else {
      this.source = [{ url: this.config.source![0].url, type: 'local', fileType: getFileType(this.config.source![0].url)}] ;
    }

    this.build();
  }

  get playing():boolean {
    if (this.el && this.el) {
    return !!(this.el.currentTime > 0 && !this.el.paused && !this.el.ended && this.el.readyState > 2);
    }
    return false
  }

  get paused(): boolean {
    if (this.el) {
      return this.el.paused
    } return false;
  }

  checkResize() {
    const breakpoints = this.config.breakpoints
    if (!this.lastWindowWidth || !breakpoints) {
      return;
    }

    const wW = window.innerWidth;
    let breakpointsWithPast = [...breakpoints, this.lastWindowWidth].sort((a, b) => a - b)
    let breakpointsWithPresent = [...breakpoints, wW].sort((a, b) => a - b)
    const pastIndex = breakpointsWithPast.indexOf(this.lastWindowWidth);
    const currentIndex = breakpointsWithPresent.indexOf(wW);
    if (pastIndex != currentIndex) {
      this.build();
    }
  }

  get currentTime():number {
    if (this.el) {
      return this.el.currentTime
    }
    return 0;
  }

  get aspectRatio(): number {
    return 1
  }
  get muted(): boolean {
    return this.el?.muted ?? true
  }


  build() {

    if (this.el) this.destroy(); //Already initialized check
    if (!this.source) return;

    this.el = document.createElement('video');
    this.el.classList.add('vbg__video')
    this.el.classList.add('vbg--loading')
    this.el.setAttribute('playsinline', '');
    this.el.setAttribute('preload', 'metadata');
    if (this.props.muted) {
      this.el.setAttribute('muted', "true");
    }
    if (this.config.loop) {
      this.el.setAttribute('loop', "");
    }
    this.el.currentTime = this.config.startTime;
    this.el.volume = 0;

    //Need to reset sources
    this.el.innerHTML = "";
    const el = this.el;
    this.source.forEach((src:LocalSource, i:number)=> {
      const child = document.createElement('source');

      if ('fileType' in src) {
        child.type = 'video/' + src.fileType;
      }
      child.src = src.url;

      if (i == 0) {//When first source loads, remove loading class
        el.addEventListener('loadeddata',   function() {
          el && el.classList.remove('vbg--loading');
        })
      }

      el.append(child);
    })

    this.status.ready = true;
    this.do('ready');
    this.parent.append(this.el);

  }




  destroy() {
    if (!this.el) return;

    this.el.parentElement?.removeChild(this.el)
    this.el = undefined;
  }

  async mute() {
    if (this.el) {
      this.el.muted = true
      this.el.volume = 0
    }
    return;
  }
  async unmute() {
    console.log("Trying to unmute")
    if (this.el) {
      this.el.muted = false
      this.el.volume = 0.7
    }
    return;
  }

  async play() {
    if (this.el) {

      this.el.play().then(()=> {

        this.status.started = true;
      });
      return true;
    }
    return false;
  }
  async pause() {
    if (this.el && this.status.started) {
      this.el.pause()
    }
    return true;
  }

  resize(ratio: number = 1.4) {
    return true;
  }
}