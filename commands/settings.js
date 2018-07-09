// var fs = require('fs'); //FileSystem
// let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
// var pref = conf.prefix; //Prefix state
// var del = conf.delete; //Auto-delete state
// const embed = {};

// exports.run = (client, message, args) => { //Collecting info about command

//     if (args == '') { //If no arguments, just 'settings'
//         message.channel.send({ //Send embed
//             embed: {
//                 "title": "***Настройки***",
//                 "description": "Здесь я написал для тебя все мои настройки \n*Используй `#settings (name) (value)` чтобы изменить параметр*",
//                 "color": 16098851,
//                 "timestamp": "1337-01-01T02:28:00",
//                 "footer": {
//                     "text": pref + "settings"
//                 },
//                 "fields": [{
//                         "name": `Префикс`,
//                         "value": pref
//                     },
//                     {
//                         "name": `Авто-удаление`,
//                         "value": del
//                     }
//                 ]
//             }
//         });
//     }

//     if (args[0] == 'префикс' || args[0] == 'prefix' && args[1] != undefined) { //If first argument is 'prefix' or 'префикс' and second argument (new prefix) isn't null...
//         pref = args[1]; //...Prefix will become new
//         //Then change the configuration in memory
//         conf['prefix'] = pref;
//         //and save the file.
//         fs.writeFile("./config.json", JSON.stringify(conf), (err) => console.error);
//         message.channel.send({ //Embed with text of success
//             embed: {
//                 "color": 5308240,
//                 "timestamp": "1337-01-01T02:28:00",
//                 "footer": {
//                     "text": pref + "settings prefix " + pref
//                 },
//                 "fields": [{
//                     "name": "**Префикс успешно изменён!**",
//                     "value": "Теперь префикс " + pref
//                 }]
//             }
//         });
//     }

//     if (args[0] == 'авто-удаление' || args[0] == 'delete' && args[1] != null || args[0] == "autodelete") { //If first argument is 'prefix' or 'префикс' and second argument (new prefix) isn't null...
//         if (args[1] === "1" || args[1] === "да" || args[1] === "yes") {
//             del = 'Да'; //...Auto-deleting will become 'Yes'
//             //Then change the configuration in memory
//             conf['delete'] = del;
//             //and save the file.
//             fs.writeFile("./config.json", JSON.stringify(conf), (err) => console.error);
//             message.channel.send({ //Embed with text of success
//                 embed: {
//                     "color": 5308240,
//                     "timestamp": "1337-01-01T02:28:00",
//                     "footer": {
//                         "text": pref + "settings " + args[0] + args[1]
//                     },
//                     "fields": [{
//                         "name": "**Позиция успешно изменёна!**",
//                         "value": "Теперь команды будут удаляться"
//                     }]
//                 }
//             });
//         }
//         if (args[1] === "0" || args[1] === "нет" || args[1] === "no") {
//             del = 'Нет'; //...Auto-deleting will become 'No'
//             //Then change the configuration in memory
//             conf['delete'] = del;
//             //and save the file.
//             fs.writeFile("./config.json", JSON.stringify(conf), (err) => console.error);
//             message.channel.send({ //Embed with text of success
//                 embed: {
//                     "color": 5308240,
//                     "timestamp": "1337-01-01T02:28:00",
//                     "footer": {
//                         "text": pref + "settings " + args[0] + args[1]
//                     },
//                     "fields": [{
//                         "name": "**Позиция успешно изменёна!**",
//                         "value": "Теперь команды не будут удаляться"
//                     }]
//                 }
//             });
//         }
//     }
// }

const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {

    db.fetch(`guild_${message.guild.id}`).then(i => { //Looking guildID

        var embed = new Discord.RichEmbed() //Embed with settings
            .setTitle('Server options')
            .setDescription('Здесь я написал для тебя все мои настройки \n*Используй `#settings (name) (value)` чтобы изменить параметр*')
            .addField('Префикс', i.prefix)
            .addField('Авто-удаление команд', i.del)
            .setFooter(message)
            .setColor('#00FF00');

        if (!args[0]) return message.channel.send(embed) //If no arguments, just 'settings'

        if (args[0] == "prefix") { //If first argument - prefix
            if (!args[1]) return message.channel.send({
          embed: {
                    "color": 16728064,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "description": 'Введите префикс',
                    "title": "Ошибка"
                }
        }); //If no prefix value
            if (args[1].length >= 5) return message.channel.send({
          embed: {
                    "color": 16728064,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "description": 'Введите префикс, который будет иметь меньше 5 символов',
                    "title": "Ошибка"
                }
        }); //If prefix value longer than 5

            //Setting prefix
            db.set(`guild_${message.guild.id}`, args[1], {
                target: '.prefix'
            });
            message.channel.send({ //Embed with text of success
            embed: {
                "color": 5308240,
                "timestamp": "1337-01-01T02:28:00",
                "footer": {
                    "text": message
                },
                "fields": [{
                    "name": "**Префикс успешно изменён!**",
                    "value": "Теперь префикс " + i.prefix
                }]
            }
        });
        }

        if (args[0] == 'авто-удаление' || args[0] == 'delete' || args[0] == "autodelete") { //If first argument - delete or ...
            if (!args[1]) return message.channel.send({
          embed: {
                    "color": 16728064,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "description": 'Введите значение',
                    "title": "Ошибка"
                }
        }); //If no value
            if (args[1] === 'yes' || args[1] === 'true' || args[1] === '1' || args[1] === 'да') {
                //Setting value
                db.set(`guild_${message.guild.id}`, 'Да', {
                    target: '.del'
                });
                message.channel.send({ //Embed with text of success
                embed: {
                    "color": 5308240,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "fields": [{
                        "name": "**Позиция успешно изменёна!**",
                        "value": "Теперь команды будут удаляться"
                    }]
                }
            });//Success message
            }

            if (args[1] === 'no' || args[1] === 'false' || args[1] === '0' || args[1] === 'нет') {
                //Setting value
                db.set(`guild_${message.guild.id}`, 'Нет', {
                    target: '.del'
                });
                message.channel.send({ //Embed with text of success
                embed: {
                    "color": 5308240,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "fields": [{
                        "name": "**Позиция успешно изменёна!**",
                        "value": "Теперь команды не будут удаляться"
                    }]
                }
            });//Success message
            }
        }
    }).catch(err => { //Error message
        console.error(err);
        message.channel.send({
          embed: {
                    "color": 16728064,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "description": 'Произошла ошибка, наверное упал очередной костыль.\nЗначение восстановлено на ``"del": "no"``',
                    "title": "Ошибка"
                }
        });
        db.set(`guild_${message.guild.id}`, {
            del: "Нет"
        });
    })
}