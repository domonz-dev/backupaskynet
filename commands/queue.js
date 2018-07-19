var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) {
    return message.channel.send("Queue empty!");
  }

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  let response = "Играет **" + nowPlaying.songTitle + "**\nПредложен " + nowPlaying.requestAuthor.username;
  let queueList = "";
  if (queue.length == 1) {
    queueList = "";
  } else {
    queueList = "\n\n**Очередь:** \n";
  }

  for (let i = 1; i < queue.length; i++) {
    queueList += i + ". **" + queue[i].songTitle + "** - *" + queue[i].requestAuthor.username + "*\n";
  }

  message.channel.send({
    embed: {
      "description": response + queueList,
      "footer": {
        "text": message + ""
      },
      "color": 10288426
    }
  });

}