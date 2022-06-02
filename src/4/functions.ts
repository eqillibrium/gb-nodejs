import { lstat, readdir } from 'fs/promises'
import { createReadStream, createWriteStream } from 'fs'
import inquirer from 'inquirer'

export const getCurrentDirectory = async (): Promise<string> => {
    const useCurrentDir = await inquirer.prompt([
        {
            name: "isCurrentDir",
            type: "confirm",
            message: "Do you want to use current directory?",
        }
    ])
    if(useCurrentDir.isCurrentDir) {
        return process.cwd()
    }
    const userPath = await inquirer.prompt([
        {
            name: "userPath",
            type: "input",
            message: "Which path do you want ot use?",
        }
    ])
    return userPath.userPath
};

const isDir = async (dir: string, fileName: string): Promise<boolean> => {
    let stat = await lstat(`${dir}\\${fileName}`)
    return stat.isDirectory();
}

// @ts-ignore
export const getPathNameOfFile = async (dir: string): Promise<Record<string, unknown>> => {
    try {
        const file = await inquirer.prompt([
            {
                name: "fileName",
                type: "list",
                message: "Choose file:",
                choices: await readdir(dir),
            }
        ])
        const isDirectory = await isDir(dir, file.fileName)
        if(isDirectory) {
            return await getPathNameOfFile(`${dir}\\${file.fileName}`)
        }
        return { dir, fileName: file?.fileName }
    } catch (e) {
        console.log(e)
    }
}

export const getSearchString = async (): Promise<string> => {
    const answer = await inquirer.prompt([
        {
            name: "searchString",
            type: "input",
            message: "What string do you want to find?",
        }
    ])
    return answer.searchString
}

export function streamFsService ({ dir, fileName }: Record<string, unknown>, searchString: string, encode: BufferEncoding = 'utf-8') {

    const readStream = createReadStream(`${dir}\\${fileName}`, encode);
    const writeStream = createWriteStream(`.\\%${searchString}%_requests.log`, { flags: 'a', encoding: encode });

    readStream.on('data', (chunk: Buffer | string) => {
        const element = chunk.toString().split('\n').filter(el => el.includes(searchString))
        writeStream.write('\n')
        writeStream.write(element.join())
    });
    readStream.on('end', () => { console.log('end reading and writing files') })
}
