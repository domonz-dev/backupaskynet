var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
var pref = conf.prefix; //Prefix state
var del = conf.delete; //Auto-delete state
const embed = {};

exports.run = (client, message, args) => { //Collecting info about command

    if (args == '') { //If no arguments, just 'settings'
        message.channel.send({ //Send embed
            embed: {
                "title": "***Настройки***",
                "description": "Здесь я написал для тебя все мои настройки \n*Используй `#settings (name) (value)` чтобы изменить параметр*",
                "color": 16098851,
                "timestamp": "1337-01-01T02:28:00",
                "footer": {
                    "text": pref + "settings"
                },
                "fields": [{
                        "name": `Префикс`,
                        "value": pref
                    },
                    {
                        "name": `Авто-удаление`,
                        "value": del
                    }
                ]
            }
        });
    }

    if (args[0] == 'префикс' || args[0] == 'prefix' && args[1] != '') { //If first argument is 'prefix' or 'префикс' and second argument (new prefix) isn't null...
        pref = args[1]; //...Prefix will become new
        //Then change the configuration in memory
        conf['prefix'] = pref;
        //and save the file.
        fs.writeFile("./config.json", JSON.stringify(conf), (err) => console.error);
        message.channel.send({ //Embed with text of success
            embed: {
                "color": 5308240,
                "timestamp": "1337-01-01T02:28:00",
                "footer": {
                    "text": pref + "settings prefix " + pref
                },
                "fields": [{
                    "name": "**Префикс успешно изменён!**",
                    "value": "Теперь префикс " + pref
                }]
            }
        });
    }

    if (args[0] == 'авто-удаление' || args[0] == 'delete' && args[1] != '') { //If first argument is 'prefix' or 'префикс' and second argument (new prefix) isn't null...
        if (args[1] === "1" || args[1] === "да" || args[1] === "yes") {
            del = 'Да'; //...Auto-deleting will become 'Yes'
            //Then change the configuration in memory
            conf['delete'] = del;
            //and save the file.
            fs.writeFile("./config.json", JSON.stringify(conf), (err) => console.error);
            message.channel.send({ //Embed with text of success
                embed: {
                    "color": 5308240,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": pref + "settings " + args[0] + args[1]
                    },
                    "fields": [{
                        "name": "**Позиция успешно изменёна!**",
                        "value": "Теперь команды будут удаляться"
                    }]
                }
            });
        }
        if (args[1] === "0" || args[1] === "нет" || args[1] === "no") {
            del = 'Нет'; //...Auto-deleting will become 'No'
            //Then change the configuration in memory
            conf['delete'] = del;
            //and save the file.
            fs.writeFile("./config.json", JSON.stringify(conf), (err) => console.error);
            message.channel.send({ //Embed with text of success
                embed: {
                    "color": 5308240,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": pref + "settings " + args[0] + args[1]
                    },
                    "fields": [{
                        "name": "**Позиция успешно изменёна!**",
                        "value": "Теперь команды не будут удаляться"
                    }]
                }
            });
        }
    }
}