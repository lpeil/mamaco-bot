require('dotenv').config();
const Discord = require('discord.js');

const services = {
  enter: require('./services/enter'),
  data: require('./services/data'),
  readMessage: require('./services/readMessage'),
  playSound: require('./services/playSound'),
}

const start = async () => {
  const content = {
    token: process.env.TOKEN,
    bot: new Discord.Client()
  }

  content.bot.login(content.token)

  content.bot.on('ready', () => {
    console.info(`Logged in as ${content.bot.user.tag}!`);
    content.botId = content.bot.user.id
  });

  services.enter(content, services);
  services.readMessage(content, services);
}

start();