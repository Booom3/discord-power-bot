const debug = require('debug')('bot:discord');
import * as db from '../../../database';
import { Argv } from '../../argvtype';

export const command = 'remove <name>';
export const aliases = ['D'];
export const desc = 'Removes a command (can be restored afterwards)';

export const handler = async function(argv: Argv) {
    let commandName = argv.name;
    let rows = await db.query(`
        WITH tempcommand AS (
            DELETE FROM commands
            WHERE guildid = $1 AND command = $2
            RETURNING *
        )
        INSERT INTO deleted_commands(guildid, command, response, type)
        SELECT guildid, command, response, type FROM tempcommand
        `,
        [argv.message.guild.id, commandName]);

    if (rows.rowCount === 0) {
        argv.print(`Command ${commandName} does not exist.`);
        return;
    }

    debug (`Command ${commandName} on ${argv.message.guild.name} removed.`);
    argv.print(`Command ${commandName} removed. You can restore it using "restorecommand ${commandName}."`);
}