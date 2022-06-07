import { lstat, readdir } from 'fs/promises'

export const getFileList = async (dir: string = ''): Promise<string[]> => {
    const path = getPath(dir)
    return await readdir(path)
}

export const getPath = (path: string): string => {
    return path === '' ? process.cwd() : path
}

export const isDir = async (path: string): Promise<boolean> => {
    let stat = await lstat(path)
    return stat.isDirectory();
}
