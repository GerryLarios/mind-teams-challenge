import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/entities';

@Injectable()
export default class FindAccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: Repository<AccountEntity>,
  ) {}

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: {
        client: true,
        members: true,
        responsable: true,
      },
      select: {
        members: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
        responsable: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    });
  }
}
