var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => { //Collecting info about command
  var pref = conf[message.guild.id].prefix;
  const embed = { //Embed with help
    "title": "***Меню помощи***",
    "description": "Здесь я написал для тебя все мои команды \n*Мой префикс - ``" + pref + "``*",
    "color": 16776960,
    "timestamp": "1337-01-01T02:28:00",
    "footer": {
      "text": message + ""
    },
    "fields": [{
      "name": "Команды",
      "value": "`help` - это меню \n`ping` - проверить работоспособность бота\n`reload` - перезагрузить модуль\n`poll <time> <q>` - создать опрос(Да/Нет)\n`mpoll <time> <q> <a1>...<a9>` - создать опрос с выбором ответов\n`settings (module) (val)` - настройки бота\n`prefix` - посмотреть текущий префикс"
    }]
  };
  message.channel.send({ //Send it
    embed
  }).then(msg => {
    if (conf[message.guild.id].delete == 'true') {
      msg.delete(conf[message.guild.id].deleteTime);
    }
  });
}