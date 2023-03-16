import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyEntity } from 'src/entities';

@Injectable()
export default class RetrieveTechnologiesService {
  constructor(
    @InjectRepository(TechnologyEntity)
    private repository: Repository<TechnologyEntity>,
  ) {}

  retrieve() {
    return this.repository.find();
  }
}
