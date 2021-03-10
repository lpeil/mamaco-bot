async function service(content, services) {
  content.bot.on('message', async (msg) => { 
    const content = msg.content
  
    if(content.startsWith("!enter")) {
      const fileData = await services.data.get('enter')
  
      var command = content.replace("!enter ", "")
      var splitted = command.split(" ")
      
      var user = splitted.shift().replace('<@!', "").replace(">", "")
      var music = splitted.join(" ")

      fileData[user] = music
  
      services.data.save(fileData, 'enter')
  
      msg.reply("Adicionado com sucesso")
    }
    
    if(content === 'mamaco') {
      const fileData = await services.data.get('enter')
      
      const voiceChannel = msg.member.voice.channel
      
      services.playSound(voiceChannel, fileData.mamaco)

      msg.delete()
    }
  });
}

module.exports = service
