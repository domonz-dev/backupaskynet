var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => { //Collecting info about command
    const embed = { //Embed with help
        "title": "***Меню помощи***",
        "description": "Здесь я написал для тебя все мои команды \n*Мой префикс - `#`*",
        "color": 16776960,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
            "text": conf.prefix + "help"
        },
        "fields": [{
            "name": "Команды",
            "value": "`#help` - это меню \n`#ping` - проверить работоспособность бота\n`#reload` - перезагрузить модуль"
        }]
    };
    message.channel.send({ //Send it
        embed
    });
}