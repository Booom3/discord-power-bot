const debug = require('debug')('bot:discord');
import * as db from '../database';
import * as Discord from 'discord.js';
const client = new Discord.Client();
import * as yargs from 'yargs';
const parser = yargs
    .commandDir('./admincommands')
    .exitProcess(false)
    .help();

var commandString;

client.on('ready', () => {
    debug('Bot is ready.');
});

client.on('message', async (message) => {
    if (message.author.bot) {
        return;
    }

    let split = message.content.split(' ');
    if (split.length > 1 && split[0].replace('!', '') === commandString) {
        if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
            return;
        }

        parser.parse(split.slice(1), {message: message}, (err, argv, output) => {
            if (output) {
                message.channel.send('```' + output + '```');
            }
        });
    }

    if (message.content[0] === '!') {
        let command = message.content.split(' ')[0].replace('!', '');
        const { rows } = await db.query('SELECT * FROM commands WHERE guildid = $1 AND command = $2', [message.guild.id, command]);
        if (rows.length === 0) {
            return;
        }
        parser.parse(
            ['response', rows[0].type, 'get', rows[0].command],
            {message: message, row: rows[0]}
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