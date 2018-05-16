const debug = require('debug')('bot:discord');
import * as db from '../database';
import * as Discord from 'discord.js';
const client = new Discord.Client();
import * as yargs from 'yargs';
const parser = yargs
    .commandDir('./admincommands')
    .exitProcess(false)
    .wrap(null)
    .help();

var commandString;

client.on('ready', () => {
    debug('Bot is ready.');
});

client.on('message', async (message) => {
    if (message.author.bot) {
        return;
    }

    let firstNewline = message.content.indexOf('\n'), firstLine;
    if (firstNewline === -1)
        firstLine = message.content.split(' ');
    else
        firstLine = message.content.substring(0, firstNewline).split(' ');
    if (firstLine.length > 1 && firstLine[0].replace('!', '') === commandString) {
        if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
            return;
        }

        let responseText;
        if (firstNewline !== -1) {
            responseText = message.content.substr(firstNewline + 1);
        }
        else {
            responseText = null;
        }
        parser.parse(firstLine.slice(1), {message: message, responseText: responseText, print: (out) => message.channel.send(out)}, (err, argv, output) => {
            if (output) {
                message.channel.send('```' + output + '```');
            }
        });
    }

    if (message.content[0] === '!') {
        let command = message.content.split(' ')[0].replace('!', '');
        const res = await db.query('SELECT * FROM commands WHERE guildid = $1 AND command = $2', [message.guild.id, command]);
        if (!res) return;
        if (res.rows.length === 0) return;
        parser.parse(
            ['response', res.rows[0].type, 'get', res.rows[0].command],
            {message: message, row: res.rows[0], print: (out) => message.channel.send(out)}
        );
        return;
    }
});

client.on('error', (err) => {
    debug(err);
});

if (!process.env.DISCORDTOKEN) {
    console.error('DISCORDTOKEN environment variable not specified.');
}
else {
    client.login(process.env.DISCORDTOKEN).then(() => {
        commandString = `<@${client.user.id}>`;
    });
}