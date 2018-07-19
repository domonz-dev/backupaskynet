const math = require('mathjs');
const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => {
  
  if (!args[0]) return message.channel.send({ embed: {"description": "Введите какой-нибудь пример, ухх, не терпится его решить!", "color": 16725815} });
  
  let resp;
  try {
    resp = math.eval(args.join(' '));
  } catch (e) {
    return message.channel.send({ embed: {"description": "П-похоже что я не могу решить этот пример...", "color": 16725815} });
  }
  
  
  const embed = new Discord.RichEmbed()
    .setColor(0xffffff)
    .setTitle('Результат:')
    .addField('Ввод', `\`\`\`js\n${args.join(' ')}\`\`\``)
    .addField('Вывод', `\`\`\`js\n${resp}\`\`\``);
  
  message.channel.send(embed);
  
}