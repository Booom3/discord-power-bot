const debug = require('debug')('bot:discord');
import * as db from '../../../../database';
import { Argv } from '../../../argvtype';

import * as rwc from 'random-weighted-choice';

export const command = 'getall <name>';
export const aliases = ['ga'];
export const describe = 'Gets all possible responses to this command.';

export const handler = async function(argv: Argv) {
    let commandName = argv.name;
    const { rows } = await db.query(`SELECT response FROM commands WHERE guildid = $1 AND command = $2 AND type = 'randomstring'`,
        [argv.message.guild.id, commandName]);
    if (rows.length === 0) {
        argv.print(`Command ${commandName} not found.`);
        return;
    }
    let res = [];
    rows[0].response.strings.forEach((val) => {
        res.push('Weight: ' + val.weight + ' Text: ' + val.id);
    });
    debug(`Returning all results for ${commandName}`);
    argv.print(res.join("\n"));
    return;
}