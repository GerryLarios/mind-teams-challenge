import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TechnologiesModule } from './technologies/technologies.module';
import Config from './config';
import {
  ProfileEntity,
  TechnologyEntity,
  UserEntity,
  UserProfileTechnologyEntity,
} from './entities';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true, // TODO: remove this value on prod.
      database: Config.getValues().database.name,
      host: Config.getValues().database.host,
      password: Config.getValues().database.pass,
      port: Config.getValues().database.port,
      username: Config.getValues().database.user,
      entities: [
        ProfileEntity,
        TechnologyEntity,
        UserEntity,
        UserProfileTechnologyEntity,
      ],
    }),
    UsersModule,
    TechnologiesModule,
    ProfilesModule,
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
