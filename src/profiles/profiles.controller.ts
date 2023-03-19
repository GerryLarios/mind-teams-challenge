import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from './dto';
import { CreateProfileService, UpdateProfileService } from './services';

@Controller('users/:id/profile')
export class ProfilesController {
  constructor(
    private readonly createProfileService: CreateProfileService,
    private readonly updateProfileService: UpdateProfileService,
  ) {}

  @Post()
  create(@Param('id') id: string, @Body() createProfileDto: CreateProfileDto) {
    return this.createProfileService.create(id, createProfileDto);
  }

  @Patch()
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.updateProfileService.update(id, updateProfileDto);
  }
}
