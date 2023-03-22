import { Trim } from 'class-sanitizer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export default class SigninDto {
  @Trim()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
