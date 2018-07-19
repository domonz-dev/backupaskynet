const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {
  const voiceChannel = message.member.voiceChannel;
  if (message.guild.me.voiceChannel) {
    return message.channel.send("Извини, но бот уже в голосовом канале!");
  }
  if (!voiceChannel) {
    return message.channel.send("Извини, но тебе нужно быть в одном канале с ботом!");
  }
  voiceChannel.join();
  message.channel.send({
    embed: {
      "description": "**Joined " + voiceChannel.name + "**",
      "color": 3604287
    }
  });

}