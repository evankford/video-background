import { getPlayerElement } from '../utils/utils'

/**
 * Set up the YouTube script include if it's not present
 */
const initializeYouTubeAPI = (win) => {
  return new Promise((resolve, reject) => {
    if (win.document.documentElement.querySelector('script[src*="www.youtube.com/iframe_api"].loaded')) {
      resolve('already loaded');
      return;
    }

    const tag = win.document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = win.document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    tag.addEventListener('load', (evt) => {
      evt.currentTarget.classList.add('loaded');
      resolve('api script tag created and loaded');
    }, true);
    tag.addEventListener('error', (evt) => {
      reject('Failed to load YouTube script: ', evt);
    });
  });
};

/**
 * YouTube event handler. Add the proper class to the player element, and set
 * player properties. All player methods via YouTube API.
 */
const onYouTubePlayerReady = (event, startTime) => {
  const player = event.target;

  player.iframe = player.getIframe();
  player.mute();
  player.ready = true;
  player.seekTo(startTime < player.getDuration() ? startTime : 0);
  if (player.shouldPlay == true) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
};

let playLoopChecker = 0;
let playCheckerI = 0
let playCheckerMax = 20
function checkPlayLoop(playerParent)  {
  const player = getPlayerElement(playerParent);
  playLoopChecker = setInterval(() => {
    playCheckerI++;
    if (player.shouldPlay === true || player.iframe && this.player.iframe.getAttribute('data-should-play') == true) {
      player.play();
      playCheckerI = 0;
      window.clearInterval(playLoopChecker);
      playLoopChecker = 0;
      return true;
    } else if (playCheckerI >= 20) {
      playCheckerI = 0;
      window.clearInterval(playLoopChecker);
      playLoopChecker = 0;
      return false;
    }
  }, 500);
}
/**
 * YouTube event handler. Determine whether or not to loop the video.
 */
const onYouTubePlayerStateChange = (event, startTime, win, speed = 1, container) => {
  const player = event.target;
  const duration = (player.getDuration() - startTime) / speed;

  const doLoop = () => {
    if ((player.getCurrentTime() + 0.1) >= player.getDuration()) {
      player.pauseVideo();
      player.seekTo(startTime);
      if (player.shouldPlay == true) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
    requestAnimationFrame(doLoop);
  };
  const tryToPlay = () => {
    player.playVideo();
  }

 if (event.data === win.YT.PlayerState.BUFFERING &&
     (player.getVideoLoadedFraction() !== 1) &&
     (player.getCurrentTime() === 0 || player.getCurrentTime() > duration - -0.1)) {
    return 'buffering';
  } else if (event.data === win.YT.PlayerState.PLAYING) {
    if (player.shouldPlay == true) {
       requestAnimationFrame(doLoop);
       return 'playing';

      } else {
        player.pauseVideo();
        return 'pausing';
     }
  } else if (event.data === win.YT.PlayerState.ENDED) {
    if (player.shouldPlay == true) {
      player.playVideo();
    } else {
      player.pauseVideo();
    }
    return "ENDED";
  } else {
    checkPlayLoop(container);
    return event.data;
  }
};

/**
 * Initialize the player and bind player events.
 */
const initializeYouTubePlayer = ({
  container, win, videoId, startTime, speed, readyCallback, stateChangeCallback
}) => {
  let playerElement = getPlayerElement(container);

  const makePlayer = () => {
    return new win.YT.Player(playerElement, {

      videoId: videoId,
      host: "https://www.youtube.com",
      playerVars: {
        autohide: 1,
        autoplay: 0,
        controls: 0,
        enablejsapi: 1,
        iv_load_policy: 3,
        loop: 0,
        modestbranding: 1,
        muted: true,
        playsinline: 1,
        rel: 0,
        showinfo: 0,
        wmode: "opaque",
      },
      events: {
        onReady: function (event) {
          onYouTubePlayerReady(event, startTime);
          readyCallback(event.target);
        },
        onStateChange: function (event) {
          const state = onYouTubePlayerStateChange(
            event,
            startTime,
            win,
            speed,
            container
          );

          stateChangeCallback(state, state);
        },
      },
    });
  };

  return new Promise((resolve, reject) => {
    const checkAPILoaded = () => {
      if (win.YT.loaded === 1) {
        resolve(makePlayer());
      } else {
        setTimeout(checkAPILoaded, 100);
      }
    };

    checkAPILoaded();
  });
};

export {
  initializeYouTubeAPI,
  initializeYouTubePlayer
};