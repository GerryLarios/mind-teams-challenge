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
    const mappednames = names.map((name) => name.trim().toLowerCase());

    const newTeachnologiesNames = await Promise.all(
      mappednames.filter((name) => !!this.repository.findOneBy({ name })),
    );

    return Promise.all(
      newTeachnologiesNames.map((name) =>
        this.repository.save(this.repository.create({ name })),
      ),
    );
  }
}
