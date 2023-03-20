import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { CreateAccountDto } from '../dto';
import { AccountEntity, ClientEntity, UserEntity } from 'src/entities';

@Injectable()
export default class CreateAccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: Repository<AccountEntity>,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.repository.manager.transaction(async (manager) => {
      return this.getAccountRepository(manager).save(
        this.getAccountRepository(manager).create({
          name: createAccountDto.name,
          client: await this.findClient(manager, createAccountDto.clientId),
          members: await this.findMembers(
            manager,
            createAccountDto.userMemberIds,
          ),
          responsable: await this.findResponsable(
            manager,
            createAccountDto.userResponsableId,
          ),
        }),
      );
    });
  }

  private findClient(manager: EntityManager, id: string) {
    return this.getClientRepository(manager).findOneBy({ id });
  }

  private findMembers(manager: EntityManager, ids: string[]) {
    return this.getUserRepository(manager).findBy({ id: In(ids) });
  }

  private findResponsable(manager: EntityManager, id: string) {
    return this.getUserRepository(manager).findOneBy({ id });
  }

  private getAccountRepository(manager: EntityManager) {
    return manager.getRepository(AccountEntity);
  }

  private getClientRepository(manager: EntityManager) {
    return manager.getRepository(ClientEntity);
  }

  private getUserRepository(manager: EntityManager) {
    return manager.getRepository(UserEntity);
  }
}
