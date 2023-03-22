import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  CreateClientService,
  DeactivateClientService,
  FindClientService,
  RetrieveClientsService,
  UpdateClientService,
} from './services';
import { CreateClientDto, UpdateClientDto } from './dto';
import { OnlyAdminGuard } from 'src/auth/guards';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createService: CreateClientService,
    private readonly deactivateService: DeactivateClientService,
    private readonly findService: FindClientService,
    private readonly retrieveService: RetrieveClientsService,
    private readonly updateService: UpdateClientService,
  ) {}

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.createService.create(createClientDto);
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.retrieveService.retrieve();
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findService.findById(id);
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    this.updateService.update(id, updateClientDto);
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateService.deactivate(id);
  }
}
