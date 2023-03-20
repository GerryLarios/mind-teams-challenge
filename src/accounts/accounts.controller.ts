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
  CreateAccountService,
  DeactivateAccountService,
  FindAccountService,
  RetrieveAccountService,
  UpdateAccountService,
} from './services';
import { CreateAccountDto, UpdateAccountDto } from './dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createService: CreateAccountService,
    private readonly deactivateService: DeactivateAccountService,
    private readonly findService: FindAccountService,
    private readonly retrieveService: RetrieveAccountService,
    private readonly updateService: UpdateAccountService,
  ) {}

  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.createService.create(createAccountDto);
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
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.updateService.update(id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateService.deactivate(id);
  }
}
