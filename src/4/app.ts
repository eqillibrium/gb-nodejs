#!/usr/bin/env node
import { getCurrentDirectory,  getPathNameOfFile, getSearchString, streamFsService } from './functions.js'

export async function bootstrap () {

    //получаем либо текущую директорию либо пользовательский путь в виде строки
    const dir = await getCurrentDirectory()
    //получаем абсолютный путь к файлу и имя файла в виде объекта
    const pathAndName = await getPathNameOfFile(dir)
    // получаем от пользователя строку для поиска
    const searchString = await getSearchString()

    try {
        // передаем полученные параметры, читаем логи и записываем все строчки с искомой строкой в отдельный файл
        streamFsService(pathAndName, searchString)
    } catch (e) {
        console.log(e)
    }
}
