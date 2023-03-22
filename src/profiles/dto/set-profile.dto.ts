import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { LenguageLevel } from '../types';

class UserTechnology {
  @IsUUID()
  id: string;
  @IsInt()
  years: number;
}

export default class CreateProfileDto {
  @IsUrl()
  resume: string;

  @IsEnum(LenguageLevel)
  lenguageLevel: LenguageLevel;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserTechnology)
  technologies: UserTechnology[];
}
