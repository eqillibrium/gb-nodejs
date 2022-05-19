import { App } from "./app";
import { Logger } from "./logger/logger.class";

const app = new App(new Logger())

app.init()
