import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import { checkPathExistAndExecCb, checkPathEmptyAndExecCb } from '../utils/navigation.js';



export const compress = async (source, dest) => {
    let _dest;

    const cb1 = (_source) => {
        const brotliCompress = createBrotliCompress();

        pipeline(
            createReadStream(_source),
            brotliCompress,
            createWriteStream(_dest),
            (err) => {
                if (err) {
                    console.error('An error occurred:', err);
                    state.eventEmitter.emit('jobDone');
                }
            });
    }

    checkPathEmptyAndExecCb(dest, (_path) => {
        _dest = _path;
        checkPathExistAndExecCb(source, cb1);
    });
};

export const decompress = async (source, dest) => {
    let _dest;

    const cb1 = (_source) => {
        const brotliDecompress = createBrotliDecompress();

        pipeline(
            createReadStream(_source),
            brotliDecompress,
            createWriteStream(_dest),
            (err) => {
                if (err) {
                    console.error('An error occurred:', err);
                    state.eventEmitter.emit('jobDone');
                }
            });
    }

    checkPathEmptyAndExecCb(dest, (_path) => {
        _dest = _path;
        checkPathExistAndExecCb(source, cb1);
    });
};
