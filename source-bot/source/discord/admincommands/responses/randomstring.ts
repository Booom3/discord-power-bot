export const command = 'randomstring <command>';
export const aliases = ['r'];
export const describe = 'Contains commands for modifying randomstring responses.';
export const builder = function (yargs) {
    return yargs.commandDir('randomstring')
}
export const handler = function (argv) {}