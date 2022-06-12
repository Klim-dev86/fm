import { writeFile, rename, unlink, copyFile } from 'fs/promises';
import { createReadStream } from 'fs';
import * as path from 'path';
import { state } from './state.js';
import { checkPathExistAndExecCb, checkPathEmptyAndExecCb } from '../utils/navigation.js';
import { stdout } from 'process';
import os from 'os';


export const cat = (_path) => {
    const cb = async (_path) => {
        console.log(os.EOL)
        const readStream = await createReadStream(_path);
        await readStream.pipe(stdout);
        readStream.on('end', function () {
            state.eventEmitter.emit('jobDone');
        })
    }

    checkPathExistAndExecCb(_path, cb)
};

export const add = async (fileName) => {
    await writeFile(`${state.currentDirectory}${path.sep}${fileName}`, '', function (err) {
        if (err) throw err;
    })
    state.eventEmitter.emit('jobDone');
};

export const rn = async (_path, newName) => {
    const cb = async (_path) => {
        rename(_path, `${path.dirname(_path)}${path.sep}${newName}`, function (err) {
            if (err) console.log('ERROR: ' + err);
        });
    }

    checkPathExistAndExecCb(_path, cb)
};

export const cd = async (_path) => {
    const cb = async (_path) => {
        state.currentDirectory = _path;
    }

    checkPathExistAndExecCb(_path, cb)
};


export const rm = async (_path) => {
    const cb = async (_path) => {
        unlink(_path);
    }

    checkPathExistAndExecCb(_path, cb)
};

export const cp = async (source, dest) => {
    let _dest;

    const cb1 = (_source) => {
        copyFile(_source,  _dest)
    }

    checkPathEmptyAndExecCb(dest, (_path) => {
        _dest = _path;
        checkPathExistAndExecCb(source, cb1);
    });
};

export const mv = async (source, dest) => {
    let _dest;

    const cb1 = (_source) => {
        copyFile(_source,  _dest);
        unlink(_source);
    }

    checkPathEmptyAndExecCb(dest, (_path) => {
        _dest = _path;
        checkPathExistAndExecCb(source, cb1);
    });
};
