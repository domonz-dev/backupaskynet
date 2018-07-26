const Discord = require('discord.js'); //Discord lib
const db = require('quick.db'); //DB lib
const send = require('quick.hook'); //WebHooks lib
var currencyFormatter = require('currency-formatter'); //For currency
var ms = require('parse-ms'); //MS lib

exports.run = async (client, message, args) => {

  try {
    let log = client.channels.get('471603875749691393') // Logging channel
    let cooldown = 3.6e+6; //1 hour in ms
    let amount = Math.floor((Math.random() * 100) + 100); // Paid
    let workplace = ["Mail", "Restaurant", "Market", "ICT", "Taxi"] // Places to work
    let workDaily = await db.fetch(`workDaily_${message.author.id}`) // Fetching the time when work is available.
    let result = Math.floor((Math.random() * workplace.length)) /* Random place */
    let timeObj = ms(cooldown - (Date.now() - workDaily)) // Left

    /* Result embeds */

    let workEmbed = new Discord.RichEmbed()
      .setTitle(message.author.tag + " started working")
      .setDescription(`Payed: ${currencyFormatter.format(amount, { code: 'USD' })}`)
      .setColor(0x22ff22)

    let cooldownEmbed = new Discord.RichEmbed()
      .setTitle(message.author.tag + " in cooldown")
      .setDescription(`Left: **${timeObj.hours}:${timeObj.minutes}:${timeObj.seconds}**`)
      .setColor(0xff2222)

    /* End of result embeds */

    try {

      db.fetch(`balance_${message.guild.id}_${message.author.id}`).then(rm => { // Is balance valid
        if (rm == null || 0 || undefined) {
          db.set(`balance_${message.guild.id}_${message.author.id}`, 50)
        } // Vipe if isn't a valid number
        
        else if (workDaily !== null && cooldown - (Date.now() - workDaily) > 0) { /* If already worked */

          let workDailyEmbed = new Discord.RichEmbed()
            .setAuthor(`Cooldown`, message.author.displayAvatarURL)
            .setColor(0xff2222)
            .setDescription(`**${message.author.tag}** just worked for 6 hours!\n*You require rest for* **${timeObj.hours}h and ${timeObj.minutes}m**`)

          message.channel.send(workDailyEmbed);

          send(log, cooldownEmbed, {
            name: "Work Log",
            icon: "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"
          });

        } else if (`${result}` == "0") { /* First place */

          db.set(`workDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`balance_${message.guild.id}_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`${message.author.tag} has finished sorting letters`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`You've been payed for your shift,`, `You got paid: ${currencyFormatter.format(amount, { code: 'USD' })}`)
              .setFooter("Worked at " + workplace[result]);

            message.channel.send(dailyEmbed);

            send(log, workEmbed, {
              name: "Work Log",
              icon: "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"
            });
          });

        } else if (`${result}` == "1") { /* Second place */

          db.set(`workDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`balance_${message.guild.id}_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`${message.author.tag} has finished washing dishes`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`You've been payed for your shift,`, `You got paid: ${currencyFormatter.format(amount, { code: 'USD' })}`)
              .setFooter("Worked at " + workplace[result]);

            message.channel.send(dailyEmbed);

            send(log, workEmbed, {
              name: "Work Log",
              icon: "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"
            });
          });

        } else if (`${result}` == "2") { /* Third place */

          db.set(`workDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`balance_${message.guild.id}_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`${message.author.tag} has finished selling products`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`You've been payed for your shift,`, `You got paid: ${currencyFormatter.format(amount, { code: 'USD' })}`)
              .setFooter("Worked at " + workplace[result]);

            message.channel.send(dailyEmbed);

            send(log, workEmbed, {
              name: "Work Log",
              icon: "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"
            });
          });

        } else if (`${result}` == "3") { /* Fourth place */

          db.set(`workDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`balance_${message.guild.id}_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`${message.author.tag} has finished working with clients`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`You've been payed for your shift,`, `You got paid: ${currencyFormatter.format(amount, { code: 'USD' })}`)
              .setFooter("Worked at " + workplace[result]);

            message.channel.send(dailyEmbed);

            send(log, workEmbed, {
              name: "Work Log",
              icon: "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"
            });
          });

        } else if (`${result}` == "4") { /* Fifth place */

          db.set(`workDaily_${message.author.id}`, Date.now()); // Now time

          db.add(`balance_${message.guild.id}_${message.author.id}`, amount).then(i => {

            let dailyEmbed = new Discord.RichEmbed()
              .setAuthor(`${message.author.tag} has finished driving a taxi`, message.author.displayAvatarURL)
              .setColor(0xf4aa42)
              .addField(`You've been payed for your shift,`, `You got paid: ${currencyFormatter.format(amount, { code: 'USD' })}`)
              .setFooter("Worked at " + workplace[result]);

            message.channel.send(dailyEmbed);

            send(log, workEmbed, {
              name: "Work Log",
              icon: "https://cdn.glitch.com/88b80c67-e815-4e13-b6a0-9376c59ea396%2F862.png?1532600798485"
            });
          });

        } else {
          message.channel.send({
            embed: {
              "title": "Critical error when trying to get place",
              "color": 0xff2222
            }
          })
        }

      });
    } catch (err) {
      console.log("[ERROR] When working at " + result + "place\n" + err);
    }
  } catch (err) {
    console.log("[ERROR] WORK: \n" + err);
  }
}