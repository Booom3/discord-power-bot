const debug = require('debug')('bot:discord');
import * as db from '../database';
import * as Discord from 'discord.js';
const client = new Discord.Client();

client.on('ready', () => {
    debug('Bot is ready.');
});

client.on('message', (message) => {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }
});

if (!process.env.DISCORDTOKEN) {
    console.error('DISCORDTOKEN environment variable not specified.');
}
else {
    client.login(process.env.DISCORDTOKEN);
}