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
  FindAccountService,
  RetrieveAccountService,
} from './services';
import { CreateAccountDto, UpdateAccountDto } from './dto';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createService: CreateAccountService,
    private readonly findService: FindAccountService,
    private readonly retrieveService: RetrieveAccountService,
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
    throw new Error('Method not implemented');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    throw new Error('Method not implemented');
  }
}
