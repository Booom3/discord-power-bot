const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';

export const command = 'extend <name> [response..]';
export const aliases = ['e'];
export const describe = 'Extends an already existing response with another random response.';
export const builder = {
    weight: {
        describe: 'How likely it is to appear. ',
        alias: 'w',
        default: 1000
    }
};

export const handler = async function(argv: Argv) {
    let commandName = argv.name,
        commandResponse = argv.response.join(' '),
        commandWeight = argv.weight;

    let newResponse = {weight: commandWeight, id: commandResponse};
    try {
        let ret = await db.query(`
            UPDATE commands
            SET response = jsonb_set(response, '{strings}', response->'strings' || $1)
            WHERE guildid = $2 AND command = $3
            `,
            [newResponse, argv.message.guild.id, commandName]);
            
        if (ret.rowCount === 0) {
            argv.message.channel.send(`No command named ${commandName} found.`);
            return;
        }
        debug(`Command ${commandName} on ${argv.message.guild.name} updated with ${commandResponse} at weight ${commandWeight}.`);
        argv.message.channel.send(`Command ${commandName} updated with ${commandResponse} at weight ${commandWeight}.`);
        return;
    }
    catch (ex) {
        debug(ex);
        argv.message.channel.send(`Something went horribly wrong.`);
        return;
    }
}