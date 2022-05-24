import { ILogger } from '../Logger/logger.interface';

export const getArgsArray = (): string[] | [] => {
    return process.argv.slice(2)
}

export const prepareDateString = (time: string): string => {
    let dateNow = new Date()
    let reverseArr = time.split('-').reverse()
    let dateStr = reverseArr.slice(0, 3).join('-')
    let timeStr = reverseArr.slice(3).reverse().join(':') + ':' +  dateNow.getSeconds()
    return dateStr + ' ' + timeStr
}

export const createInterval = (time: string, date: Date, interval: number, logger?: ILogger) => {
    return setInterval(() => {
        // @ts-ignore
        let timeout = new Date(Date.parse(date) - new Date())
        let days = Number(timeout.getDate()) - 1 <= 0 ? 0 : Number(timeout.getDate()) - 1
        let hours = Number(timeout.getHours()) - 3
        let minutes = timeout.getMinutes()
        let seconds = timeout.getSeconds()

        if (logger) {
            logger.log(`таймер на ${time} будет завершен через ${days} дн. ${hours} час. ${minutes} мин. ${seconds} сек.`)
        } else {
            console.log(`таймер на ${time} будет завершен через ${hours} час. ${minutes} мин. ${seconds} сек.`)
        }
    }, 1000)
}
