var figlet = require('figlet');

exports.run = (client, message, args) => {
  var maxLen = 14 // You can modify the max characters here
  
  if(args.join(' ').length > maxLen) return message.channel.send('Текст не должен превышать 14 символов!') 
  
  if(!args[0]) return message.channel.send('Введите текст!');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('О-ошибка...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });
}