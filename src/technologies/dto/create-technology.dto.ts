import { IsArray } from 'class-validator';

export class CreateTechnologyDto {
  @IsArray()
  names: string[];
}
