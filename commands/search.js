var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const search = require('yt-search');
const Discord = require("discord.js");

exports.run = (client, message, args, ops) => { //Collecting info about command

    search(args.join(' '), function(err, res) {
      
      if (err) return message.channel.send("Упс! Что-то пошло не так");
      
      let videos = res.videos.slice(0, 10);
      let response = "";
      if (videos.length == 0) return message.channel.send({ embed: {"description": "Не удалось найти видео по твоему запросу!", "color": 16725558} });
      for (var i in videos) {
        response += `**${parseInt(i)+1}.** \`${videos[i].title}\`\n`;
      }
      
      var title = `*Выбери номер от 1 до ${videos.length}*`;
      
      message.channel.send({embed: {"description": response, "title": title, "color": 10616630} });
      
      const filter = m => !isNaN(m.content) && m.content <= videos.length && m.content > 0;
      const collector = message.channel.createMessageCollector(filter);
      
      collector.videos = videos;
      
      collector.once('collect', async function(m) {
        let commandFile = require('./play.js');
        await commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);
      });
    });
}