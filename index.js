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
  const voiceChannel = newState.voiceChannel;
  const oldChannel = oldState.voiceChannel;

  if(voiceChannel && newState.user.id != 819188029657710604 && oldChannel === undefined) {
    playMamaco(voiceChannel)
  }  
});

bot.on('message', msg => { 
  if(msg.content === 'mamaco') {
    const voiceChannel = msg.member.voiceChannel
    playMamaco(voiceChannel)
  }  
});

function playMamaco(voiceChannel) {
  voiceChannel.join().then(connection => {
    console.log('mamaco play')
    connection.playFile(path.join(__dirname, './medias/mamaco.mp3'));
    
    setTimeout(() => {
      voiceChannel.leave();
    }, 15000)
  }).catch(err => console.log(err))
}
