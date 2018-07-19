const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  if (!args[0]) {
    const errEmbed = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setAuthor('ERROR')
      .setTitle(':exclamation: Usage: **8ball (question)**');
    message.channel.send({
      embed: errEmbed
    })
    return;
  }
          if (conf[message.guild.id].delete == 'true') {
            message.delete(conf[message.guild.id].deleteTime);
          }
  var sayings = [
    "ДА БЛЯТЬ",
    "Моё категорическое да",
    "Безусловно",
    "Без сомнений",
    "ТОЧНО НЕТ, ТОЧНЕЕ БЫТЬ НЕ МОЖЕТ АААА",
    "Бля, хз",
    "Скорре всего",
    "Наверное да...",
    "Да",
    "Мой хуй говорит мне, что да",
    "ОтвеТ %че?ь стр9nnЫ!",
    "Сnр0с!te п0зж@",
    "Ухх, лучше чтобы ты не знал этого...",
    "Не думаю",
    "Мой категорический ответ - нет",
    "Гугл сказал мне 'нет'",
    "Нет БЛЯТЬ",
    "Сомнительно"
  ];

  var result = Math.floor((Math.random() * sayings.length) + 0);
  const ballEmb = new Discord.RichEmbed()
    .setColor(0x00FFFF)
    .setAuthor('8ball', 'https://findicons.com/files/icons/1700/2d/512/8_ball.png')
    .addField(args, sayings[result]);
  message.channel.send({
    embed: ballEmb
  }).then(msg => {
          if (conf[message.guild.id].delete == 'true') {
            msg.delete(conf[message.guild.id].deleteTime);
          }
        });
}