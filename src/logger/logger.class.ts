import { green, red, yellow } from 'colors/safe';
import { Colors ,ILogger } from './logger.interface';

export class Logger implements ILogger {
    getColor(color: Colors) {
        switch (color) {
            case 'green': return green
            case 'red': return red
            case 'yellow': return yellow
            default: return green
        }
    }
    logWithColor(message: string, color: Colors): void {
        let c = this.getColor(color)
        console.log(c(message))
    }
    log(message: string): void {
        console.log(message)
    }
}
