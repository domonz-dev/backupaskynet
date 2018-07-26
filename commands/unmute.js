const Discord = require("discord.js");
const ms = require("ms");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
    embed: {
      "title": "You don't have permissions, baby",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  
  if (!tomute) return message.channel.send({
    embed: {
      "title": "Couldn't find user :anguished: ",
      "color": 0xff2222
    }
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
  
  let muterole = message.guild.roles.find(`name`, "With Dick In Mouth");

    tomute.removeRole(muterole.id);
    message.channel.send({
      embed: {
        "description": `<@${tomute.id}> has been unmuted by <@${message.author.id}>!`,
        "color": 0x22ff22,
        "title": "Unmuted"
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });

}