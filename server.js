const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
  console.log('Ping-pong-ping-pong... ');
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 600000);

//Libraries
const db = require('quick.db');
const Discord = require('discord.js'); //Discord library
const fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Reading config
//Creating bot
const client = new Discord.Client({
  fetchAllMembers: true
});
const active = new Map();
var guilds = `${client.guilds.size} servers`;
var statuses = [`on ${guilds}`, '#help'];

const serverStats = {
  guildID: '464177325571964950',
  totalUsersID: '465848129615298562',
  memberCountID: '465848213614755840',
  botCountID: '465849155189735425'
}

var ownerId = '338752589451755521'; //My ID

client.on('ready', () => { //Startup
  console.log("Bot on!");
  client.user.setUsername("expoBot");
  client.user.setStatus('online');
  client.user.setActivity(`on ${client.users.size} users | #help`, {
    type: 'WATCHING'
  });
});


client.on('guildCreate', (guild, message) => { // If the Bot was added on a server, proceed
  if (!config[guild.id]) { // If the guild's id is not on the GUILDCONF File, proceed
    config[guild.id] = {
      prefix: '#',
      delete: 'true',
      deleteTime: 10000,
      volume: 100,
      maxVolume: 200,
      djonly: true,
      djroles: ["DJRole", "DJ"],
      djmembers: ["hgangan", "expoBot"]
    }
  }
  fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
    if (err) console.log(err)
  });
  client.user.setActivity(`on ${client.users.size} users | #help`, {
    type: 'WATCHING'
  });
});

client.on('guildDelete', (guild) => { // If the Bot was removed on a server, proceed
  delete config[guild.id]; // Deletes the Guild ID and Prefix
  fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
    if (err) console.log(err)
  })
  client.user.setActivity(`on ${client.users.size} users | #help`, {
    type: 'WATCHING'
  });
});


/* ON MESSAGE */
client.on('message', message => { //If recieves message

      config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Overwrite prefix (important for changing prefix)
      if (config[message.guild.id] == undefined) {
        config[message.guild.id] = {
          prefix: '#',
          delete: 'true',
          deleteTime: 10000,
          volume: 100,
          maxVolume: 200,
          djonly: true,
          djroles: ["DJRole", "DJ"],
          djmembers: ["hgangan", "expoBot"]
        }
        fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      }

      db.add(`globalMessages_${message.author.id}`, 1);
      db.add(`guildMessages_${message.guild.id}_${message.author.id}`, 1);

        var prefix = config[message.guild.id].prefix;

        /* expo_ feature */
        if (message.channel.id === '464449977003802625') { //If in #music-queue channel
          if (!message.content.startsWith('//')) { //If msg isn't starts with '//'
            if (!message.author.bot) { //If msg author isn't a bot
              message.delete(); //DELETE AND DESTROY!
              message.author.send('Только обращения к Тони!'); //Send DM to author of msg
            }
          }
        }

        if (message.content.toLowerCase() === 'а' || message.content.toLowerCase() === 'a') {
          message.channel.send(message.author + ', b.');
        } //aaaaaaaaaaaaaaa

        let args = message.content.slice(prefix.length).trim().split(' '); //Setting-up arguments of command
        let cmd = args.shift().toLowerCase(); //LowerCase command

        if (message.content === "#!reset-prefix") {
          config[message.guild.id].prefix = '#';
          fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
          message.reply("Префикс - ***#***");
        }

        //Ignore statements
        if (message.author.bot) return; //If bot
        if (message.channel.type == "dm") return; //If message was sent in DM
        if (!message.content.startsWith(prefix)) return; //If no prefix

        //Command handler
        try {
          let ops = { //Owner data
            ownerId: ownerId,
            active: active
          }

          if (cmd == '') {
            message.channel.send({
              embed: {
                "color": 16730698,
                "fields": [{
                  "name": "**Ошибка**",
                  "value": "Введите команду"
                }]
              }
            }).then(msg => {
              if (config[message.guild.id].delete == 'true') {
                msg.delete(config[message.guild.id].deleteTime);
              }
            });
          }

          let commandFile = require(`./commands/${cmd}.js`); //Require command from folder
          commandFile.run(client, message, args, ops, config); //Pass four args into 'command'.js and run it

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
            }).then(msg => {
              if (config[message.guild.id].delete == 'true') {
                msg.delete(config[message.guild.id].deleteTime);
              }
            });
          }
        }
      });


      client.on('guildMemberAdd', member => {
        if (member.guild.id !== serverStats.guildID) return;
        client.channels.get(serverStats.totalUsersID).setName(`Total: ${member.guild.memberCount}`);
        client.channels.get(serverStats.memberCountID).setName(`Users: ${member.guild.members.filter(m => !m.user.bot).size}`);
        client.channels.get(serverStats.botCountID).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`);
      });

      client.on('guildMemberRemove', member => {
        if (member.guild.id !== serverStats.guildID) return;
        client.channels.get(serverStats.totalUsersID).setName(`Total: ${member.guild.memberCount}`);
        client.channels.get(serverStats.memberCountID).setName(`Users: ${member.guild.members.filter(m => !m.user.bot).size}`);
        client.channels.get(serverStats.botCountID).setName(`Bots: ${member.guild.members.filter(m => m.user.bot).size}`);
      });


      //Connecting bot
      client.login(process.env.TOKEN);