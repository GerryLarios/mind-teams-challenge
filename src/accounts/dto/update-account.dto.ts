import { PartialType } from '@nestjs/mapped-types';
import CreateAccountDto from './create-account.dto';

export default class UpdateAccountDto extends PartialType(CreateAccountDto) {}
