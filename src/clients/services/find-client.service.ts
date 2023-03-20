import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from 'src/entities';

@Injectable()
export default class FindClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
  ) {}

  findById(id: string) {
    return this.repository.findOneBy({ id });
  }
}
