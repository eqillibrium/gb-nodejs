import Events from 'events'
import { App } from './2/App'
import { LoggerService } from './2/Logger/logger.service'

const app = new App(new LoggerService(), new Events())

app.run()
