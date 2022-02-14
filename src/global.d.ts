/// <reference path="./videoBackground.ts" />

type videoStatus = "loading" |  "loaded" |  "buffering" |  "failed" |  "waiting" | "playing"  | "paused" | "error" ;
type loadingStatus = "loading" | "none" | "ready" | "fallback";

type SourceType = "youtube" | "vimeo" | "local" | "error"
type FileType = 'webm' | 'ogg' | 'mp4' | 'ogm'

interface SizedSources {
  [key: string] : LocalSource[]
}

interface Source {
  url: string,
  type: SourceType,

}

interface PlayerCallback {
  fn:  ()=>void
  key?: string
}
interface PlayerCallbacks {
  [key:string] : PlayerCallback[]
}

interface LocalSource extends Source {
  maxWidth?: number | false
  fileType: FileType
}

type SourcesShape = Array< LocalSource | Source>

interface YoutubeAPIPlayer {
  isReady: boolean,
  shouldPlay: boolean,
  destroy?: function,
  iframe?: HTMLIFrameElement
  playVideo: function,
  pauseVideo: function,
  mute: function
  unmute: function
}
interface VimeoAPIPlayer {
  ready: ()=>boolean
  shouldPlay: boolean,
  destroy?: function,
  iframe?: HTMLElement
  play: function,
  pause: function,
  unmute: function
  setVolume?: function,
  getPaused?: function
}

type VideoCan = {
  unmute: boolean,
  pause: boolean
}

declare module "*.svg" {
  const content: any;
  export default content;
}

type PlayerType = 'vimeo' | 'youtube' | 'local'
type DebugLevelShape = boolean | null | undefined |  string


interface PlayerConfigLessParent {

  source?: SourcesShape,
  can: VideoCan,
  fillMode: "fit" | "fill"
  zoom: number
  startTime: number
  loop: boolean
    threshold?: number



}
interface PlayerConfigInput {
  parent:  VideoBackground
  source: SourcesShape
  breakpoints?: number[]
  threshold?: number
}
interface PlayerConfigShape extends  PlayerConfigLessParent, PlayerConfigInput {}

interface  PlayerStatusShape {
  ready: boolean,
  error: boolean,
  paused: boolean,
  playing: boolean,
  started: boolean,
  muted: boolean,
  intersecting: boolean,
  apiReady: boolean
}


interface PlayerElements {
  parent: HTMLElement
  iframe: HTMLIFrameElement
}

interface PlayerPropsShape {
  aspectRatio: number,
  poster?: string|false
  autoplay: boolean,
  muted: boolean,
}

interface DefaultShape {
  status: PlayerStatusShape,
  props: PlayerPropsShape,
  config: PlayerConfigLessParent,
}



class ShouldHave {
  async play(): Promise<false|void>
  async pause(): Promise<false|void>
  async mute(): Promise<false|void>
  async ummute(): Promise<false|void>
  destroy(): void
  build(): void

  get ready(): boolean
  get playing(): boolean
  get currentTime(): number
  get aspectRatio(): number
}


