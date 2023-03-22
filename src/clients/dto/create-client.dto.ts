import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';

export default class CreateClientDto {
  @Trim()
  @IsString()
  name: string;

  @Trim()
  @IsEmail()
  email: string;
}
