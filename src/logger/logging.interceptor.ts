import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LogService } from './logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logService: LogService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<void> {
    const [req, res] = ctx.getArgs();
    const { method, url, query, body } = req;
    const { statusCode } = res;
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logService.log({ method, url, query, body, statusCode, responseTime: `${Date.now() - now}ms` })),
      );
  }
}
