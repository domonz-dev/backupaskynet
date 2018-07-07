const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {   
    let args1 = message.content.slice(config.prefix.length + "mpoll".length).trim().split('|'); //Setting-up arguments of command
    if (args1 === null || args1.length < 3 || args1.length > 10) {
       return message.reply("неверный формат опроса - `mpoll <question>|<answer1>|...|<answer9>`");
    }  
  
    let choices = [ "", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣" ];
    let question = args1[0].trim();
    var answers = "";
    for (var i = 1; i < args1.length; i++) {
        answers += "\n" + choices[i] + " " + args1[i].trim();
    }

    const embed = new Discord.RichEmbed()
        .setTitle("Опрос:")
        .setColor("#31D1B0")
        .setTitle(question)
        .setDescription(answers)
        .setFooter(`Опрос создал ${message.author.username}`, message.author.avatarURL);
  
    message.channel.send({ embed }).then(async function (msg) {
        for(var i = 1; i < args1.length; i++) {
            await msg.react(choices[i]);
        }
    });
}