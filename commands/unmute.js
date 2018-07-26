const Discord = require("discord.js");
const ms = require("ms");
const send = require('quick.hook'); //WebHooks lib
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

module.exports.run = async (client, message, args) => {
  
  let log = client.channels.get('471603875749691393') // Logging channel

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
  
  if (!tomute.roles.has(muterole.id)) return message.channel.send({
      embed: {
        "description": `<@${tomute.id}> already unmuted or haven't been muted`,
        "color": 0xff2222,
        "title": "Error"
      }
    }).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });

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
  
  var unmuteLog = new Discord.RichEmbed()
    .setColor(0xf4d742)
    .setDescription(`<@${tomute.id}>` + " unmuted by " + message.author.tag)
    .setTitle("User unmuted in " + message.guild.name);
  
  send(log, unmuteLog, {"name": "Mute Log", "icon": "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"});

}