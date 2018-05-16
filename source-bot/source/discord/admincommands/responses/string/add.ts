const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';

export const command = 'add <name>';
export const aliases = ['a'];
export const describe = 'Adds a new string type response to the bot. This simply replies to a command with a string.';

export const handler = async function(argv: Argv) {
    if (argv.responseText === null) {
        argv.print(`Response text is empty. Did you miss a new line?`);
        return;
    }
    let commandName = argv.name,
        commandResponse = argv.responseText;
    let commandResponseObject = {
        string: commandResponse
    };
    try {
        await db.query(`INSERT INTO commands(guildid, command, type, response) VALUES($1, $2, 'string', $3)`, [
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