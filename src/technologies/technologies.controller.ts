import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import {
  CreateTechnologiesService,
  RemoveTechnologiesService,
  RetrieveTechnologiesService,
} from './services';

@Controller('technologies')
export class TechnologiesController {
  constructor(
    private readonly createTechnologiesService: CreateTechnologiesService,
    private readonly removeTechnologiesService: RemoveTechnologiesService,
    private readonly retrieveTechnologiesService: RetrieveTechnologiesService,
  ) {}

  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    return this.createTechnologiesService.create(createTechnologyDto.names);
  }

  @Get()
  findAll() {
    return this.retrieveTechnologiesService.retrieve();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeTechnologiesService.remove([id]);
  }
}
