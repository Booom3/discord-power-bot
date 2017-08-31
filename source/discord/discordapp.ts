const debug = require('debug')('bot:discord');
import * as db from '../database';
import * as Discord from 'discord.js';
const client = new Discord.Client();

client.on('ready', () => {
    debug('Bot is ready.');
});

client.on('message', async (message) => {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }

    if (message.content[0] === '!') {
        let command = message.content.split(' ')[0].replace('!', '');
        const { rows } = await db.query('SELECT response FROM commands WHERE guildid = $1 AND command = $2', [message.guild.id, command]);
        if (rows.length === 0) {
            return;
        }
        let response = rows[0].response;
        if (response.type === "randomstring") {
            let res = response.strings[Math.floor(Math.random() * response.strings.length)].string;
            debug(command + ' used, sending response: ' + res);
            message.channel.send(res);
            return;
        }
    }
});

if (!process.env.DISCORDTOKEN) {
    console.error('DISCORDTOKEN environment variable not specified.');
}
else {
    client.login(process.env.DISCORDTOKEN);
}