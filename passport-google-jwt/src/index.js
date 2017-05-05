import util from 'util'

import app from './config/app'
import logger from './util/logger'
import config from './config/config'
import passport from './config/passport'
import routes from './controller'

app.use('/', routes)

app.listen(config.port, () => {
  logger.debug('app listening to port: ' + config.port)
})
