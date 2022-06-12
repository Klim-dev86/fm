import { state } from '../main/state.js';
import { access } from 'fs/promises';
import os from 'os';
import { operationFailed } from './notifications.js';


import path from 'path';
import { fileURLToPath } from 'url';

export const getAppdir = () => {
    const __filename = fileURLToPath(import.meta.url);
    return __dirname = path.dirname(__filename);
}

export const setInitHomeDir = () => {
    state.currentDirectory = os.homedir();
    state.homeDirectory = state.currentDirectory;
}

export const updateCurrentDir = (newDir) => {
    state.currentDirectory = newDir;
}

export const checkFileExist = async (path) => {
    try {
        await access(path)
        return true
    } catch {
        return false
    }
}

export const checkPathExistAndExecCb = async (_path, cb) => {
    if (path.isAbsolute(_path)) {
        const isPathExist = await checkFileExist(_path);

        if (isPathExist) {
            await cb(_path)
            state.eventEmitter.emit('jobDone');
        } else {
            operationFailed();
            state.eventEmitter.emit('jobDone');
        }
    } else {
        const fullPath = path.resolve(state.currentDirectory, _path);
        const isPathExist = await checkFileExist(fullPath);
        if (isPathExist) {
            await cb(fullPath)
            state.eventEmitter.emit('jobDone');
        } else {
            operationFailed();
            state.eventEmitter.emit('jobDone');
        }
    }
}

export const checkPathEmptyAndExecCb = async (_path, cb) => {
    if (path.isAbsolute(_path)) {
        const isPathExist = await checkFileExist(_path);

        if (isPathExist) {
            operationFailed();
            state.eventEmitter.emit('jobDone');
        } else {
            await cb(_path)
            state.eventEmitter.emit('jobDone');
        }
    } else {
        const fullPath = path.resolve(state.currentDirectory, _path);
        const isPathExist = await checkFileExist(fullPath);
        if (isPathExist) {
            operationFailed();
            state.eventEmitter.emit('jobDone');
        } else {
            await cb(fullPath)
            state.eventEmitter.emit('jobDone');
        }
    }
}
