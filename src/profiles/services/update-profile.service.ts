import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from 'src/entities';
import { UpdateProfileDto } from '../dto';

@Injectable()
export default class UpdateProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private repository: Repository<ProfileEntity>,
  ) {}

  async update(userId: string, updateProfileDto: UpdateProfileDto) {
    throw new Error('Method not emplemented');
  }
}
