import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnologyEntity } from 'src/entities';

@Injectable()
export default class CreateTechnologiesService {
  constructor(
    @InjectRepository(TechnologyEntity)
    private repository: Repository<TechnologyEntity>,
  ) {}

  remove(ids: string[]) {
    return this.repository.remove(
      ids.map((id) => this.repository.create({ id })),
    );
  }
}
