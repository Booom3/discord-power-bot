const debug = require('debug')('bot:discord');
import * as db from '../database';
import * as Discord from 'discord.js';
const client = new Discord.Client();

var commandString;

abstract class Command {
    public type: string;
}

class StringCommand extends Command {
    public type = "string";
    public string: string;
}

class RandomStringCommand extends Command {
    type = "randomstring";
    public strings: string[];
}

client.on('ready', () => {
    debug('Bot is ready.');
});

client.on('message', async (message) => {
    if (message.content === 'ping') {
        message.channel.send('pong');
    }

    let split = message.content.split(' ');
    debug(split[0]);
    if (split.length > 1 && split[0].replace('!', '') === commandString) {
        if (!message.member.hasPermission("MANAGE_ROLES", false, true, true)) {
            return;
        }
        if (split[1] === "addcommand" && split.length > 4) {
            let commandType: string = split[2];
            if (commandType !== 'string' && commandType !== 'randomstring') {
                message.channel.send("Invalid commandtype.");
                return;
            }
            let commandName, commandResponse,
                commandWeight; // only used if weight is defined
            if (commandType === 'randomstring' && split[3].indexOf('weight:') !== -1 && split.length > 5) {
                commandWeight = parseInt(split[3].slice('weight:'.length)) || 1000;
                commandName = split[4];
                commandResponse = split.slice(5).join(' ');
            }
            else {
                commandName = split[3];
                commandResponse = split.slice(4).join(' ');
            }
            let commandResponseObject = { type: commandType };
            if (commandType === 'string') {
                commandResponseObject['string'] = commandResponse;
            }
            else if (commandType === 'randomstring') {
                commandResponseObject['strings'] = [{weight: commandWeight, string: commandResponse}];
            }
            try {
                await db.query('INSERT INTO commands(guildid, command, response) VALUES($1, $2, $3)', [
                    message.guild.id,
                    commandName,
                    JSON.stringify(commandResponseObject)
                ]);
                debug(`Added ${commandName} to ${message.guild.name} with response: ${commandResponse}`);
                message.channel.send(`Added ${commandName} with response: ${commandResponse}`);
                return;
            }
            catch (ex) {
                debug(ex);
                message.channel.send('An error occurred. Command probably already exists.');
                return;
            }
        }
        else if (split[1] === "extendcommand" && split.length > 3) {
            let commandName, commandResponse, commandWeight = 1000;
            if (split[2].indexOf('weight:') !== -1 && split.length > 4) {
                commandWeight = parseInt(split[2].slice('weight:'.length)) || 1000;
                commandName = split[3];
                commandResponse = split.slice(4).join(' ');                
            }
            else {
                commandName = split[2];
                commandResponse = split.slice(3).join(' ');                
            }
            const { rows } = await db.query('SELECT response FROM commands WHERE guildid = $1 AND command = $2', [message.guild.id, commandName]);
            if (rows.length === 0) {
                message.channel.send(`Command ${commandName} not found.`);
                return;
            }
            let response = rows[0].response;
            if (response.type !== 'randomstring') {
                message.channel.send(`Command you are trying to extend is of type ${response.type} which is not extendable.`);
                return;
            }
            response.strings.push({weight: commandWeight, string: commandResponse});
            try {
                await db.query('UPDATE commands SET response = $1 WHERE guildid = $2 AND command = $3', [response, message.guild.id, commandName]);
                debug(`Command ${commandName} on ${message.guild.name} updated with ${commandResponse} at weight ${commandWeight}.`);
                message.channel.send(`Command ${commandName} updated with ${commandResponse} at weight ${commandWeight}.`);
                return;
            }
            catch (ex) {
                debug(ex);
                message.channel.send('Something went horribly wrong.');
                return;
            }
        }
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
        else if (response.type === "string") {
            let res = response.string;
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
    client.login(process.env.DISCORDTOKEN).then(() => {
        commandString = `<@${client.user.id}>`;
    });
}