// import canAutoplay from "can-autoplay";
import {  YOUTUBE_REGEX, VIMEO_REGEX } from '../constants/instance.js'
interface ProviderUtilsShape {
  parsePath: string | null,
  timeRegex: RegExp,
  idRegex: RegExp,
}
interface ProvidersShape {
  youtube: ProviderUtilsShape,
  vimeo: ProviderUtilsShape
}
const providerUtils:ProvidersShape = {
  youtube: {
    parsePath: 'query.t',
    timeRegex: /[hms]/,
    idRegex: YOUTUBE_REGEX,
    // getDimensions: getYouTubeDimensions
  },
  vimeo: {
    parsePath: null,
    timeRegex: /[#t=s]/,
    idRegex: VIMEO_REGEX,
    // getDimensions: getVimeoDimensions
  }
}

function checkExternalSource(srcs?:SourcesShape ):Source|false{

    if (srcs && typeof srcs == 'object') {
      if ('type' in srcs[0]) {
        return srcs[0]
      } else if ('type' in srcs) {
        return srcs
      }
    }
    return false;
  }


const getVideoID = (srcs: SourcesShape | undefined) => {
  const src = checkExternalSource(srcs);
  if (!src || src.type == 'local' || src.type == 'error') {
    console.error(`Video src is not valid`)
    return false;
  }
  const provider = providerUtils[src.type];
  let match = provider && src.url.match(provider.idRegex)
  if (!match) {
      console.error(`Video id at ${ src.url } is not valid`)

    return false;
  }
  const id = src.type === 'vimeo' ? match[3] : match[7]
  if (id.length) {
      console.error(`Video id at ${ src.url } is not valid`)

    return id
  }
    console.error(`Video id at ${ src.url } is not valid`)

  return false;

}


async function checkForAutoplay(){

    // const videoResult = await canAutoplay.video({inline: true, muted: true, timeout: 500})
    // const audioResult = await canAutoplay.audio({inline: true, muted: false, timeout: 500})

    // if (audioResult && videoResult) {
    //  return {
    //     video: videoResult.result,
    //     audio: audioResult.result
    //   }
    // }

    return {
      video: true,
      audio: true
    }
  }

export {getVideoID, checkForAutoplay};

