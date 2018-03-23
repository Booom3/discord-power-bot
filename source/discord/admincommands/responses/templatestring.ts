export const command = 'templatestring <command>';
export const aliases = ['t'];
export const describe = 'Contains commands for modifying templatestring responses.';
export const builder = function (yargs) {
    return yargs.commandDir('templatestring')
}
export const handler = function (argv) {}