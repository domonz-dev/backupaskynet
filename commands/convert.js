const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
var currencyFormatter = require('currency-formatter'); //For currency
var send = require("quick.hook");
var db = require("quick.db");

exports.run = async (client, message, args) => {

  const xp = new db.table("TOTAL_POINTS");
  const xpL = new db.table("POINTS");
  const level = new db.table("LEVELS");

  db.fetch(`balance_${message.guild.id}_${message.author.id}`).then(b => {
    xp.fetch(`${message.guild.id}_${message.author.id}`, {
      "target": ".data"
    }).then(p => {
      level.fetch(`${message.guild.id}_${message.author.id}`, {
        "target": ".data"
      }).then(l => {
        xpL.fetch(`${message.guild.id}_${message.author.id}`, {
          "target": ".data"
        }).then(x => {

          if (p === null) {
            xp.set(`${message.guild.id}_${message.author.id}`, 0);
          }

          if (args.length == 0) {
            return message.channel.send({
              embed: {
                "color": 0xf4aa42,
                "title": "Convert",
                "description": "To convert your XP's use `" + conf[message.guild.id].prefix + "convert <xp>`"
              }
            });
          }

          if (isNaN(args[0])) {
            return message.channel.send({
              embed: {
                "color": 0xff2222,
                "title": "Error",
                "description": "Enter value"
              }
            });
          }

          if (args[0] > x) {
            return message.channel.send({
              embed: {
                "color": 0xff2222,
                "title": "Error",
                "description": "You don't have so many xp"
              }
            });
          }

          var amount = args[0] / 10;
          
          console.log(p + " - " + l + " - " + x);
          console.log(isNaN(p) + " - " + isNaN(l) + " - " + isNaN(x));

          xp.subtract(`${message.guild.id}_${message.author.id}`, args[0]);
          xpL.subtract(`${message.guild.id}_${message.author.id}`, args[0]);
          db.add(`balance_${message.guild.id}_${message.author.id}`, amount);

          if (p < 0) {
            l.subtract(`${message.guild.id}_${message.author.id}`, 1);
          }

          message.channel.send({
            embed: {
              "color": 0x22ff22,
              "title": "Success",
              "description": "Converted " + args[0] + "xp"
            }
          });

        });
      });
    });
  });

}