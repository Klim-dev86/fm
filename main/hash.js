import crypto from 'crypto';
import { createReadStream } from 'fs';
import { checkPathExistAndExecCb } from '../utils/navigation.js';
import { state } from './state.js';

export const calculateHash = (path) => {
    let data = [];

    const cb = async (path) => {
        const readStream = await createReadStream(path);

        readStream.on('error', function (error) {
            console.log(`error: ${error.message}`);
            state.eventEmitter.emit('jobDone');
        })

        readStream.on('data', (chunk) => {
            data.push(chunk)
        })

        readStream.on('end', function () {
            const hash = crypto.createHash('sha256');
            hash.update(Buffer.concat(data).toString());
            console.log(hash.digest('hex'))
        })
    }

    checkPathExistAndExecCb(path, cb);
};
