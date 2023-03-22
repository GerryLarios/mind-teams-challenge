import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard, OnlyAdminGuard } from 'src/auth/guards';
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

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createTechnologyDto: CreateTechnologyDto) {
    this.createTechnologiesService.create(createTechnologyDto.names);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.retrieveTechnologiesService.retrieve();
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.removeTechnologiesService.remove([id]);
  }
}
