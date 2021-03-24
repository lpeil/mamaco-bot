const axios = require('axios');
require('dotenv').config();

const url = "https://newsapi.org/v2/top-headlines?country=br&category=entertainment&pageSize=5&apiKey=";
const apiKey = process.env.NEWS_API_KEY;
const newsChatId = "824358432760791060";

const startNews = async (content) => {
  const channel = await content.bot.channels.fetch(newsChatId);

   axios.get(url + apiKey)
    .then((response) => response.data)
    .then((data) => {
      for(const article of data.articles) {
        if(article.title && article.urlToImage) {
          channel.send(
            article.title,
            {files: [article.urlToImage]}
          )
          break;
        }
      }
    })
}

module.exports = startNews;
