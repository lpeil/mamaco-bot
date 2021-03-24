const cron = require('node-cron');
const Discord = require('discord.js');
require('dotenv').config();

const services = {
  data: require('./services/data'),
  readMessage: require('./services/readMessage'),
  salutation: require('./services/salutation'),
  playSound: require('./services/playSound'),
  news: require('./services/news'),
}

const content;

const start = async () => {
  content = {
    token: process.env.TOKEN,
    bot: new Discord.Client()
  }

  content.bot.login(content.token)

  content.bot.on('ready', () => {
    console.info(`Logged in as ${content.bot.user.tag}!`);
    content.botId = content.bot.user.id
  });

  services.salutation(content, services);
  services.readMessage(content, services);
}

cron.schedule('02 17 * * *', () => services.news(content))

start();