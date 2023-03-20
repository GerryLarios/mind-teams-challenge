import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetProfileService } from './services';
import { ProfileEntity } from 'src/entities';
import { ProfilesController } from './profiles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  controllers: [ProfilesController],
  providers: [SetProfileService],
})
export class ProfilesModule {}
