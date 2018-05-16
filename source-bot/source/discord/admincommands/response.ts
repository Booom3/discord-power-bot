export const command = 'response <command>';
export const aliases = ['r'];
export const describe = 'Contains commands for modifying responses.';
export const builder = function (yargs) {
    return yargs.commandDir('responses')
}
export const handler = function (argv) {}