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
import { OnlyAdminGuard, OnlyMeGuard } from 'src/auth/guards';
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

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.retrieveUserService.retrieve();
  }

  @UseGuards(OnlyMeGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserService.findById(id);
  }

  @UseGuards(OnlyMeGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.updateUserService.update(id, updateUserDto);
  }

  @UseGuards(OnlyAdminGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateUserService.deactivate(id);
  }
}
