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
    const w = ['https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2Fbg-6.png?1532607187251'];

    let Image = Canvas.Image,
    canvas = new Canvas(934, 282),
    ctx = canvas.getContext('2d');
    ctx.patternQuality = 'tilinear';
    ctx.filter = 'tilinear';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowOffsetY = 6;
    ctx.shadowBlur = 50;
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
            ctx.drawImage(ava, 612, 30, 100, 1);
            ctx.fontSize = '10px';
            ctx.fillStyle = "#0x4gsdA";
            ctx.textAlign = "middle";
            ctx.fillText(message.member.user.username, 50, 1544);

            ctx.font = "28px Arial";
            ctx.fillStyle = "#FFFFFF";
            ctx.textAlign = "center";
            ctx.fillText(` `, 200, 190);
            message.channel.send(`Testing message.`, {
              files: [
                canvas.toBuffer()
              ]
            });
        });
    });
}