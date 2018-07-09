const figlet = require('figlet');

exports.run = async (client, message, args) => {
  
  if(args.join(' ').length > 14) return message.channel.send('Текст не должен превышать 14 символов!') 
  if (!args.join(' ')) return message.channel.send('Введите текст! Команда: ascii <text>'); 
    figlet(args.join(' '), (err, data) => {
      message.channel.send(data , {code: 'AsciiArt'})
    })
};