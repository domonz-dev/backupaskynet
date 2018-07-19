var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args, ops) => { //Collecting info about command
  
  var djonly = conf[message.guild.id].djonly;
  var djroles = conf[message.guild.id].djroles;
  var djmembers = conf[message.guild.id].djmembers;
  
  if (!args) return message.channel.send({ embed: {
    "description": "Настройки DJ",
    "fields": [
      {
        "name": "DJ Only",
        "value": djonly
      },
      {
        "name": "DJ Roles",
        "value": djroles
      },
      {
        "name": "DJ Members",
        "value": djmembers
      }
    ]
  } });
  
}