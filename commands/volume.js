var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("Сейчас ничего не играет! Используй `play <url>|<song>` чтобы поставить композицию в очередь.");
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Ты должен быть в одном канале с ботом!");

  if (!args[0]) {
    return message.channel.send({
      embed: {
        "description": "Громкость: **" + fetched.dispatcher.volume * 100 + "%**"
      }
    });
  }
  if (isNaN(args[0]) || args[0] > 200 || args[0] <= 0) {
    return message.channel.send("Введите число от 1 до 200");
  }
  if (args[0] > config[message.guild.id].maxVolume) {
    return message.channel.send("Введите число не превышающее параметр `maxVolume` - " + config[message.guild.id].maxVolume + "%");
  }

  fetched.dispatcher.setVolume(args[0] / 100);

  message.channel.send("Установлена громкость: " + args[0] + "%");

}