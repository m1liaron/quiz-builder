import logger from 'jet-logger';

import { ENV } from './libs/modules/config/env/env';
import server from './server';
import { connectDB } from './libs/modules/database/sequelize';
import { initModels } from './libs/modules/database/associations';

const SERVER_START_MESSAGE =
  'Express server started on port: ' + ENV.PORT.toString();

const port = ENV.PORT || 3001
server.listen(port, (err) => {
  connectDB()
    .then(() => {
      if (err) {
        logger.err(err.message);
      } else {
        logger.info(SERVER_START_MESSAGE);
      }
    })
    .catch((dbErr) => logger.err(dbErr));

  initModels();
  if (!!err) {
    logger.err(err.message);
  } else {
    logger.info(SERVER_START_MESSAGE);
  }
});
