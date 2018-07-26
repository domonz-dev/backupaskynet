const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const Canvas = require('canvas');
const jimp = require('jimp');
const q = require('quick.db');
const m = require('ms');
const mo = require('moment');
const motm = require('moment-timezone');
const apikey = "fqaQR125xBna1546NBsczXZ%,ZA2q1w43CXvdn%^GmgbnATonYaZ.mfa1";
const ie3key = "Y643ZvNiNNA%";

exports.run = (client, message, args, ops) => { //Collecting info about command
    const w = ['./a.png'];

    let Image = Canvas.Image,
    canvas = new Canvas(934, 282),
    ctx = canvas.getContext('2d');
    ctx.patternQuality = 'tilinear';
    //ctx.filter = 'tilinear';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowOffsetY = 6;
    ctx.shadowBlur = 15
    
    fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function(err, Background) {
      if (err) return console.log(err)
      let BG = Canvas.Image;
      let ground = new Image;
      ground.src = Background;
      ctx.drawImage(ground, 0, 0, 934, 282);
    });
  
    let url = message.member.user.displayAvatarURL.endsWith(".webp") ? message.member.user.displayAvatarURL.slice(9, -70) + ".gif" : message.member.user.displayAvatarURL;
    jimp.read(url, (err, ava) => {
      if (err) return console.log(err);
        ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
          if (err) return console.log(err);

            let Avatar = Canvas.Image;
            let ava = new Avatar;
            ava.src = buf;
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 70;

            ctx.drawImage(ava, 80, 77, 125, 125);

            ctx.font = "36px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText(`${message.author.username}`, 300, 148);  
          
            message.channel.send({
              files: [
                canvas.toBuffer()
              ]
            });
        });
    });
}