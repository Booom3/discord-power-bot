const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';

export const command = 'add <name>';
export const aliases = ['a'];
export const describe = 'Adds a new randomstring type response to the bot. This replies to a command with a random string out of a collection.';
export const builder = {
    weight: {
        describe: 'How likely it is to appear. Used for types: randomstring',
        alias: 'w',
        default: 1000
    }
};

export const handler = async function(argv: Argv) {
    if (argv.responseText === null) {
        argv.print(`Response text is empty. Did you miss a new line?`);
        return;
    }
    let commandName = argv.name,
        commandResponse = argv.responseText,
        commandWeight = argv.weight;
    let commandResponseObject = {
        strings: [
            {
                weight: commandWeight,
                id: commandResponse
            }
        ]
    };
    try {
        await db.query(`INSERT INTO commands(guildid, command, type, response) VALUES($1, $2, 'randomstring', $3)`, [
            argv.message.guild.id,
            commandName,
            JSON.stringify(commandResponseObject)
        ]);
        debug(`Added ${commandName} to ${argv.message.guild.name} with response: ${commandResponse}`);
        argv.print(`Added ${commandName} with response: ${commandResponse}`);
        return;
    }
    catch (ex) {
        debug(ex);
        argv.print('An error occurred. Command probably already exists.');
        return;
    }
}