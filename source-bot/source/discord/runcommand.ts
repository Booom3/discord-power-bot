import * as yargs from 'yargs';
import { ParseCallback, Arguments } from 'yargs';
import { Message } from 'discord.js';
import { AdminCommand } from './models/admincommand';

const parser = yargs
    .commandDir('./admincommands')
    .exitProcess(false)
    .wrap(null)
    .help();

export const RunAdminCommand = async (yargsArgs: string, adminCommand: AdminCommand): Promise<{err: Error | undefined, argv: Arguments, output: string}> => {
    return new Promise<{err: Error | undefined, argv: Arguments, output: string}>((resolve, reject) => {
        parser.parse(yargsArgs, adminCommand, (err, argv, output) => resolve({err: err, argv: argv, output: output}));
    });
}
