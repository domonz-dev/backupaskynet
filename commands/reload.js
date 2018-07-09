exports.run = (client, message, args, ops) => { //Collecting info about command
    if (message.channel.permissionsFor(message.member).hasPermission("ADMINISTRATOR")) return message.channel.send({
          embed: {
                    "color": 16728064,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "description": 'Ты не **администратор**, соответственно ты не можешь использовать ' + message,
                    "title": "Так стоп."
                }
        }); //If author of message haven't ADMINISTRATOR permission, then warn him.
    if (message.content != '') { // If isn't a null...

        try { //Trying to delete cache of the command
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            message.channel.send(`Вас настиг успех в перезагрузке **${args[0]}**`);
        } catch (e) {
            return message.channel.send(`Что то не получается перезагрузить **${args[0]}**`);
        }
    } else {
        message.channel.send({embed: {
                    "color": 16728064,
                    "timestamp": "1337-01-01T02:28:00",
                    "footer": {
                        "text": message
                    },
                    "description": 'Введите команду! ``reload <cmd>``',
                    "title": "Ошибка"
                }});
    }
}