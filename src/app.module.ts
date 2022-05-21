import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoggerModule } from './logger/logger.module';
import { UsersModule } from './resources/users/users.module';
import { BoardsModule } from './resources/boards/boards.module';
import { TasksModule } from './resources/tasks/tasks.module';
import { ColumnsModule } from './resources/columns/columns.module';
import { FileModule } from './resources/file/files.module';
import { LogsModule } from './resources/logs/logs.module';

import ormconfig from './ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      ...ormconfig,
      entities: [`${__dirname}/resources/**/**.entity{.ts,.js}`],
      migrations: [`${__dirname}/migrations/*.ts`],
    }),
    LoggerModule,
    UsersModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    FileModule,
    LogsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
