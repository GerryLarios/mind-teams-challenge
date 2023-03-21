import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;
}
