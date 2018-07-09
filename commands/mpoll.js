const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {
  db.fetch(`guild_${message.guild.id}`).then(i => { //Looking guildID
    
    const embedError = new Discord.RichEmbed()
    .setTitle("Ошибка")
    .setColor("#FF2222")
    .setDescription("Неверный формат опроса - `mpoll <question>|<answer1>|...|<answer9>`")
    .setFooter(message);
    
    let args1 = message.content.slice(i.prefix.length + "mpoll".length).trim().split('|'); //Setting-up arguments of command
    if (args1 === null || args1.length < 3 || args1.length > 10) {
        return message.channel.send({ embedError }); 
    }

    let choices = ["", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
    let question = args1[0].trim();
    var answers = "";
    for (var i = 1; i < args1.length; i++) {
        answers += "\n" + choices[i] + " " + args1[i].trim();
    }

    const embed = new Discord.RichEmbed()
        .setColor("#31D1B0")
        .setDescription(answers)
        .setFooter(`Опрос создал ${message.author.username}`, message.author.avatarURL);

    message.channel.send('❓ **' + question + '**', {
        embed
    }).then(async function (msg) {
        for (var i = 1; i < args1.length; i++) {
            await msg.react(choices[i]);
        }
    });
  });
}