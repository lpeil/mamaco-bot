const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const newsChatId = "824358432760791060";

const startNews = async (content) => {
  const channel = await content.bot.channels.fetch(newsChatId);
  const categories = getCategories()   

  for (const category of categories) {
    setCronNews(category, channel)
  }
}
  
const setCronNews = (category, channel) => {
  cron.schedule(category.time, () => getNewsFromCategory(category, channel))
}

const getNewsFromCategory = async (category, channel) => {
  const apiKey = process.env.NEWS_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?country=br&category=${category.id}&apiKey=${apiKey}`;

  return await axios.get(url)
    .then((response) => response.data)
    .then((data) => {
      checkArticles(category, data.articles, channel);
    })
}

const checkArticles = async (category, articles, channel) => {
  for(const article of articles) {
    if(article.title && article.urlToImage) {
      return await sendArticleIntoChannel(category, article, channel)
    }
  }
}

const sendArticleIntoChannel = async (category, article, channel) => {
  return await channel.send(
    `[${category.name}] ${article.title} \n ${article.url}`
  )
}

const getCategories = () => {
  return [
    { id: 'entertainment', name: 'Entretenimento', time: '00 15 * * *'},
    { id: 'business', name: 'Negócios', time: '30 11 * * *'},
    { id: 'health', name: 'Saúde', time: '00 09 * * *'},
    { id: 'science', name: 'Ciência', time: '00 16 * * *'},
    { id: 'sports', name: 'Esportes', time: '00 12 * * *'},
    { id: 'technology', name: 'Têcnologia', time: '00 14 * * *'},
  ]
}

module.exports = startNews;
