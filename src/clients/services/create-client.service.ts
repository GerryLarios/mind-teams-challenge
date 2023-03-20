import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../dto';
import { ClientEntity } from 'src/entities';

@Injectable()
export default class CreateClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private repository: Repository<ClientEntity>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.repository.save(
      this.repository.create({
        name: createClientDto.name,
        email: createClientDto.email,
      }),
    );
  }
}
