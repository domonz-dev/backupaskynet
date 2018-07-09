exports.run = (client, message, args) => { //Collecting info about command
    message.channel.send('Pong!').then(msg=>{msg.delete(5000);}); //Pong!
}