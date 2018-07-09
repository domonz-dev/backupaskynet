// var fs = require('fs'); //FileSystem
// let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
// var pref = conf.prefix;

const db = require('quick.db');

exports.run = (client, message, args) => { //Collecting info about command
  
    db.fetch(`guild_${message.guild.id}`).then(i => {
      
      const embed = { //Embed with help
          "title": "***Меню помощи***",
          "description": `Здесь я написал для тебя все мои команды \n*Мой префикс - ${i.prefix}*`,
          "color": 16776960,
          "timestamp": "1337-01-01T02:28:00",
          "footer": {
              "text": i.prefix + "help"
          },
          "fields": [{
              "name": "Команды",
              "value": "`help` - это меню \n`ping` - проверить работоспособность бота\n`reload` - перезагрузить модуль\n`poll <q>` - создать опрос(Да/Нет)\n`mpoll <q> <a1>...<a9>` - создать опрос с выбором ответов\n`settings (module) (val)` - настройки бота\n`prefix` - посмотреть текущий префикс\n`ascii <string>` - написать тест крупным шрифтом"
          }]
      };
      message.channel.send({ //Send it
          embed
      });
    });
}