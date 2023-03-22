import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetProfileService } from './services';
import { ProfileEntity } from 'src/entities';
import { ProfilesController } from './profiles.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity]), AuthModule],
  controllers: [ProfilesController],
  providers: [SetProfileService],
})
export class ProfilesModule {}
