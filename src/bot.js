require('dotenv').config();
const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client();

const CheckPrefix = (message, cmdName) => message.content.toLowerCase().startsWith(DelPrefix + cmdName);


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
                'fanculo',
                'cutg',
                'chingchong'
                ];

//#region ----------------- LOGIN --------------

//METTERE IL TOKEN PER TESTARE CON 'npm run dev'
//const TOKEN = '';
//client.login(TOKEN);

client.login(process.env.token);

client.on('ready', () => {
    client.user.setActivity('!help', { type: 'LISTENING' })
    console.log(`${client.user.tag} pronto.`);
});
//#endregion


// client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => { // Listeing to the voiceStateUpdate event
//     if (newVoiceState.channel && newVoiceState.member.user.id == '195474322473615360') { // The member connected to a channel.
//         newVoiceState.member.voice.kick();
//     } else if (oldVoiceState.channel && oldVoiceState.member.user.id == '195474322473615360') { // The member disconnected from a channel.
//         //DO SOMETHING
//     };
// });



client.on('message', function(message) {
    if(message.author.bot) return;

    try {

        if (CheckPrefix(message, '') && message.channel.id != '766300892159803392') {
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
                message.delete();
                var res = '';
                soundboard.forEach(x => {
                    res = `${res}${x}\n`;
                });
                message.reply(`Suoni disponibili (prefisso '!'):\n${res}`);
            }
            soundboard.forEach(x => {
                if (message.content.toLowerCase() == `!${x}`) {
                    message.delete();
                    const voiceChannel = message.member.voice.channel;
                    if (!voiceChannel) return message.reply("non sei in un canale vocale.");
                    voiceChannel.join()
                    .then(connection => {
                        const dispatcher = connection.play(`https://www.mboxdrive.com/${x}.mp3`, {volume: 0.4})
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

