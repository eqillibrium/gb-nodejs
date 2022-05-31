import { createReadStream, createWriteStream } from 'fs'
import { Transform } from 'stream'

export function streamTransformService (sourceFile: string, searchString: string, encode: BufferEncoding = 'utf-8') {

    const readStream = createReadStream(`./${sourceFile}`, encode);
    const writeStream = createWriteStream(`./%${searchString}%_requests.log`, { flags: 'a', encoding: encode });

    const transformStream = new Transform({
        transform(chunk, encoding, callback) {
            const transformedChunk = chunk.toString().split('\n').filter((el: string) => el.includes(searchString))
            callback(null, transformedChunk.join());
        }
    });

    readStream.pipe(transformStream).pipe(writeStream);
    readStream.on('end', () => { console.log('end reading and writing logs') })
}

