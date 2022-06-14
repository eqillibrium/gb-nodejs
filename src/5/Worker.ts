import { workerData, parentPort } from 'worker_threads'
import { createReadStream } from "fs";

const readStream = createReadStream(workerData?.path)
let result = ''
readStream.on('data', (chunk: Buffer | string) => {
    const element = chunk.toString().split('\n').filter(el => el.includes(workerData?.searchString))
    result += element.join('')
    result += '\n'
})
readStream.on('end', async () => {
    if (parentPort) {
        parentPort.postMessage({ result });
    }
})





