async function service(content, services) {
  content.bot.on('voiceStateUpdate', async (oldUser, newUser) => { 
    const voiceChannel = newUser.member.voice.channel;
    
    if(voiceChannel && newUser.member.id != content.botId && oldUser.channelID === null) {
      const fileData = await services.data.get('salutations')

      const userVideo = fileData[newUser.member.id]

      if(userVideo != "disable") {
        services.playSound(voiceChannel, userVideo || fileData.default)
      }
    } 
  });
}

module.exports = service
