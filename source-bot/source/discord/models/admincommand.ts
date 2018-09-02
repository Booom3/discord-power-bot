import { Guild } from "discord.js";

export class AdminCommand {
    guild: Guild;
    responseText: string;
    print: (out: any) => void;
}
