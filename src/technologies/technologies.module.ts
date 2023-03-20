import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologiesController } from './technologies.controller';
import {
  CreateTechnologiesService,
  RemoveTechnologiesService,
  RetrieveTechnologiesService,
} from './services';
import { TechnologyEntity } from 'src/entities';

@Module({
  controllers: [TechnologiesController],
  imports: [TypeOrmModule.forFeature([TechnologyEntity])],
  providers: [
    CreateTechnologiesService,
    RemoveTechnologiesService,
    RetrieveTechnologiesService,
  ],
})
export class TechnologiesModule {}
