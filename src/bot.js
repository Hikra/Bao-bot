require('dotenv').config();
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();


const PREFIX = '!';
const DelPrefix = '-'; 
const ban_w = [
                'negro',
                'nigga',
                'negri',
                'niggas'
                ];
const soundboard = [
                'paguro',
                'fanculo'
                ];


//#region ----------------- LOGIN --------------

//const TOKEN = 'NzY2MDIyNzU3NzYyNTk2ODc1.X4dUSQ.56udeNdamMBa9_ziD_zYie0nDz0';
//client.login(TOKEN);
client.login(process.env.token);

client.on('ready', () => {
    console.log(`${client.user.tag} pronto.`);
});
//#endregion




const CheckPrefix = (message, cmdName) => message.content.toLowerCase().startsWith(DelPrefix + cmdName);

client.on('message', function(message) {
    if(message.author.bot) return;

    try {

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
        else if (message.content.toLowerCase().startsWith('!')) {
            if (message.content.toLowerCase().includes('help')) {
                var res = '';
                soundboard.forEach(x => {
                    res = `${res}${x}\n`;
                });
                message.reply(`Suoni disponibili:\n${res}`);
            }
            soundboard.forEach(x => {
                if (message.content.toLowerCase() == `!${x}`) {
                    const voiceChannel = message.member.voice.channel;
                    if (!voiceChannel) return message.reply("non sei in un canale vocale.");
                    voiceChannel.join()
                    .then(connection => {
                        const dispatcher = connection.play(`https://www.mboxdrive.com/${x}.mp3`, {volume: 0.6})
                        .on('finish', () => {
                            voiceChannel.leave();
                        })
                        .on('error', error => {
                            console.log(error);
                        });
                    });
                }
            });
        }
    } catch (error) {
        console.log(`ERRORE`);
    }
    
});

