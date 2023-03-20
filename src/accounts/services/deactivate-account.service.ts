import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from 'src/entities';

@Injectable()
export default class DeactivateAccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: Repository<AccountEntity>,
  ) {}

  deactivate(id: string) {
    return this.repository.update({ id }, { active: false });
  }
}
