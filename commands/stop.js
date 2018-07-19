var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("Сейчас ничего не играет! Используй `play <url>|<song>` чтобы поставить композицию в очередь.");
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Ты должен быть в одном канале с ботом!");

  fetched.dispatcher.end();
  message.channel.send({
    embed: {
      "description": "Критическая остановка!",
      "color": 16725558
    }
  });

  let vc = client.guilds.get(fetched.dispatcher.guildID).me.voiceChannel;
  if (vc) {
    vc.leave();
    ops.active.delete(fetched.dispatcher.guildID);
  }

}