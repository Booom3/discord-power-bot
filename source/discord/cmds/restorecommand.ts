const debug = require('debug')('bot:discord');
import * as db from '../../database';
import { Argv } from '../argvtype';

export const command = 'restorecommand <command> [id]';
export const desc = 'Restores a removed command';
export const builder = {};

export const handler = async function(argv: Argv) {
    let commandName = argv.command;
                
    const { rows } = await db.query(`
        SELECT * FROM deleted_commands
        WHERE guildid = $1 AND command = $2
        `,
        [argv.message.guild.id, commandName]);

    if (rows.length === 0) {
        argv.message.channel.send(`No command ${commandName} found to restore.`);
        return;
    }

    let deletedCommandId = argv.id;

    if (!deletedCommandId && deletedCommandId !== 0 && rows.length > 1) {
        let returnMessage = `More than one command ${commandName} found.`;
        rows.forEach((val, i) => returnMessage += `\n${i}: ${val.response.string}`);
        argv.message.channel.send(returnMessage);
        return;
    }

    else {
        try {
            await db.query(`
                WITH tempcommand AS (
                    DELETE FROM deleted_commands
                    WHERE guildid = $1 AND command = $2 AND id = $3
                    RETURNING *
                )
                INSERT INTO commands
                SELECT guildid, command, response FROM tempcommand;
                `,
                [argv.message.guild.id, commandName, deletedCommandId || rows[0].id]);

            debug(`Command ${commandName} on ${argv.message.guild.name} restored.`);
            argv.message.channel.send(`Command ${commandName} restored.`);
        } catch (ex) {
            debug(ex);
            argv.message.channel.send(`Something went wrong. A command with the same name likely already exists.`);
        }
    }
}