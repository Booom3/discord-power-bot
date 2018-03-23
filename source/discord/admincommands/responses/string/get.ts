const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';

export const command = 'get <name>';
export const aliases = ['g'];
export const describe = 'Gets the response from the string command.';

export const handler = async function(argv: Argv) {
    let commandName = argv.name;
    let row;
    if (argv.row) {
        row = argv.row;
    }
    else {
        const { rows } = await db.query(`SELECT response FROM commands WHERE guildid = $1 AND command = $2 AND type = 'string'`,
            [argv.message.guild.id, commandName]);
        if (rows.length === 0) {
            return;
        }
        row = rows[0];
    }
    let res = row.response.string;
    debug(`${commandName} used, sending response ${res}`);
    argv.print(res);
    return;
}