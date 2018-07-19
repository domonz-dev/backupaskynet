const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');
const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = async (client, message, args) => {

  let searchMessage = await message.channel.send("Поиск...");
  let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(message.content)}`; //https://www.google.com/search?q=${encodeURIComponent(message.content)}

  return snekfetch.get(searchUrl).then((result) => {

    let $ = cheerio.load(result.body);

    let googleData = $('.r').first().find('a').first().attr('href');

    googleData = querystring.parse(googleData.replace('/url?', ''));
    searchMessage.edit(`Result found!\n${googleData.q}`);

  }).catch((err) => {
    searchMessage.edit('No results found!');
    console.log(err);
  });
}