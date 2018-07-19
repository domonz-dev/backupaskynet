exports.run = async (client, message, args, ) => { //Collecting info about command
  const deleteCount = parseInt(args[0], 10);

  if (!deleteCount || deleteCount < 2 || deleteCount > 1000)
    return message.reply("Введите число от 2 до 1000");

  const fetched1 = await message.channel.fetchMessages({
    limit: deleteCount
  });
  message.channel.bulkDelete(fetched1)
    .catch(error => message.reply(`Не могу что-то: ${error}`));
  message.channel.send({
    embed: {
      "description": "Бот хочет кушац...\n**СЪЕДЕНО СООБЩЕНИЙ: " + deleteCount + "**",
      "color": 16728064,
      "image": {
        "url": "https://media0.giphy.com/media/TYKOdOASPBVjW/giphy.gif"
      } //https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2Fgiphy.gif?1531841627477
    }
  }).then(msg => {
    msg.delete(5000);
  });
}