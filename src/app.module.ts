import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import User from './users/entities/user.entity';

import Config from './config';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: Config.getValues().database.name,
      host: Config.getValues().database.host,
      password: Config.getValues().database.pass,
      port: Config.getValues().database.port,
      username: Config.getValues().database.user,
      entities: [User],
    }),
    UsersModule,
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
