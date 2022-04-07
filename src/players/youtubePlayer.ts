
import { getVideoID } from "../utils/vidUtils"
import Player from "youtube-player"
import type {YouTubePlayer} from "youtube-player/dist/types"
import VideoPlayer from "./videoPlayer"


export class YoutubePlayer extends VideoPlayer{
  source: string
  id: string |false
  wrapper: HTMLElement
  player?: YouTubePlayer
  looper?: ReturnType<typeof setInterval>

  constructor(config:PlayerConfigInput) {
    super(config);
    this.type = 'youtube';
    this.id = getVideoID(config.source)
    this.wrapper = this.parent.ownerDocument.createElement('div')
    const innerWrap = this.parent.ownerDocument.createElement('div')
    this.wrapper.append(innerWrap);
    this.setupWrapper()

    this.source = config.source![0].url;
    if (!this.id) {
      return;
    }
    this.player = Player(innerWrap, { playerVars: {
      autoplay: 1,
      playsinline: 0,
      modestbranding: 1,
      rel: 0,
      fs: 0,
      start: this.config.startTime,
      controls: 0,
      loop: 1,
    }})
    this.player.loadVideoById(this.id);
    if (this.props.muted != false) {
      this.player.mute()
    }
    this.build();
  }

   setupWrapper() {
    // this.wrapper.id = this.source
    this.wrapper.classList.add('vbg__video');
    this.wrapper.classList.add('vbg--loading');
    this.parent.append(this.wrapper)

  }

  unbuild() {
    this.clearLoop();
    if (this.player) {
      this.player.destroy();
    }
  }





  build() {

    this.afterPlayerSetup().then(() => {
      this.status.ready = true;
      this.status.apiReady = true;
      this.do('ready')
    })
  }

  startPlayLoop() {
    this.looper = setInterval(() => {
      if (this.player && this.player.getDuration() > 0) {
        if (this.player.getCurrentTime() >= this.player.getDuration() - 6) {
          this.player.seekTo(this.config.startTime, false);
        }

      } else {
        this.clearLoop();
      }
    }, 3000);
  }

  clearLoop(){
    if (this.looper) {
        clearInterval(this.looper)
      }
  }

  async afterPlayerSetup() {
    if (this.player) {
      this.iframe = this.player.getIframe();
      this.player.seekTo(this.config.startTime, true)
       this.getAspectRatio().then((data)=> {

      this.props.aspectRatio = data;
      window.setTimeout(this.resize.bind(this), 400)
      });
    }
    this.parent.status = "ready"
    return false
  }



  async getAspectRatio() {
    try {

      const resp = await fetch (`https://noembed.com/embed?url=https://youtube.com/embed/${this.id}`, {
      })
      const data:{height:number, width: number} = await resp.json()

      if (data && data.height && data.width) {
        return data.height / data.width
      }
      return 0.5625;
    } catch(e) {

      return 0.5624
    }

  }

  get playing() {
    return this.player?.getPlayerState() == 1
  }
  get buffering() {
    return this.player?.getPlayerState() == 3
  }

  get aspectRatio() {
    return 1
  }
  get currentTime() {
    return 0
  }


  async play() {
    if (this.player) {
      if (this.wrapper) {

        this.wrapper.classList.remove('vbg--loading');
      } else {
        this.parent.querySelector('iframe')!.classList.remove('vbg--loading');
      }

      if (this.status.started == false) {


        this.player.playVideo();
      } else {
        this.player.playVideo();
        this.status.started = true
      }
      return true
    } else {
      this.on('ready', this.play.bind(this), 'playCheck')
      return false
    }
  }


  async pause() {
    if (this.player) {
      this.clearLoop();

       this.player.pauseVideo()
      return true
    } else {
      return false
    }
  }

  get paused() {
    return this.player?.getPlayerState() == 2
  }

  get muted() {
    return this.player?.isMuted()
  }

  async mute() {
    if (this.player) {
       this.player.mute()
       return
    }
    return
  }
  async unmute() {
    if (this.player) {
      return this.player.unMute()
    } else {
       this.on('ready', this.unmute.bind(this), 'muteCheck')
    }
    return;
  }

}