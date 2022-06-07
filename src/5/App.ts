import http from 'http'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { createReadStream } from 'fs'
import { getPath, getFileList, isDir } from './functions.js'

export function bootstrap () {
    http.createServer(async (req, res) => {
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
    }).listen(3000, 'localhost')
}
