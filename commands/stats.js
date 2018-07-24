const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  var resp = "**Bot users: **" + client.users.size + "\n" +
    "**Bot guilds: **" + client.guilds.size + "\n" +
    "**Bot channels: **" + client.channels.size + "\n\n" +
    "Members: " + message.guild.memberCount + "\n" +
    "Online: " + message.guild.members.filter(o => o.presence.status === 'online').size + "\n" +
    "Away: " + message.guild.members.filter(i => i.presence.status === 'idle').size + "\n" +
    "Offline: " + message.guild.members.filter(a => a.presence.status === 'offline').size;

  let embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setDescription(resp)
    .setTitle("Stats")
    .setFooter(message + " | Owner: " + message.guild.owner.user.tag).then(msg => {
      if (conf[message.guild.id].delete == 'true') {
        msg.delete(conf[message.guild.id].deleteTime);
      }
    });

  message.channel.send(embed);
}