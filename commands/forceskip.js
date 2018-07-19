var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("Сейчас ничего не играет! Используй `play <url>|<song>` чтобы поставить композицию в очередь.");
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Ты должен быть в одном канале с ботом!");

  message.channel.send("Композиция пропущена!");
  if (!fetched.queue.length == 0) {
    return fetched.dispatcher.emit('finish');
  } else {
    return fetched.dispatcher.end();
  }
  ops.active.set(message.guild.id, fetched);

}