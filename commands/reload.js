exports.run = (client, message, args, ops) => { //Collecting info about command
    if (message.author.id !== ops.ownerId) return message.channel.send('Эй, ты кто такой? Только владелец может делать такое!'); //If author of message isn't a bot owner, then warn him.
    if (message.content != '') { // If isn't a null...

        try { //Trying to delete cache of the command
            delete require.cache[require.resolve(`./${args[0]}.js`)];
            message.channel.send(`Вас настиг успех в перезагрузке **${args[0]}**`);
        } catch (e) {
            return message.channel.send(`Что то не получается перезагрузить **${args[0]}**`);
        }
    } else {
        message.channel.send('Пожалуйста, введите команду! `reload (cmd)`');
    }
}