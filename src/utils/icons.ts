import mute from "../icons/mute.svg";
import unmute from "../icons/unmute.svg";
import pause from "../icons/pause.svg";
import play from "../icons/play.svg";

type StateShape  = {
  muted: boolean,
  paused: boolean
}


type IconConfigNotRequired =  {
  can?: VideoCan

  wrapper: HTMLElement,
  onMuteUnmute ?: (() => void ) | false
  onPausePlay ?: (() => void ) | false
  initialState?: StateShape
}

type IconConfig =  {
  can?:  {
    unmute: boolean,
    pause: boolean
  }

  wrapper: HTMLElement,
  onMuteUnmute : (() => void ) | false
  onPausePlay : (() => void ) | false
  initialState?: StateShape
}

const defaultConfig:IconConfig = {
  can: {
    unmute: true,
    pause: false,
  },
  wrapper: document.body,
  onMuteUnmute: false,
  onPausePlay: false,
  initialState: {
    muted: true,
    paused: false,
  }
}


export default class Icons {
  config: IconConfig
  parent: HTMLElement
  wrapper: HTMLElement
  state: StateShape
  muteUnmute?: HTMLButtonElement
  pausePlay?: HTMLButtonElement
  toggleMute: (() => void ) | false
  togglePause: (() => void ) | false
  constructor(config: IconConfigNotRequired) {

    this.config = Object.assign(defaultConfig, config);
    this.parent = this.config.wrapper;
    this.state = this.config.initialState || { muted: true, paused: false};
    this.toggleMute = this.config.onMuteUnmute;
    this.togglePause =this.config.onPausePlay;


    //Set up state
    this.wrapper = document.createElement('div');
    this.init();
  }

  setupWrapper() {
    this.wrapper.classList.add('vbg__icons');
    if (this.config.can?.unmute) {
      this.muteUnmute = document.createElement('button');
      this.muteUnmute.classList.add('icon-button', 'vbg__icon');
      this.muteUnmute.addEventListener('click', this.handleMuteUnmuteClick.bind(this));
      this.wrapper.append(this.muteUnmute);
    }
    if (this.config.can?.pause) {
      this.pausePlay = document.createElement('button');
      this.pausePlay.classList.add('icon-button', 'vbg__icon');
      this.pausePlay.addEventListener('click', this.handlePausePlay.bind(this))

      this.wrapper.append(this.pausePlay);
    }
    this.parent.append(this.wrapper)
  }

  init() {
    this.setupWrapper();
    this.handleStateChange();
  }

  updateState(prop: 'muted' | 'paused', val: boolean) {
    this.state[prop] = val;
    return this.handleStateChange();
  }

  handleStateChange() {
    if (this.config.can?.unmute && this.muteUnmute) {
      this.syncMuteState()
    }
    if (this.config.can?.pause && this.pausePlay) {
      this.syncPauseState()
    }
  }

  syncMuteState() {
    if (!this.muteUnmute) {
      console.error('Sometthing went wrong: Trying to sync mute button before button exists');
      return;
    }
    if (this.state.muted ) {
      this.muteUnmute.setAttribute('aria-label', 'Unmute Video')
      this.muteUnmute.innerHTML = mute;
    } else {
      this.muteUnmute.setAttribute('aria-label', 'Mute Video')
       this.muteUnmute.innerHTML= unmute ;
    }
  }
  syncPauseState() {
    if (!this.pausePlay ) {
      console.error('Sometthing went wrong: Trying to sync mute button before button exists');
      return;
    }
    if (this.state.paused ) {
      this.pausePlay.setAttribute('aria-label', 'Play Video')
       this.pausePlay.innerHTML = play;
    } else {
      this.pausePlay.setAttribute('aria-label', 'Pause Video')
      this.pausePlay.innerHTML = pause;
    }
  }

  handleMuteUnmuteClick() {
    this.state.muted = !this.state.muted;
    this.toggleMute && this.toggleMute();
    this.syncMuteState();
  }
  handlePausePlay() {
    this.state.paused = !this.state.paused;
    this.togglePause && this.togglePause();
    this.syncPauseState();
  }

}