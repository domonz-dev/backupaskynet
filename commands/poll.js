const Discord = require("discord.js");

exports.run = (client, message, args) => {

  let question = args[0];

  if (args.length === 0)
  return message.reply('**Неправильная форма опроса:** `poll <Q>`')

  const embed = new Discord.RichEmbed()
  .setTitle("Опрос:")
  .setColor("#31D1B0")
  .setDescription(`${question}`)
  .setFooter(`Опрос создал ${message.author.username}`, `${message.author.avatarURL}`)

  message.channel.send({embed}).then(msg => { 
    msg.react('👍').then( r => { 
      msg.react('👎')})});
}