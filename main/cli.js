import * as readline from 'node:readline';
import { byeUser, currentDir, invalidInput } from '../utils/notifications.js';
import { osCommandHandler } from './os.js';
import { up, cd, ls } from './nav.js';
import { cat, add, rn, cp, rm, mv } from './fs.js';
import { compress, decompress } from './zip.js';
import { calculateHash } from './hash.js';
import { EventEmitter } from 'events';
import { state } from '../main/state.js'
import os from 'os';


state.eventEmitter = new EventEmitter;
let rl;

export const initCLI = () => {
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'WRITE_HERE> ',
    });

    currentDir();
    rl.prompt();

    rl.on('line', (line) => {
        parseInput(line)
    }).on('close', () => {
        byeUser();
        process.exit(0);
    });

    state.eventEmitter.on('jobDone', () => {
        console.log(os.EOL);
        currentDir();
        rl.prompt();
    });
}

export const parseInput = (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        case 'up':
            up();
            break
        case 'cd':
            cd(args[0]);
            break
        case 'ls':
            ls()
            break
        case 'cat':
            cat(args[0]);
            break
        case 'add':
            add(args[0]);
            break
        case 'rn':
            rn(args[0], args[1]);
            break
        case 'cp':
            cp(args[0], args[1]);
            break
        case 'mv':
            mv(args[0], args[1]);
            break
        case 'rm':
            rm(args[0]);
            break
        case 'os':
            osCommandHandler(args);
            break
        case 'hash':
            calculateHash(args[0])
            break
        case 'compress':
            compress(args[0], args[1]);
            break
        case 'decompress':
            decompress(args[0], args[1]);
            break
        case '.exit':
            byeUser();
            process.exit(0);
            break
        default:
            invalidInput();
            state.eventEmitter.emit('jobDone');
    }
}
