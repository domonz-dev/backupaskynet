var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
var Discord = require('discord.js');

exports.run = (client, message, args) => { //Collecting info about command

  var djonly = conf[message.guild.id].djonly;
  var djroles = conf[message.guild.id].djroles;
  var djmembers = conf[message.guild.id].djmembers;
  var userDJ = message.mentions.members.username.first(); //User
  var roleNameDJ = args.splice(2).join(' '); //Role Name
  var roleDJ = message.guild.roles.find('name', roleNameDJ); //Role Search

  if (!djroles) djroles = "No roles";
  if (!djmembers) djmembers = "No members";

  var djSettings = new Discord.RichEmbed()
    .setDescription("***DJ Settings***")
    .addField("DJ Only", djonly)
    .addField("DJ Roles", djroles)
    .addField("DJ Members", djmembers)
    .setColor(0xBBBBBB);

  var djAddError = new Discord.RichEmbed()
    .setDescription("**Specify user**")
    .setTitle("Error")
    .setColor(0xFF5555);

  var djAddAlreadyError = new Discord.RichEmbed()
    .setDescription("**This user is already a DJ**")
    .setTitle("Error")
    .setColor(0xFF5555);

  var djAddSuccess = new Discord.RichEmbed()
    .setDescription("Now \`djMembers\` includes *" + djmembers + "*")
    .setTitle("**User added!**")
    .setColor(0xFFFF55);

  if (args.length == 0) {
    return
    message.channel.send(djSettings);
  }

  switch (args[0]) {
    case "add":
      if (!args[1]) return message.channel.send(djAddError).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      }); //If no user

      if (djmembers.includes(userDJ)) return message.channel.send(djAddAlreadyError).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      }); //If user is already a dj

      djmembers = djmembers + userDJ;
      //Then change the configuration in memory
      conf[message.guild.id].djmembers = djmembers;
      //and save the file.
      fs.writeFile("./config.json", JSON.stringify(conf, null, 2), (err) => {
        if (err) return console.log(err)
      });
      message.channel.send(djAddSuccess).then(msg => {
        if (conf[message.guild.id].delete == 'true') {
          msg.delete(conf[message.guild.id].deleteTime);
        }
      });
      break;
    case "remove":
      message.channel.send("a");
      break;
    case "addRole" || "addrole":
      message.channel.send("a");
      break;
    case "removeRole" || "removerole":
      message.channel.send("a");
      break;
  }

}