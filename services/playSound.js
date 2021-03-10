const ytdl = require('ytdl-core');

const streamOptions = { seek: 0, volume: 1 };

function playSound(voiceChannel, video) {
  voiceChannel.join().then(connection => {
    const stream = ytdl(video, { filter : 'audioonly' });

    const dispatcher = connection.play(stream, streamOptions);
    
    dispatcher.on('start', () => {
      dispatcher.setVolume(0.90);
    }); 

    dispatcher.on('error', (err) => console.error(err));

    dispatcher.on('finish', () => { 
      voiceChannel.leave();
    });

  }).catch(err => console.error(err))
}

module.exports = playSound