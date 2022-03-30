import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter, AbstractHttpAdapter } from '@nestjs/core';
import { LogService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private httpAdapter: AbstractHttpAdapter, private logService: LogService) {
    super(httpAdapter);
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host);

    const [req, res] = host.getArgs();
    const { method, url, query, body } = req;
    const { statusCode } = res;
    const { name, message } = exception;
    const now = Date.now();

    this.logService.warn({
      method,
      url,
      query,
      body,
      statusCode,
      exception: message,
      classException: name,
      responseTime: `${Date.now() - now}ms`,
    });
  }
}
