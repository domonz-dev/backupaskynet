const Discord = require('discord.js');
const weather = require('weather-js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  weather.find({
    search: args.join(" "),
    degreeType: 'C'
  }, function(err, result) {
    if (err) console.log(err);
    if (result === undefined || result.length === 0) {
      message.channel.send({
        embed: {
          "description": "**Введите место**",
          "title": "Ошибка",
          "color": 16729413
        }
      })
      return;
    }
    var current = result[0].current;
    var location = result[0].location;
    const embed = new Discord.RichEmbed()
      .setDescription(`**${current.skytext}**`)
      .setAuthor(`Weather for ${current.observationpoint}`)
      .setThumbnail(current.imageUrl)
      .setColor(0x00AE86)
      .addField('Таймкод', `UTC${location.timezone}`, true)
      .addField('Тип градуса', location.degreetype, true)
      .addField('Температкра', `${current.temperature} Degrees`, true)
      .addField('Ощущается', `${current.feelslike} Degrees`, true)
      .addField('Скорость ветра', current.winddisplay, true)
      .addField('Влажность', `${current.humidity}%`, true)
    message.channel.send({
      embed
    });
  })
}