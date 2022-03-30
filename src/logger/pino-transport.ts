import pino, { TransportMultiOptions } from 'pino';

const { LOG_ERR_LEVEL, LOG_INFO_LEVEL } = process.env;

const transport = pino.transport(<TransportMultiOptions>{
  targets: [
    {
      level: LOG_ERR_LEVEL,
      target: 'pino/file',
      options: { destination: './logs/error.log' },
    },
    {
      level: LOG_INFO_LEVEL,
      target: 'pino/file',
      options: { destination: './logs/info.log' },
    },
  ],
});

export default pino(transport);
