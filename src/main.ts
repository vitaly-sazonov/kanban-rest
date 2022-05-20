import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { contentParser } from 'fastify-file-interceptor';

import cors from 'cors';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { LogService } from './logger/logger.service';
import { LoggingInterceptor } from './logger/logging.interceptor';

const USE_FASTIFY = JSON.parse(process.env.USE_FASTIFY as string);
const LOG_CONSOLE = JSON.parse(process.env.LOG_CONSOLE as string);

async function _initApp(isFastify: boolean, isLogger: boolean) {
  if (isFastify) {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: isLogger }), {
      cors: true,
    });
    app.register(contentParser);
    return app;
  }
  const app = await NestFactory.create(AppModule, { logger: isLogger ? ['verbose'] : false });
  // app.use(cors({ origin: ['*'] }));
  return app;
}

async function bootstrap() {
  // Initiliaze nestjs app
  const app = await _initApp(USE_FASTIFY, LOG_CONSOLE);

  // Global connect Logger
  const logger = app.get<LogService>(LogService);
  app.useLogger(logger);

  // Exceptions Filter settings
  const { httpAdapter } = app.get<HttpAdapterHost>(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter, logger));

  // Logging interceptor settings
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  // Validation Pipeline settings
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const PORT = app.get(ConfigService).get<number>('PORT') as number;

  // Swagger settings
  const config = new DocumentBuilder()
    .setTitle('Kanban service')
    .setDescription('The kanban service API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
      },
      'token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(PORT, '0.0.0.0');

  process.on('unhandledRejection', () => {
    logger.error({ msg: 'unhandledRejection event' });
    process.exit(1);
  });
}
bootstrap();
