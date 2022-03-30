import { Injectable, LoggerService } from '@nestjs/common';
import pino from './pino-transport';

@Injectable()
export class LogService implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(obj: unknown) {
    pino.info(obj);
  }

  /**
   * Write an 'error' level log.
   */
  error(obj: unknown) {
    pino.fatal(obj);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(obj: unknown) {
    pino.error(obj);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(obj: unknown) {
    pino.debug(obj);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(obj: unknown) {
    pino.trace(obj);
  }
}
