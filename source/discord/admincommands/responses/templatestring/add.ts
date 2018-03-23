const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';

export const command = 'add <name> [response..]';
export const aliases = ['a'];
export const describe = 'Adds a new templatestring type response to the bot.' + 
    'This replaces markers inside the string with values gathered when the command is executed.';

export const handler = async function(argv: Argv) {
    let commandName = argv.name,
        commandResponse = argv.response.join(' ');
    let commandResponseObject = {
        string: commandResponse
    };
    try {
        await db.query(`INSERT INTO commands(guildid, command, type, response) VALUES($1, $2, 'templatestring', $3)`, [
            argv.message.guild.id,
            commandName,
            JSON.stringify(commandResponseObject)
        ]);
        debug(`Added ${commandName} to ${argv.message.guild.name} with response: ${commandResponse}`);
        argv.message.channel.send(`Added ${commandName} with response: ${commandResponse}`);
        return;
    }
    catch (ex) {
        debug(ex);
        argv.message.channel.send('An error occurred. Command probably already exists.');
        return;
    }
}