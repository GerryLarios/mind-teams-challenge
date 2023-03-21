import { IsEmail, IsString } from 'class-validator';

export default class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
}
