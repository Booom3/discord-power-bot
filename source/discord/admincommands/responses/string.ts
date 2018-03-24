export const command = 'string <command>';
export const aliases = ['s'];
export const describe = 'Contains commands for modifying string responses.';
export const builder = function (yargs) {
    return yargs.commandDir('string')
}
export const handler = function (argv) {}