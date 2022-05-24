import Events from 'events'
import { ILogger } from './Logger/logger.interface'
import { createInterval, getArgsArray, prepareDateString } from './functions'
import { yellow, bgRed, green, red } from 'colors/safe'

interface IApp {
    logger: ILogger,
    EventEmitter: Events,

    run: () => void
    init: () => void
    addListeners: () => void
    emitListeners: (args: string[]) => void
    createTimerListener: (time: string) => void
    endTimerListener: (time: string) => void
}

const TimerEvents = {
    createTimer: Symbol.for('createTimer'),
    endTimer: Symbol.for('endTimer')
}

export class App implements IApp {
    logger: ILogger;
    EventEmitter: Events;

    constructor(logger: ILogger, EventEmitter: Events) {
        this.logger = logger
        this.EventEmitter = EventEmitter
    }

    run(): void {
        this.init()
    }

    init(): void {
        this.addListeners()
        const args: string[] | [] = getArgsArray()
        if (args.length === 0) {
            return this.logger.error(bgRed('Недостаточно аргументов для запуска приложения'))
        }
        this.emitListeners(args)
    }

    addListeners(): void {
        this.EventEmitter.addListener(TimerEvents.createTimer, this.createTimerListener.bind(this))
        this.EventEmitter.addListener(TimerEvents.endTimer, this.endTimerListener.bind(this))
    }

    emitListeners(args: string[]): void {
        args.forEach((el) => {
            this.EventEmitter.emit(TimerEvents.createTimer, el)
        })
    }

    createTimerListener(time: string): void {
        const date: any = new Date(prepareDateString(time))
        const now: any = new Date()
        const timeout = date - now

        if (timeout <= 0) {
            return this.logger.error('Нельзя установить таймер на прошлое! ' + red('<(~.^)>'))
        }

        // const interval = setInterval(() => {
        //     // @ts-ignore
        //     let sec: any = Math.trunc((date - new Date()) / 1000)
        //     this.logger.log(`таймер на ${time} будет завершен через ${sec} секунд`)
        // }, 1000)

        const interval = createInterval(time, date, 1000, this.logger)

        setTimeout(() => {
            this.EventEmitter.emit(TimerEvents.endTimer, time)
            clearInterval(interval)
        }, timeout)
    }

    endTimerListener(time: string): void {
        this.logger.warn(green(`Таймер на ${time} завершен` + yellow(' <(^.^)>')))
    }
}
