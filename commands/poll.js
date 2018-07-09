const Discord = require("discord.js");

exports.run = (client, message, args) => {

  let question = args[0];

  if (args.length === 0) {
    return message.send({ embed }); 
  }
  
  if (args.length >= 2) {
    return message.reply("используй для этого команду `mpoll <q> <a1>...<a9>`");
  }

  const embed = new Discord.RichEmbed()
  .setTitle("Помощь")
  .setColor("#31D1B0")
  .setDescription("Помощь по команде poll и mpoll")
  .addField("Простой опрос (Да/Нет)", "`poll` - это меню\n`poll <question>` - создание опроса")
  .addField("Опрос c выбором ответа", "`mpoll` - это меню\n`mpoll <question> <a1>...<a9>` - создание опроса с выбором ответа")
  
  const embed1 = new Discord.RichEmbed()
  .setTitle("Опрос:")
  .setColor("#31D1B0")
  .setDescription(question)
  .setFooter(`Опрос создал ${message.author.username}`, `${message.author.avatarURL}`)

  message.channel.send({embed1}).then(async function(msg) { 
    await msg.react('👍');
    await msg.react('👎');
  });
}