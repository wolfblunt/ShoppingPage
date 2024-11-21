
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { combine, timestamp, printf } = format;
require('dotenv').config();

const logDirectory = process.env.LOG_DIRECTORY || './logs';
const logRotationInterval = process.env.LOG_ROTATION_INTERVAL || 'daily';

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

let datePattern;
switch (logRotationInterval.toLowerCase()) {
  case 'weekly':
    datePattern = 'YYYY-[W]WW';
    break;
  case 'monthly':
    datePattern = 'YYYY-MM';
    break;
  case 'daily':
  default:
    datePattern = 'YYYY-MM-DD';
}

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new DailyRotateFile({
      filename: `${logDirectory}/%DATE%_auth.log`,
      datePattern: datePattern,
      maxFiles: process.env.LOG_MAX_FILES || '30d',
      zippedArchive: false,
      level: process.env.LOG_LEVEL || 'debug',
    })
  ]
});

const setLogLevel = (level) => {
  logger.level = level;
  console.log("Log Level: ", logger.level);
};

module.exports = { logger, setLogLevel };