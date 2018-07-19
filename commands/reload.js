const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command
  if (message.author.id !== ops.ownerId) return message.channel.send('Эй, ты кто такой? Только владелец может делать такое!'); //If author of message isn't a bot owner, then warn him.
  if (args[0] != undefined) { // If isn't a null...

    try { //Trying to delete cache of the command
      delete require.cache[require.resolve(`./${args[0]}.js`)];
      message.channel.send({
        embed: {
          "color": 3407679,
          "timestamp": "1337-01-01T02:28:00",
          "footer": {
            "text": message + ""
          },
          "description": "Команда **``" + args[0] + "``** успешно перезагружена",
          "title": "Успех"
        }
      }).then(msg => {
        if (config[message.guild.id].delete == 'true') {
          msg.delete(config[message.guild.id].deleteTime);
        }
      });
    } catch (e) {
      return message.channel.send({
        embed: {
          "color": 16724787,
          "timestamp": "1337-01-01T02:28:00",
          "footer": {
            "text": message + ""
          },
          "description": "Команду ``**" + args[0] + "**`` не удалось перезагрузить",
          "title": "Ошибка"
        }
      }).then(msg => {
        if (config[message.guild.id].delete == 'true') {
          msg.delete(config[message.guild.id].deleteTime);
        }
      });
    }
  } else {
    message.channel.send({
      embed: {
        "color": 16724787,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите команду',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }
}