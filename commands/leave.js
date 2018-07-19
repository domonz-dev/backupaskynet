const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {
  if (!message.guild.me.voiceChannel) {
    return message.channel.send("Извини, но бот уже вышел!");
  }
  message.guild.me.voiceChannel.leave();
  message.channel.send({
    embed: {
      "description": "**Left " + message.guild.me.voiceChannel.name + "**",
      "color": 16720190
    }
  });

}