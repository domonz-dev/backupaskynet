const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {

  let question = args[0];
  
  

  const embed = new Discord.RichEmbed()
  .setTitle("Помощь")
  .setColor("#31D1B0")
  .setDescription("Помощь по команде poll и mpoll")
  .addField("Простой опрос (Да/Нет)", "`poll` - это меню\n`poll <question>` - создание опроса")
  .addField("Опрос c выбором ответа", "`mpoll` - это меню\n`mpoll <question> <a1>...<a9>` - создание опроса с выбором ответа")
  .setFooter(message);
  
  const embed1 = new Discord.RichEmbed()
  .setTitle("Опрос:")
  .setColor("#31D1B0")
  .setDescription(question)
  .setFooter(`Опрос создал ${message.author.username}`, `${message.author.avatarURL}`);
  
  const embedError = new Discord.RichEmbed()
  .setTitle("Ошибка")
  .setColor("#FF2222")
  .setDescription("Пожалуйста, используйте для этого команду ``mpoll <q> <a1>...<a9>``!")
  .setFooter(message);
  
  if (args.length === 0) {
    return message.channel.send({ embed }); 
  }
  
  if (args.length >= 2) {
    return message.channel.send({ embedError });
  }

  message.channel.send({embed1}).then(async function(msg) { 
    await msg.react('👍');
    await msg.react('👎');
  });
}