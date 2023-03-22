import { Trim } from 'class-sanitizer';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export default class CreateUserDto {
  @Trim()
  @IsString()
  firstname: string;

  @Trim()
  @IsString()
  lastname: string;

  @Trim()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
