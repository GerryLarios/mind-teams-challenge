import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  CreateUserService,
  DeactivateUserService,
  FindUserService,
  RetrieveUsersService,
  UpdateUserService,
} from './services';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly deactivateUserService: DeactivateUserService,
    private readonly findUserService: FindUserService,
    private readonly retrieveUserService: RetrieveUsersService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.retrieveUserService.retrieve();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.updateUserService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateUserService.deactivate(id);
  }
}
