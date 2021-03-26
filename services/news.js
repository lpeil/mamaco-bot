const axios = require('axios');
require('dotenv').config();

const newsChatId = "824358432760791060";

const startNews = async (content) => {
  const channel = await content.bot.channels.fetch(newsChatId);
  const categories = getCategories()   

  for(const category of categories) {
    getNewsFromCategory(category, channel);
  }
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
    `[${category.name}] ${article.title} \n ${article.url}`,
  )
}

const getCategories = () => {
  return [
    { id: 'entertainment', name: 'Entretenimento'},
    { id: 'business', name: 'Negócios'},
    { id: 'health', name: 'Saúde'},
    { id: 'science', name: 'Ciência'},
    { id: 'sports', name: 'Esportes'},
    { id: 'technology', name: 'Têcnologia'},
  ]
}

module.exports = startNews;
