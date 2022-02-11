import { DEFAULT_PROPERTY_VALUES, UNSUPPORTED_VIDEO_SOURCE, YOUTUBE_REGEX, VIMEO_REGEX } from '../constants/instance.js'
import parseUrl from 'url-parse'
import Player from '@vimeo/player'

/**
 * The YouTube API seemingly does not expose the actual width and height dimensions
 * of the video itself. The video's dimensions and ratio may be completely different
 * than the IFRAME's. This hack finds those values inside some private objects.
 * Since this is not part of the public API, the dimensions will fall back to the
 * container width and height in case YouTube changes the internals unexpectedly.
 *
 * @method getYouTubeDimensions Get the dimensions of the video itself
 * @param {Object} Player
 * @return {Promise<Object>} The width and height as integers or undefined
 */
const getYouTubeDimensions = async player => {
  let w
  let h
  for (let p in player) {
    let prop = player[p]
    if (typeof prop === 'object' && prop.width && prop.height) {
      w = prop.width
      h = prop.height
      break
    }
  }
  return { w, h }
}

/**
 * @method getVimeoDimensions Get the dimensions of the video itself
 * @param {Object} Player
 * @return {Promise<Object>} The width and height as integers or undefined
 */
const getVimeoDimensions = async player => {
  let w
  let h
  const dimensions = await Promise.all([player.getVideoWidth(), player.getVideoHeight()]);
  if (dimensions) {
    w = dimensions[0];
    h = dimensions[1];
    return { w, h }
  } else {
     w = player.iframe.clientWidth
    h = player.iframe.clientHeight
  };
}

const providerUtils = {
  youtube: {
    parsePath: 'query.t',
    timeRegex: /[hms]/,
    idRegex: YOUTUBE_REGEX,
    getDimensions: getYouTubeDimensions
  },
  vimeo: {
    parsePath: null,
    timeRegex: /[#t=s]/,
    idRegex: VIMEO_REGEX,
    getDimensions: getVimeoDimensions
  }
}

/**
 * @method getTimeParameter YouTube and Vimeo have optional URL formats to allow
 *    playback to begin from a certain point in the video.
 * @return {String or false} The appropriate time parameter or false.
 */
const getTimeParameter = (parsedUrl, source) => {
  if (source == 'youtube') {
    return parsedUrl.query.t;
  } else {
    return null
  }
}

/**
 * @method getStartTime Parse the start time base on the URL formats of YouTube and Vimeo.
 * @param {String} [url] The URL for the video, including any time code parameters.
 * @return {Number} Time in seconds
 */
const getStartTime = (url, source) => {
  const parsedUrl = new parseUrl(url, true)
  let timeParam = getTimeParameter(parsedUrl, source)
  if (!timeParam) {
    return
  }

  const match = timeParam.split(providerUtils[source].timeRegex).filter(Boolean)
  let s = parseInt(match.pop(), 10) || 0
  let m = parseInt(match.pop(), 10) * 60 || 0
  let h = parseInt(match.pop(), 10) * 3600 || 0
  return h + m + s
}

/**
 * @method getVideoSource Determine the video source from the URL via regex.
 * @param {String} [url] The URL for the video
 * @return {String} Video provider name
 */
const getVideoSource = (url = DEFAULT_PROPERTY_VALUES.url) => {
  let match = url.match(YOUTUBE_REGEX)
  if (match && match[2].length) {
    return 'youtube'
  }

  match = url.match(VIMEO_REGEX)
  if (match && match[3].length) {
    return 'vimeo'
  }

  console.error(`Video source ${ url } does not match supported types`)
  return UNSUPPORTED_VIDEO_SOURCE
}

/**
 * @method getVideoId Get the video ID for use in the provider APIs.
 * @param {String} [url] The URL for the video
 * @param {String} [source] Video provider name
 * @return {String} Video ID
 */
const getVideoID = (url = DEFAULT_PROPERTY_VALUES.url, source = null) => {
  const provider = providerUtils[source];
  let match = provider && url.match(provider.idRegex)
  const id = source === 'vimeo' ? match[3] : match[2]
  if (match && id.length) {
    return id
  }

  console.error(`Video id at ${ url } is not valid`)
}


/**
 * @method findPlayerAspectRatio Determine the aspect ratio of the actual video itself,
 *    which may be different than the IFRAME returned by the video provider.
 * @return {Promise<Number>} A ratio of width divided by height.
 */
const findPlayerAspectRatio = async (container, player, videoSource) => {
  let w
  let h
  if (player) {
    const dimensions = await providerUtils[videoSource].getDimensions(player)
    w = dimensions.w
    h = dimensions.h
  }

  if (!w || !h) {
    w = container.clientWidth
    h = container.clientHeight
    console.warn(`No width and height found in ${videoSource} player ${player}. Using container dimensions.`)
  }
  return parseInt(w, 10) / parseInt(h, 10)
}

const getPlayerElement = (container) => {
  let playerElement = container.querySelector('#player');
  if (!playerElement) {
    playerElement = container.ownerDocument.createElement('div');
    playerElement.id = 'player';
    container.appendChild(playerElement);
  }

  playerElement.setAttribute('style', 'position: absolute; top: 0; bottom: 0; left: 0; right: 0;')

  return playerElement
}

export { findPlayerAspectRatio, getPlayerElement, getStartTime, getVideoID, getVideoSource }