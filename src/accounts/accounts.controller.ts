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
  CreateAccountService,
  DeactivateAccountService,
  FindAccountService,
  RetrieveAccountService,
  UpdateAccountService,
} from './services';
import { CreateAccountDto, UpdateAccountDto } from './dto';
import { OnlyAdminGuard } from 'src/auth/guards';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly createService: CreateAccountService,
    private readonly deactivateService: DeactivateAccountService,
    private readonly findService: FindAccountService,
    private readonly retrieveService: RetrieveAccountService,
    private readonly updateService: UpdateAccountService,
  ) {}

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.createService.create(createAccountDto);
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
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.updateService.update(id, updateAccountDto);
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateService.deactivate(id);
  }
}
