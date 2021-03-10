require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const ytdl = require('ytdl-core')

const TOKEN = process.env.TOKEN;

const streamOptions = { seek: 0, volume: 1 };

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldState, newState) => { 
  const voiceChannel = newState.member.voice.channel;
  
  if(voiceChannel && newState.member.id != 819188029657710604 && oldState.channelID === null) {
    playMamaco(voiceChannel)
  } 
});

bot.on('message', msg => { 
  if(msg.content === 'mamaco') {
    const voiceChannel = msg.member.voice.channel
    playMamaco(voiceChannel)
  }  
});

function playMamaco(voiceChannel) {
  voiceChannel.join().then(connection => {
    const stream = ytdl('https://youtu.be/NBQBlmyHEso', { filter : 'audioonly' });

    const dispatcher = connection.play(stream, streamOptions);
    
    dispatcher.on('start', () => {
      dispatcher.setVolume(0.90);
      console.log("Playing mamaco");
    }); 

    dispatcher.on('error', (err) => console.log(err));

    dispatcher.on('finish', () => { 
      console.log("Stop mamaco");
      voiceChannel.leave();
    });

  }).catch(err => console.log(err))
}
