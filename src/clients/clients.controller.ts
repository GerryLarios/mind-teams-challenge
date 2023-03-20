import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  CreateClientService,
  DeactivateClientService,
  FindClientService,
  RetrieveClientsService,
  UpdateClientService,
} from './services';
import { CreateClientDto, UpdateClientDto } from './dto';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly createService: CreateClientService,
    private readonly deactivateService: DeactivateClientService,
    private readonly findService: FindClientService,
    private readonly retrieveService: RetrieveClientsService,
    private readonly updateService: UpdateClientService,
  ) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.createService.create(createClientDto);
  }

  @Get()
  findAll() {
    return this.retrieveService.retrieve();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    this.updateService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateService.deactivate(id);
  }
}
