import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateClientDto } from '../dto';
import { ClientEntity } from 'src/entities';

@Injectable()
export default class UpdateClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
  ) {}

  update(id: string, updateClientDto: UpdateClientDto) {
    return this.repository.update({ id }, updateClientDto);
  }
}
