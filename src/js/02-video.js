import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

const timeUpdate = throttle(data => {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000);

player.on('timeupdate', timeUpdate);

player.on('loaded', () => {
  const timeToUpdate = localStorage.getItem(STORAGE_KEY);
  player
    .setCurrentTime(Number.parseFloat(timeToUpdate))
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          break;
        default:
          break;
      }
    });
});
