var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file
const Discord = require("discord.js");
var fs = require('fs'); //FileSystem
let config = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

exports.run = (client, message, args) => { //Collecting info about command

  var prefix = config[message.guild.id].prefix; //Prefix state
  var del = config[message.guild.id].delete; //Delete state
  var delTime = config[message.guild.id].deleteTime; //Time before delete state
  var volume = config[message.guild.id].volume; //Volume state
  var maxVolume = config[message.guild.id].maxVolume; //maxVolume state

  if (!args[0]) message.channel.send({ //Send embed
    embed: {
      "title": "Настройки",
      "description": "Здесь я написал для тебя все мои настройки \n*Используй `" + prefix + "settings (name) (value)` чтобы изменить параметр*",
      "color": 16098851,
      "timestamp": "1337-01-01T02:28:00",
      "footer": {
        "text": message + ""
      },
      "fields": [{
          "name": "Префикс",
          "value": prefix + ""
        },
        {
          "name": "Авто-удаление",
          "value": del + ", задержка - ``" + config[message.guild.id].deleteTime / 1000 + "``" + " секунд"
        },
        {
          "name": "Громкость по умолчанию",
          "value": "`volume` - " + volume + "%"
        },
        {
          "name": "Максимальная громкость",
          "value": "`maxVolume` - " + maxVolume + "%"
        }
      ]
    }
  }).then(msg => {
    if (config[message.guild.id].delete == 'true') {
      msg.delete(config[message.guild.id].deleteTime);
    }
  }); //If no arguments, just 'settings'

  if (args[0] == 'префикс' || args[0] == 'prefix') { //If first argument is 'prefix' or 'префикс' and second argument (new prefix) isn't null...
    if (!args[1]) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите префикс',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    }); //If no prefix value
    if (args[1].length >= 5) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите префикс, который будет иметь меньше 5 символов',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    }); //If prefix value longer than 5

    prefix = args[1]; //...Prefix will become new
    //Then change the configuration in memory
    config[message.guild.id].prefix = prefix;
    //and save the file.
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) return console.log(err)
    });
    message.channel.send({ //Embed with text of success
      embed: {
        "color": 5308240,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "fields": [{
          "name": "**Префикс успешно изменён!**",
          "value": "Теперь префикс " + prefix + ""
        }]
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }

  if (args[0] == 'авто-удаление' || args[0] == 'delete' && args[1] != null || args[0] == "autodelete") { //If first argument is 'prefix' or 'префикс' and second argument (new prefix) isn't null...
    if (args[1] === "1" || args[1] === "да" || args[1] === "yes") {
      del = 'true'; //...Auto-deleting will become 'Yes'
      config[message.guild.id].delete = del;
      //and save the file.
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      message.channel.send({ //Embed with text of success
        embed: {
          "color": 5308240,
          "timestamp": "1337-01-01T02:28:00",
          "footer": {
            "text": message + ""
          },
          "fields": [{
            "name": "**Позиция успешно изменёна!**",
            "value": "Теперь команды будут удаляться"
          }]
        }
      }).then(msg => {
        if (config[message.guild.id].delete == 'true') {
          msg.delete(config[message.guild.id].deleteTime);
        }
      });
    }
    if (args[1] === "0" || args[1] === "нет" || args[1] === "no") {
      del = 'false'; //...Auto-deleting will become 'No'
      config[message.guild.id].delete = del;
      //and save the file.
      fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
      message.channel.send({ //Embed with text of success
        embed: {
          "color": 5308240,
          "timestamp": "1337-01-01T02:28:00",
          "footer": {
            "text": message + ""
          },
          "fields": [{
            "name": "**Позиция успешно изменёна!**",
            "value": "Теперь команды не будут удаляться"
          }]
        }
      }).then(msg => {
        if (config[message.guild.id].delete == 'true') {
          msg.delete(config[message.guild.id].deleteTime);
        }
      });
    }
  }

  if (args[0] == 'время' || args[0] == 'deleteTime' || args[0] == 'deletetime') {
    if (!args[1]) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите значение',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    }); //If no value
    if (isNaN(args[1]) || args[1] > 360 || args[1] < 1) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите значение, которое является числом от 1 до 360',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });

    delTime = args[1] * 1000;
    //Then change the configuration in memory
    config[message.guild.id].deleteTime = delTime;
    //and save the file.
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) return console.log(err)
    });
    message.channel.send({ //Embed with text of success
      embed: {
        "color": 5308240,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "fields": [{
          "name": "**Префикс успешно изменён!**",
          "value": "Теперь параметр `delTime` " + delTime / 1000 + " секунд"
        }]
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }

  if (args[0] == 'maxVolume' || args[0] == 'maxvolume') {
    if (!args[1]) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите значение',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    }); //If no value
    if (isNaN(args[1]) || args[1] > 200 || args[1] < 0) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите значение, которое является числом от 0 до 200',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });

    maxVolume = args[1];
    //Then change the configuration in memory
    config[message.guild.id].maxVolume = maxVolume;
    //and save the file.
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) return console.log(err)
    });
    message.channel.send({ //Embed with text of success
      embed: {
        "color": 5308240,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "fields": [{
          "name": "**Префикс успешно изменён!**",
          "value": "Теперь параметр `maxVolume` " + maxVolume + "%"
        }]
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }

  if (args[0] == 'громкость' || args[0] == 'volume') {
    if (!args[1]) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите значение',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    }); //If no value
    if (isNaN(args[1]) || args[1] > 200 || args[1] < 0) return message.channel.send({
      embed: {
        "color": 16728064,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "description": 'Введите значение, которое является числом от 0 до 200',
        "title": "Ошибка"
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });

    volume = args[1];
    //Then change the configuration in memory
    config[message.guild.id].volume = volume;
    //and save the file.
    fs.writeFile("./config.json", JSON.stringify(config, null, 2), (err) => {
      if (err) return console.log(err)
    });
    message.channel.send({ //Embed with text of success
      embed: {
        "color": 5308240,
        "timestamp": "1337-01-01T02:28:00",
        "footer": {
          "text": message + ""
        },
        "fields": [{
          "name": "**Префикс успешно изменён!**",
          "value": "Теперь параметр `volume` " + volume + "%"
        }]
      }
    }).then(msg => {
      if (config[message.guild.id].delete == 'true') {
        msg.delete(config[message.guild.id].deleteTime);
      }
    });
  }
}