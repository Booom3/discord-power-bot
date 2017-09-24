const debug = require('debug')('bot:discord');
import * as db from '../../database';
import { Argv } from '../argvtype';

export const command = 'extendcommand <command> [response..]';
export const describe = 'Extends a command. Works on types: randomstring';
export const builder = {
    weight: {
        describe: 'How likely it is to appear. ',
        alias: 'w',
        default: 1000
    }
};

export const handler = async function(argv: Argv) {
    let commandName = argv.command,
        commandResponse = argv.response.join(' '),
        commandWeight = argv.weight;

    const { rows } = await db.query('SELECT response FROM commands WHERE guildid = $1 AND command = $2', [argv.message.guild.id, commandName]);
    if (rows.length === 0) {
        argv.message.channel.send(`Command ${commandName} not found.`);
        return;
    }
    let response = rows[0].response;
    if (response.type !== 'randomstring') {
        argv.message.channel.send(`Command you are trying to extend is of type ${response.type} which is not extendable.`);
        return;
    }
    let newResponse = {weight: commandWeight, string: commandResponse};
    try {
        await db.query(`
            UPDATE commands
            SET response = jsonb_set(response, '{strings}', response->'strings' || $1)
            WHERE guildid = $2 AND command = $3
            `,
            [newResponse, argv.message.guild.id, commandName]);
        debug(`Command ${commandName} on ${argv.message.guild.name} updated with ${commandResponse} at weight ${commandWeight}.`);
        argv.message.channel.send(`Command ${commandName} updated with ${commandResponse} at weight ${commandWeight}.`);
        return;
    }
    catch (ex) {
        debug(ex);
        argv.message.channel.send('Something went horribly wrong.');
        return;
    }
}