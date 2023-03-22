import { Module } from '@nestjs/common';
import { CreatePasswordService, ValidatePasswordService } from './services';

@Module({
  providers: [CreatePasswordService, ValidatePasswordService],
  exports: [CreatePasswordService, ValidatePasswordService],
})
export class PasswordModule {}
