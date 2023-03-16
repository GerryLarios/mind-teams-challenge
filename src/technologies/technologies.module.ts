import { Module } from '@nestjs/common';
import { TechnologiesController } from './technologies.controller';
import {
  CreateTechnologiesService,
  RemoveTechnologiesService,
  RetrieveTechnologiesService,
} from './services';

@Module({
  controllers: [TechnologiesController],
  providers: [
    CreateTechnologiesService,
    RemoveTechnologiesService,
    RetrieveTechnologiesService,
  ],
})
export class TechnologiesModule {}
