const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const Canvas = require('canvas');
const jimp = require('jimp');
const q = require('quick.db');

exports.run = (client, message, args, ops) => { //Collecting info about command
  const w = ['./rankCrad.png', './image.png'];
  
  let member = message.mentions.members.first();
  if (!member) member = message.member;
  
  var l;
  var p;
  function map (num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  }
  var levels = new q.table("LEVELS")
  levels.fetch(`${message.guild.id}_${member.id}`).then(i => {
    l = i;
  });
  
  var widthXP;
  var points = new q.table("POINTS");
  points.fetch(`${message.guild.id}_${member.id}`).then(i => {
    widthXP = map(i, 0, l*300, 0, 615);
    p = i;
  });
  
  var pos = 0;
  points.startsWith(`${message.guild.id}_`, {
    sort: '.data'
  }).then(resp => {
    var i = 0;
    for (i in resp) {
      if (client.users.get(resp[i].ID.split('_')[1]).id == member.user.id) {
        pos = parseInt(i, 10) + 1;
      }
    }
  });
  
  var colorStatus = "#44b37f";
  var color = "#ffffff";
  var colorRank = "#aaaaaa";
  
  if (args[0] == "-color") {
    if (!args[1].startsWith("#")) {
      color = "#" + args[1];
      colorRank = color;
    } else {
      color = args[1];
      colorRank = color;
    }
  }
  
  if (member.presence.status === 'idle') colorStatus = "#faa61a";
  if (member.presence.status === 'offline') colorStatus = "#747f8d";
  if (member.presence.status === 'dnd') colorStatus = "#f04747";

  let Image = Canvas.Image,
  canvas = new Canvas(934, 282),
  ctx = canvas.getContext('2d');
  fs.readFile(w[0], function(err, Background) {
    if (err) return console.log(err)
    let ground = new Image;
    ground.src = Background;
    ctx.drawImage(ground, 0, 0, 934, 282);
    
  });
  
  let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(9, -70) + ".gif" : member.user.displayAvatarURL;
  jimp.read(url, (err, ava) => {
    if (err) return console.log(err);
      ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
        if (err) return console.log(err);

          let Avatar = Canvas.Image;
          let ava = new Avatar;
          ava.src = buf;
          
          var centerX = canvas.width / 2;
          var centerY = canvas.height / 2;

          ctx.font = "36px Arial";
          ctx.fillStyle = "#FFFFFF";
          ctx.textAlign = "start";
          ctx.fillText(`${member.user.username}`, 264, 164);
          ctx.font = "italic 36px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.textAlign = "center";
          ctx.fillText(`#${member.user.discriminator}`, ctx.measureText(`${member.user.username}`).width + 10 + 316, 164);  
          /*LEVEL*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = colorRank;
          ctx.textAlign = "end";
          ctx.fillText(l, 934 - 64, 82);
          ctx.fillText("LEVEL", 934 - 64 - ctx.measureText(l).width - 16, 82);
          /*RANK*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "end";
          ctx.fillText(pos, 934 - 64 - ctx.measureText(l).width - 16 - ctx.measureText(`LEVEL`).width - 16, 82);
          ctx.fillText("RANK", 934 - 64 - ctx.measureText(l).width - 16 - ctx.measureText(`LEVEL`).width - 16 - ctx.measureText(pos).width - 16, 82);
          /*XPS*/
          ctx.font = "bold 36px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
          ctx.textAlign = "start";
          ctx.fillText("/ " + l*300, 624 + ctx.measureText(p).width + 10, 164);
          ctx.fillStyle = colorRank;
          ctx.fillText(p, 624, 164);
        
          if (widthXP > 615) widthXP = 615;
          
          ctx.beginPath();
          ctx.fillStyle = color;
          ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * Math.PI, 0.5 * Math.PI, true);
          ctx.fill();
          ctx.fillRect(257+18.5, 147.5+36.25, widthXP, 37.5);
          ctx.arc(257 + 18.5 + widthXP, 147.5 + 18.5 + 36.25, 18.75, 1.5 * Math.PI, 0.5 * Math.PI, false);
          ctx.fill();
          
          ctx.beginPath();
          ctx.lineWidth = 8;
          ctx.arc(71 + 75, 66 + 75, 75, 0, 2 * Math.PI, false);
          ctx.strokeStyle = colorStatus;
          ctx.stroke();
          ctx.clip();
          ctx.drawImage(ava, 71, 66, 150, 150);
          
          message.channel.send({
            files: [
              canvas.toBuffer()
            ]
          });
        });
    });
}