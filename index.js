import { getUserArgs, parseArgs } from './utils/args.js';
import { greetUser } from './utils/notifications.js';
import { initCLI } from './main/cli.js';
import { setInitHomeDir } from './utils/navigation.js';

setInitHomeDir();

getUserArgs().forEach(arg => {
    parseArgs(arg)
});

greetUser()

initCLI()