import winston from 'winston';

const MAX_LEVEL = 'debug';
const logLevels = { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 };

const logger = winston.createLogger({
  levels: logLevels,
  transports: [new winston.transports.Console({ level: MAX_LEVEL })],
});

export default logger;
