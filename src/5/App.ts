import http from 'http'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { createReadStream } from 'fs'
import { Worker } from 'worker_threads'
import { getPath, getFileList, isDir } from './functions.js'
import {string} from "yargs";

type workerParams = {
    path: string,
    searchString: string
}

function initWorker ({ path, searchString }: workerParams) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./dist/5/Worker.js', { workerData: { path, searchString } })
        worker.on('message', resolve)
        worker.on('error', reject)
    })
}

export const App = http.createServer(async (req, res) => {

    if (req.method === 'GET') {
        const filePath = join('src', '5', 'index.html')
        const readStream = createReadStream(filePath)
        res.writeHead(200, { 'Content-Type': 'text/html'})
        readStream.pipe(res)
        return
    }

    if (req.method === 'POST') {
        let data = ''
        req.on('data', (chunk) => {
            data += chunk
        })
        req.on('end', async () => {
            res.setHeader('Content-Type', 'json')
            const body = JSON.parse(data)
            const path = getPath(body?.path)
            const isDirectory = await isDir(path)

            if (body?.search) {

                initWorker({ path, searchString: body?.searchString })
                    // @ts-ignore
                    .then(({ result }) => {
                        console.log(result)
                        const response = JSON.stringify({ currentDir: path, files: [], text: result })
                        res.end(response)
                    })
                return
            }

            if(isDirectory) {
                const response = JSON.stringify({ currentDir: path, files: await getFileList(body?.path), text: '' })
                res.end(response)
                return
            }
            const response = JSON.stringify({ currentDir: path, files: [], text: await readFile(path, 'utf-8')})
            res.end(response)
            return
        })
    }
})
