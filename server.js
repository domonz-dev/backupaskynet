const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 600000);

//Libraries
const Discord = require('discord.js-commando'); //Discord library
// const fs = require('fs'); //FileSystem
const ascii = require('ascii-art'); //Extra-lib
// let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Reading config
const db = require('quick.db');
//Creating bot
const client = new Discord.Client();

const serverStats = {
  guildID: '464177325571964950',
  totalUsersID: '465848129615298562',
  memberCountID: '465848213614755840',
  botCountID: '465849155189735425'
}

var ownerId = '338752589451755521'; //My ID

client.on('ready', () => { //Startup
    console.log("Bot on!");
    client.user.setStatus('online');
});

//var commandsList = fs.readFileSync('./commands/commands.txt', 'utf8');

client.on('message', message => { //If recieves message
  
  db.fetch(`guild_${message.guild.id}`).then(i => {

    // config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Overwrite prefix (important for changing prefix)
    var prefix = i.prefix
    var del = i.del

    client.user.setPresence({
      game: {name: `на свой пепсис | ${prefix}help`, type: 3}
    });
  
    if (message.channel.id === '464449977003802625') { //If in #music-queue channel
        if (!message.content.startsWith('//')) { //If msg isn't starts with '//'
            if (!message.author.bot) { //If msg author isn't a bot
                message.delete(); //DELETE AND DESTROY!
                message.author.send('Только обращения к Тони!'); //Send DM to author of msg
            }
        }
    }

    if (message.content.toLowerCase() === 'а' || message.content.toLowerCase() === 'a') {
        message.channel.send(message.author + ', б.');
    } //aaaaaaaaaaaaaaa
  
    let args = message.content.slice(prefix.length).trim().split(' '); //Setting-up arguments of command
    let cmd = args.shift().toLowerCase(); //LowerCase command
    
    if (message.content === "#!reset") {
      // config.prefix = '#';
      // fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      db.set(`guild_${message.guild.id}`, '#', {
          target: '.prefix'
      })
      db.set(`guild_${message.guild.id}`, 'Да', {
          target: '.del'
      })
      message.channel.reply("Префикс - ***#***");
      message.channel.send("Авто-удаление - ***Да***");
    }
    
    //Ignore statements
    if (message.author.bot) return; //If bot
    if (!message.content.startsWith(prefix)) return; //If no prefix

    //Command handler
    try {
        let ops = { //Owner data
            ownerId: ownerId
        }
        
        if (cmd === null) {message.channel.send("Введите команду!");}
        
        let commandFile = require(`./commands/${cmd}.js`); //Require command from folder
        commandFile.run(client, message, args, ops); //Pass four args into 'command'.js and run it

    } catch (e) { //Catch errors 
      if (!message.content === "#!reset-prefix") {
        message.channel.send({
            embed: {
                "color": 16730698,
                "fields": [{
                    "name": "**Ошибка**",
                    "value": "Неизвестная команда"
                }]
            }
        })
      .then(messageq=> {
        if (del == 'Да') {
                messageq.delete(5000);
            }
        });
      
}}});

//Server stats
client.on('guildMemberAdd', member => {
  if(member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Total: ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Users: ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`);
});

client.on('guildMemberRemove', member => {
  if(member.guild.id !== serverStats.guildID) return;
  client.channels.get(serverStats.totalUsersID).setName(`Total: ${member.guild.memberCount}`);
  client.channels.get(serverStats.memberCountID).setName(`Users: ${member.guild.members.filter(m => !m.user.bot).size}`);
  client.channels.get(serverStats.botCountID).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`);
});

});

//Connecting bot
client.login(process.env.TOKEN);