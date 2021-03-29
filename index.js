const Discord = require('discord.js');
require('dotenv').config();

const services = {
  data: require('./services/data'),
  readMessage: require('./services/readMessage'),
  salutation: require('./services/salutation'),
  playSound: require('./services/playSound'),
  news: require('./services/news'),
}

const content = {
  token: process.env.TOKEN,
  bot: new Discord.Client()
};

const start = async () => {
  content.bot.login(content.token)

  content.bot.on('ready', () => {
    console.info(`Logged in as ${content.bot.user.tag}!`);
    console.info(`Logged in at ${new Date().toLocaleString('en-BG')}!`);
    content.botId = content.bot.user.id
    
    services.news(content)
  });

  services.salutation(content, services);
  services.readMessage(content, services);
}

start();
