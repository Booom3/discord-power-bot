const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';
import { TextChannel } from 'discord.js';

export const command = 'get <name>';
export const aliases = ['g'];
export const describe = 'Gets the response from the templatestring command.';

const templateFinder = /\${([\w\.]*)}/g;

export const handler = async function(argv: Argv) {
    let commandName = argv.name;
    let row;
    if (argv.row) {
        row = argv.row;
    }
    else {
        const { rows } = await db.query(`SELECT response FROM commands WHERE guildid = $1 AND command = $2 AND type = 'templatestring'`,
            [argv.message.guild.id, commandName]);
        if (rows.length === 0) {
            return;
        }
        row = rows[0];
    }

    let templates = {
        topic: (() => argv.message.channel instanceof TextChannel ? argv.message.channel.topic : null)() ,
        user: {
            name: argv.message.author.username
        },
        unsafe: argv.message
    }
    let res = row.response.string.replace(templateFinder, (match, p1) => {
        return p1.split('.').reduce((t, val) => t && t[val] || null, templates) || `<Template \`${match}\` not found>`;
    });
    debug(`${commandName} used, sending response ${res}`);
    argv.message.channel.send(res);
    return;
}
