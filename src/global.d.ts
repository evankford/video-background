
type videoStatus = "loading" |  "loaded" |  "buffering" |  "failed" |  "waiting" | "playing"  | "paused" | "error" ;
type loadingStatus = "loading" | "fallback" | "loaded" |  "buffering" |  "failed" |  "waiting" | "none" | "error" | "paused" | "playing";

type SourceType = "youtube" | "vimeo" | "local" | "error"
type FileType = 'webm' | 'ogg' | 'mp4' | 'ogm'

interface SizedSources {
  [key: string] : LocalSource[]
}

interface Source {
  url: string,
  type: SourceType,

}

interface LocalSource extends Source {
  maxWidth?: number | false
  fileType: FileType
}

type SourcesShape = Array< LocalSource | Source>

interface YoutubeAPIPlayer {
  ready: boolean,
  shouldPlay: boolean,
  destroy?: function,
  iframe?: HTMLElement
  playVideo: function,
  pauseVideo: function,
  mute: function
  unmute: function
}

type VideoCan = {
  unmute: boolean,
  pause: boolean
}

declare module "*.svg" {
  const content: any;
  export default content;
}