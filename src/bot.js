require('dotenv').config();
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

//const TOKEN = 'NzY2MDIyNzU3NzYyNTk2ODc1.X4dUSQ.56udeNdamMBa9_ziD_zYie0nDz0';
const PREFIX = '!';
const DelPrefix = '-'; 
const ban_w = [
                'negro',
                'nigga',
                'negri',
                'niggas'
                ];


//client.login(TOKEN);
client.login(process.env.token);


client.on('ready', () => {
    console.log(`${client.user.tag} pronto.`);
});


const CheckPrefix = (message, cmdName) => message.content.toLowerCase().startsWith(DelPrefix + cmdName);


client.on('message', function(message) {
    if(message.author.bot) return;

    // try {

        if (CheckPrefix(message, '') && message.channel.id == '570313576301068303') {
            message.delete();
            message.author.send('Hai sbagliato canale, brutto scemo.');
        }
        else if (message.content.toLowerCase() == 'ciao') {
            message.reply('ciao bello!');
        }
        else if (ban_w.some(w => message.content.toLowerCase().includes(w))) {
            message.reply('che cazzo fai non si dice');
        }
        // else if (message.content.toLowerCase() == 'bao') {
        //     const connection = message.member.voice.channel.join().then(connection => {
        //         const dispatcher = connection.play(fs.createReadStream('fart.ogg'), { type: 'ogg/opus' });

        //         dispatcher.on('start', () => {
        //             console.log('audio.mp3 is now playing!');
        //         });
    
        //         dispatcher.on('finish', () => {
        //             console.log('audio.mp3 has finished playing!');
        //             connection.disconnect();
        //         });
    
        //         // Always remember to handle errors appropriately!
        //         dispatcher.on('error', console.error);
        //     });
        // }
        else if (message.content.toLowerCase() == 'bao') {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) return message.reply("non sei in un canale vocale.");
            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.play('https://www.myinstants.com/media/sounds/movie_1.mp3')
                        .on('finish', () => {
                            voiceChannel.leave();
                        })
                        .on('error', error => {
                            console.log(error);
                        });
                });
        }
        

    // } catch (error) {
    //     console.log(`ERRORE`);
    // }
    
});