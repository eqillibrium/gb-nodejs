export type Colors = 'green' | 'red' | 'yellow'

export interface ILogger {
    getColor: (color: Colors) => any
    logWithColor: (message: string, color: Colors) => void
    log: (message: string) => void
}
