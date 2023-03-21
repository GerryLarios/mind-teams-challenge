import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

export default class CreateAccountDto {
  @IsString()
  name: string;

  @IsUUID()
  clientId: string;

  @IsArray()
  @ValidateNested({ each: true })
  userMemberIds: string[];

  @IsUUID()
  userResponsableId: string;
}
