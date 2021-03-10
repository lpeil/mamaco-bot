const commands = [
  { text: "!salutation", action: salutation },
  { text: "!help", action: help },
  { text: "!text", action: text }
]

async function service(content, services) {
  content.bot.on('message', async (msg) => { 
    const content = msg.content

    for(var command of commands) {
      if(content.startsWith(command.text)) {
        command.action(msg, content, services)
        break
      }
    }

    readMessage(msg, services)
  });
}

async function salutation(msg, content, services) {
  const fileData = await services.data.get('salutations')
  
  var command = content.replace("!salutation ", "")
  var splitted = command.split(" ")
      
  var user = splitted.shift().replace('<@!', "").replace(">", "")
  var music = splitted.join(" ")
  
  if(music !== "remove") {
    fileData[user] = music
    msg.reply("Adicionado com sucesso")
  } else {
    delete fileData[user]
    msg.reply("Removido com sucesso")
  }

  services.data.save(fileData, 'salutations')
}

async function text(msg, content, services) {
  const fileData = await services.data.get('texts')
  
  var command = content.replace("!text ", "")
  var splitted = command.split('"')
      
  var text = splitted[1]
  var music = splitted[2].replace(" ", "")
  
  if(music !== "remove") {
    fileData[text] = music
    msg.reply("Adicionado com sucesso")
  } else {
    delete fileData[text]
    msg.reply("Removido com sucesso")
  }

  services.data.save(fileData, 'texts')
}

async function readMessage(msg, services) {    
  const fileData = await services.data.get('texts')
  const textVideo = fileData[msg.content]

  if(textVideo) {
    msg.delete()
    
    const voiceChannel = msg.member.voice.channel
    services.playSound(voiceChannel, textVideo)
  }
}

async function help(msg) {
  msg.reply(`\n!salutation @<user> <link/disable>: Toca vídeo quando alguém entra em alguma sala \n!text "<text> <link/disable>: Toca vídeo quando o texto é digitado"`)
}

module.exports = service
