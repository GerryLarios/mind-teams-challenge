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

  async create(names: string[]) {
    return this.repository.upsert(
      names.map((name) =>
        this.repository.create({ name: name.trim().toLowerCase() }),
      ),
      ['name'],
    );
  }
}
