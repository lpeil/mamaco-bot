const ytdl = require('ytdl-core-discord');

const streamOptions = { seek: 0, volume: 1, type: 'opus' };

function playSound(voiceChannel, video) {
  voiceChannel.join().then(async (connection) => {
    const dispatcher = await connection.play(
      await ytdl(video, { filter : 'audioonly' }), 
      streamOptions
    );
    
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