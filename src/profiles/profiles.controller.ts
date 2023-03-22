import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Param,
  Patch,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OnlyMeGuard } from 'src/auth/guards';
import { SetProfileDto } from './dto';
import { SetProfileService } from './services';

@Controller('users/:id/profile')
export class ProfilesController {
  constructor(private readonly setProfileService: SetProfileService) {}

  @UseGuards(OnlyMeGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch()
  update(@Param('id') id: string, @Body() setProfileDto: SetProfileDto) {
    return this.setProfileService.set(id, setProfileDto);
  }
}
