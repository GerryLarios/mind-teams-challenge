import { Controller, Body, Patch, Param } from '@nestjs/common';
import { SetProfileDto } from './dto';
import { SetProfileService } from './services';

@Controller('users/:id/profile')
export class ProfilesController {
  constructor(private readonly setProfileService: SetProfileService) {}

  @Patch()
  update(@Param('id') id: string, @Body() setProfileDto: SetProfileDto) {
    return this.setProfileService.set(id, setProfileDto);
  }
}
