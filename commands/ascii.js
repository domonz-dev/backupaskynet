const figlet = require('figlet');
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  
  const embedError1 = new Discord.RichEmbed()
  .setTitle("Ошибка")
  .setColor("#FF2222")
  .setDescription('Текст не должен превышать 14 символов!')
  .setFooter(message);
  
  const embedError2 = new Discord.RichEmbed()
  .setTitle("Ошибка")
  .setColor("#FF2222")
  .setDescription('Введите текст! Команда: ascii <text>')
  .setFooter(message);
  
  if(args.join(' ').length > 14) return message.channel.send({ embedError1 }) 
  if (!args.join(' ')) return message.channel.send({ embedError2 }); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send(data , {code: 'AsciiArt'})
    })
};