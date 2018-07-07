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
}, 280000);

//Libraries
const Discord = require('discord.js-commando'); //Discord library
const fs = require('fs'); //FileSystem
const ascii = require('ascii-art'); //Extra-lib
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Reading config
//Creating bot
const client = new Discord.Client();

var ownerId = '338752589451755521'; //My ID

client.on('ready', () => { //Startup
    console.log("Bot on!");
});

//var commandsList = fs.readFileSync('./commands/commands.txt', 'utf8');

client.on('message', message => { //If recieves message

    config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Overwrite prefix (important for changing prefix)
    var prefix = config.prefix;
    var del = config.delete;

    if (message.channel.id === '464449977003802625') { //If in #music-queue channel
        if (!message.content.startsWith('//')) { //If msg isn't starts with '//'
            if (!message.author.bot) { //If msg author isn't a bot
                message.delete(); //DELETE AND DESTROY!
                message.author.send('Только обращения к Тони!'); //Send DM to author of msg
            }
        }
    }

    if (message.content.toLowerCase() === 'а') {
        message.channel.send(message.author + ', б.');
    } //aaaaaaaaaaaaaaaaaa

    let args = message.content.slice(prefix.length).trim().split(' '); //Setting-up arguments of command
    let cmd = args.shift().toLowerCase(); //LowerCase command

    //Ignore statements
    if (message.author.bot) return; //If bot
    if (!message.content.startsWith(prefix)) return; //If no prefix

    //Command handler
    try {
        let ops = { //Owner data
            ownerId: ownerId
        }

        let commandFile = require(`./commands/${cmd}.js`); //Require commands from folder
        commandFile.run(client, message, args, ops); //Pass four args into 'command'.js
        if (del == 'Да') {
            message.delete(1000);
        }

    } catch (e) { //Catch errors 
        message.channel.send({
            embed: {
                "color": 16730698,
                "fields": [{
                    "name": "**Ошибка**",
                    "value": "Неизвестная команда"
                }]
            }
        });
        if (del == 'Да') {
                message.delete(1000);
            }
        }

});

//Connecting bot
client.login(process.env.TOKEN);