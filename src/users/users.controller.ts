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
import { JwtAuthGuard } from 'src/auth/guards';
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

  // TODO: only admins can use this endpoint.
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.create(createUserDto);
  }

  // TODO: only admins can use this endpoint.
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.retrieveUserService.retrieve();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.updateUserService.update(id, updateUserDto);
  }

  // TODO: only admins can use this endpoint.
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.deactivateUserService.deactivate(id);
  }
}
