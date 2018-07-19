const Discord = require("discord.js");
const db = require('quick.db');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => {
  db.startsWith(`guildMessages_${message.guild.id}`, {
    sort: '.data'
  }).then(resp => {
    resp.length = 15;

    let title = 'Таблица лидеров';
    var finalLb;
    for (var i in resp) {
      finalLb += `${client.users.get(resp[i].ID.split('_')[2]).username} - \`${resp[i].data}\`\n`;
    }

    message.channel.send({
      embed: {
        "description": finalLb,
        "title": title,
        "color": 16777215
      }
    });
  });
}