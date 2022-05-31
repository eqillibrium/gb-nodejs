import { createReadStream, createWriteStream, WriteStream, ReadStream } from 'fs'

export function streamFsService (sourceFile: string, searchString: string, encode: BufferEncoding = 'utf-8') {

    const readStream = createReadStream(`./${sourceFile}`, encode);
    const writeStream = createWriteStream(`./%${searchString}%_requests.log`, { flags: 'a', encoding: encode });

    readStream.on('data', (chunk: Buffer | string) => {
        const element = chunk.toString().split('\n').filter(el => el.includes(searchString))
        writeStream.write('\n')
        writeStream.write(element.join())
    });
    readStream.on('end', () => { console.log('end reading and writing logs') })
}
