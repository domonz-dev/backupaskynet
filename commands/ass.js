const { get } = require('request-promise-native');

exports.run = async (client, message) => {
    if (!message.channel.nsfw) return message.channel.send({embed: {
        title: `Butts only in NSFW channels pls`
    }})

    const waitMessage = await message.channel.send({ embed: {
        title: `Ya boi ${message.author.username} is looking for some butts...`}
    })

    const options = { 
        url: 'http://api.obutts.ru/butts/0/1/random',
        json: true 
    }
    
    get(options).then(asses => { // Pass in the boobs objects fetched from the API 
        return waitMessage.edit({embed: {
            title: `:eyes: Butts`,
            image: {
                url: "http://media.obutts.ru/" + asses[0].preview
            },
        }})
    }).catch(error => { // If any error occurs while fetching from the API, edit the message to show the error
        return waitMessage.edit({ embed: {
            title: `No butts for ${message.author.username} today :(`,
            description: `\`\`\`js\n${error}\`\`\``}
        })
    })
};