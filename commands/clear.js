exports.run = (client, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("Сейчас ничего не играет! Используй `play <url>|<song>` чтобы поставить композицию в очередь.");
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Ты должен быть в одном канале с ботом!");
  var newQueue = fetched.dispatcher.queue.shift();
  ops.active.delete(fetched.dispatcher.queue);
  console.log(newQueue);
 
  message.channel.send({
    embed: {
      "description": "Очередь очищена",
      "color": 3604287
    }
  });

}