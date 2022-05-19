import { ILogger } from "./logger/logger.interface";
import { getArgvVarsAsNums, isPrime } from "./functions/functions";

export class App {
    count: number
    constructor(private readonly logger: ILogger) {
        this.logger = logger
        this.count = 1
    }
    init() {
        if (process.argv.length <= 2) {
            this.logger.logWithColor('Недостаточно аргументов - скрипт ожидает 2 аргумента в виде числа!', 'red')
            return false
        }
        let [from, to] = getArgvVarsAsNums()
        if(typeof from === "undefined" || typeof to === "undefined") {
            this.logger.logWithColor('Ошибка аргументов - скрипт ожидает 2 аргумента в виде числа!', 'red')
            return false
        }
        for (let number: number = from; number <=to; number++) {
            let colorer: any = this.logger.getColor('green');
            if (isPrime(number)) {
                if (this.count % 2 === 0) {
                    colorer = this.logger.getColor('yellow');
                    this.count ++;
                } else if (this.count % 3 === 0) {
                    colorer = this.logger.getColor('red');
                    this.count = 1;
                } else {
                    this.count ++;
                }
                this.logger.log(colorer(number.toString()));
            }
        }
    }
}
