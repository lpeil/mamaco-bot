require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const path = require("path");

const TOKEN = process.env.TOKEN;

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
    const dispatcher = connection.play(path.join(__dirname, './medias/mamaco.mp3'));
    
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
