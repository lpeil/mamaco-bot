require('dotenv').config();
const Discord = require('discord.js');

const services = {
  data: require('./services/data'),
  readMessage: require('./services/readMessage'),
  salutation: require('./services/salutation'),
  playSound: require('./services/playSound'),
  news: require('./services/news'),
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

    services.news(content);
  });

  services.salutation(content, services);
  services.readMessage(content, services);
}

start();