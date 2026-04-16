const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack, ...meta }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message} ${stack ? '\n' + stack : ''
                } ${Object.keys(meta).length ? '\n' + JSON.stringify(meta, null, 2) : ''
                }`;
        })
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        //new transports.File({ filename: 'logs/combined.log' })
    ]
});

module.exports = logger;