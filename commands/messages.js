const Discord = require('discord.js');
const db = require('quick.db');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args) => { //Collecting info about command
  let member = message.mentions.members.first() || message.member;

  let global = await db.fetch(`globalMessages_${member.id}`);
  let guild = await db.fetch(`guildMessages_${member.guild.id}_${message.author.id}`);
  
  var embed = new Discord.RichEmbed()
    .setColor(0x6EFFE4)
    .setTitle("Количество сообщений...")
    .addField("...всего", global)
    .addField("...на сервере", guild)
    .setFooter(message)
  
  message.channel.send(embed);
}