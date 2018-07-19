const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
let pings = JSON.parse(fs.readFileSync("./pings.json", "utf8")); //Config file

exports.run = (client, message, args) => { //Collecting info about command
  
  if (!pings[message.guild.id]) { 
    pings[message.guild.id] = 1;
    fs.writeFile("./pings.json", JSON.stringify(pings, null, 2), (err) => {
      if (err) return console.log(err)
    });
  }
  
  var resp = "***" + pings[message.guild.id]/10 + " times***";
  
  if (pings[message.guild.id]/10 == 1) resp = "***" + pings[message.guild.id]/10 + " time***"
  
  if (Number.isInteger(pings[message.guild.id]/10)) { return message.channel.send({
    embed: {
    "description": resp,
    "color": 3407679,
    "footer": {
      "icon_url": `${message.author.avatarURL}`,
      "text": `${client.ping}ms`
    },
    "image": {"url": "https://lh3.googleusercontent.com/UTCN5aeQL9DClKtJYYTVpzmLw_BEzOc1nZuBIyrVtfMurjubbHoVmFx6iAsXFd4ONH2eLix42J1i60uBqSpszqnlKSiLO9DmVqxHAptresBqLxcg8C9nC9egqUHvJH-lPV86XgFYeiwZgCTs_lNS1RPcbyBi9MbxVoZPXYJQbCv8YmEeIVOVibElorMRxMhO0ZO7zYR4q2A9fyWlqwzA4tXspfVNh-xnlbDp7eAWBq6N18YguqaeDEXHpaJHsjqmRHxUf55W5q5GHXJypNLuU9pSFqr-zFX1Xvzf1wXVtoEAodaJUE2pd-xEFHQSXfUetrspWM7jFZdE0CGHCEQt22WuCgnTNtOrEM_qn46xkU_5XM4I-Dw5IYb2gfiL9HnKp7bFkbpiAe34oyeu5IUx9raiEB_1mtkXq7kwxLDf730nWac6GDE9jUepsXqLY5jVuEzkSDbpDGv09Tajyo7pKhLZDm65P2tnEsFD759KaDhDYGDyw4G4_sTgTr5VL3CFvGtjiUI_jYaoGNuJavucOOVUGTsLUIjkhw1HiQU3Z4YK5xUSEWRCPuYGfcnQgaUISjkrdgZxVYHPCK13UjJemYInFlunPaeF5nHpWZY=w320-h64-no"}
    }
  }).then(msg => {
    pings[message.guild.id]++;
    fs.writeFile("./pings.json", JSON.stringify(pings, null, 2), (err) => {
      if (err) return console.log(err)
    });
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  }); }//Pong!
  
  message.channel.send({
    embed: {
    "description": `:ping_pong: **Pong!**`,
    "color": 3407679,
    "footer": {
      "icon_url": `${message.author.avatarURL}`,
      "text": `${client.ping}ms`
    }}
  }).then(msg => {
    pings[message.guild.id]++;
    fs.writeFile("./pings.json", JSON.stringify(pings, null, 2), (err) => {
      if (err) return console.log(err)
    });
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  }); //Pong!
}