import { PartialType } from '@nestjs/mapped-types';
import CreateProfileDto from './create-profile.dto';

export default class UpdateProfileDto extends PartialType(CreateProfileDto) {}
