import { readdir } from 'fs/promises';
import * as path from 'path';
import { state } from './state.js';
import { checkFileExist } from '../utils/navigation.js';
import { invalidInput } from '../utils/notifications.js';



export const ls = async () => {
    try {
        const files = await readdir(`${state.currentDirectory}`);
        for (const file of files)
            console.log(file);
        state.eventEmitter.emit('jobDone');
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

export const cd = async (_path) => {

    if (path.isAbsolute(_path)) {
        const isPathExist = await checkFileExist(_path);

        if (isPathExist) {
            state.currentDirectory = _path;
            state.eventEmitter.emit('jobDone');
        } else {
            invalidInput();
            state.eventEmitter.emit('jobDone');
        }
    } else {
        const fullPath = path.resolve(state.currentDirectory, _path);
        const isPathExist = await checkFileExist(fullPath);
        if (isPathExist) {
            state.currentDirectory = fullPath;
            state.eventEmitter.emit('jobDone');
        } else {
            invalidInput();
            state.eventEmitter.emit('jobDone');
        }
    }
};

export const up = async () => {
    const splitedPath = state.currentDirectory.split(path.sep)
    if (splitedPath.length <= 1) {
        state.eventEmitter.emit('jobDone')
        return
    } else {
       splitedPath.pop();
       state.currentDirectory = splitedPath.join(path.sep)
       state.eventEmitter.emit('jobDone')
    }
};