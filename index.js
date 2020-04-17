const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

client.login('SEU TOKEN');

client.on('message', async (message) => {
    if(message.content.startsWith('!play ')) {
        let linkyt = message.content.replace('!play ', '');   
    const voiceChannel = message.member.voice.channel;
        if(!voiceChannel){
            return message.reply('Be on a voice channel');
        };
    const info = ytdl.validateURL(linkyt);
        if(info === true){
            message.channel.send(':white_check_mark: Valid link, playback will start');
        }else{
            return message.channel.send(':x: Invalid link, change link and try again');
        };
    const connection = await voiceChannel.join();
    const watcher = connection.play(
        ytdl(linkyt, {
            filter: "audioonly",
            quality: "highest",
        }));
    watcher.on('end', () => voiceChannel.leave());
    };
});

client.on('message', async (message) => {
    if(message.content === '!stop') {
        return message.member.voice.channel.leave();
    };
});
