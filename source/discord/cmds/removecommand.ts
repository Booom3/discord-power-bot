const debug = require('debug')('bot:discord');
import * as db from '../../database';
import { Argv } from '../argvtype';

export const command = 'removecommand <command>';
export const desc = 'Removes a command (can be restored afterwards)';
export const builder = {};
export const handler = async function(argv: Argv) {
    let commandName = argv.command;
    const { rows, rowCount } = await db.query(`
        WITH tempcommand AS (
            DELETE FROM commands
            WHERE guildid = $1 AND command = $2
            RETURNING *
        )
        INSERT INTO deleted_commands
        SELECT * FROM tempcommand;
        `,
        [argv.message.guild.id, commandName]);

    if (rowCount === 0) {
        argv.message.channel.send(`Command ${commandName} does not exist.`);
    }

    debug (`Command ${commandName} on ${argv.message.guild.name} removed.`);
    argv.message.channel.send(`Command ${commandName} removed. You can restore it using "restorecommand ${commandName}."`);
}