var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if (!fetched) return message.channel.send("Nothing is playing! Use `play <url>|<song>` to add song to queue").then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });
  if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send({
    embed: {
      "title": "You should be in same channel with me!",
      "color": 0xff2222
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

  if (!args[0]) {
    return message.channel.send({
      embed: {
        "description": "Volume: **" + fetched.dispatcher.volume * 100 + "%**"
      }
    }).then(async function(msg) {
      await msg.react('➕');
      await msg.react('➖');

      var reactions = await msg.awaitReactions(reaction => reaction.emoji.name === '➕' || reaction.emoji.name === '➖', {
        time: 60000
      });
      console.log(msg.reactions.get('➕').count - 1)
      if (msg.reactions.get('➕').count - 1 > 0) {
        message.channel.send("+");
        reactions.fetchUsers().then(function(reactionUsers) {
          // Filter the user with the name 'MarketBot' (this bot) from the list of users
          /*var me = reactionUsers.filter(message.author.id);
          console.log(me);
          reactions.remove(me);*/
        });
      }

    });
  }
  if (isNaN(args[0]) || args[0] > 200 || args[0] <= 0) {
    return message.channel.send({
      embed: {
        "title": "Enter number between 1 and 200",
        "color": 0xff2222
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }
  if (args[0] > config[message.guild.id].maxVolume) {
    return message.channel.send({
      embed: {
        "title": "Enter value that smaller than `maxVolume` - " + config[message.guild.id].maxVolume + "%",
        "color": 0xff2222
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }

  fetched.dispatcher.setVolume(args[0] / 100);

  message.channel.send({
    embed: {
      "title": "Now volume: " + args[0] + "%"
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  });

}