const debug = require('debug')('bot:discord');
import * as db from '../../database';
import { Argv } from '../argvtype';

export const command = 'addcommand <type> <command> [response..]';
export const describe = 'Adds a new command. Valid types: string, randomstring';
export const builder = {
    weight: {
        describe: 'How likely it is to appear. Used for types: randomstring',
        alias: 'w',
        default: 1000
    }
};

export const handler = async function(argv: Argv) {
    let commandType: string = argv.type;
    if (commandType !== 'string' && commandType !== 'randomstring') {
        argv.message.channel.send("Invalid commandtype.");
        return;
    }
    let commandName = argv.command,
        commandResponse = argv.response.join(' '),
        commandWeight = argv.weight;
    let commandResponseObject = { type: commandType };
    if (commandType === 'string') {
        commandResponseObject['string'] = commandResponse;
    }
    else if (commandType === 'randomstring') {
        commandResponseObject['strings'] = [{weight: commandWeight, string: commandResponse}];
    }
    try {
        
        await db.query('INSERT INTO commands(guildid, command, response) VALUES($1, $2, $3)', [
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