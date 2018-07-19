const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  var resp = "**Всего пользователей: **" + client.users.size + "\n" +
             "**Всего серверов: **" + client.guilds.size + "\n" +
             "**Всего каналов: **" + client.channels.size + "\n\n" +
             "Участников: " + message.guild.memberCount + "\n" + 
             "Онлайн: " + message.guild.members.filter(o => o.presence.status === 'online').size + "\n" + 
             "Спят: " + message.guild.members.filter(i => i.presence.status === 'idle').size + "\n" + 
             "Оффлайн: " + message.guild.members.filter(a => a.presence.status === 'offline').size;
  
  let embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setDescription(resp)
    .setTitle("Статистика")
    .setFooter(message + " | Владелец: " + message.guild.owner.user.tag);
  
  message.channel.send(embed);
}