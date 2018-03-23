const debug = require('debug')('bot:discord');
import * as db from '../../../database';
import { Argv } from '../../argvtype';

export const command = 'restore <name> [id]';
export const aliases = ['R'];
export const desc = 'Restores a removed command';
export const builder = {};

export const handler = async function(argv: Argv) {
    let commandName = argv.name;
                
    const { rows } = await db.query(`
        SELECT * FROM deleted_commands
        WHERE guildid = $1 AND command = $2
        `,
        [argv.message.guild.id, commandName]);

    if (rows.length === 0) {
        argv.print(`No command ${commandName} found to restore.`);
        return;
    }

    let deletedCommandId = argv.id;

    if (!deletedCommandId && deletedCommandId !== 0 && rows.length > 1) {
        let returnMessage = `More than one command ${commandName} found.`;
        rows.forEach((val, i) => returnMessage += `\n${i}: ${val.response.string}`);
        argv.print(returnMessage);
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
                INSERT INTO commands(guildid, command, type, response)
                SELECT guildid, command, type, response FROM tempcommand
                `,
                [argv.message.guild.id, commandName, deletedCommandId || rows[0].id]);

            debug(`Command ${commandName} on ${argv.message.guild.name} restored.`);
            argv.print(`Command ${commandName} restored.`);
        } catch (ex) {
            debug(ex);
            argv.print(`Something went wrong. A command with the same name likely already exists.`);
        }
    }
}