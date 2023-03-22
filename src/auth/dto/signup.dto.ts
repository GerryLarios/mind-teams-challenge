import { Trim } from 'class-sanitizer';
import { IsEmail, IsString } from 'class-validator';

export default class SignupDto {
  @Trim()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
