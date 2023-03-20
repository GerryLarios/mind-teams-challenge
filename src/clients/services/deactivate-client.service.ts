import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from 'src/entities';

@Injectable()
export default class DeactivateClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
  ) {}

  deactivate(id: string) {
    return this.repository.update({ id }, { active: false });
  }
}
