import * as Discord from 'discord.js';

export interface Argv {
    message: Discord.Message;
    [x: string]: any;
}