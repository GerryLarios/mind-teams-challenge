import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { UpdateAccountDto } from '../dto';
import { AccountEntity, ClientEntity, UserEntity } from 'src/entities';

@Injectable()
export default class UpdateAccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private repository: Repository<AccountEntity>,
  ) {}

  update(id: string, updateAccountDto: UpdateAccountDto) {
    return this.repository.manager.transaction(async (manager) => {
      const account = await this.findAccount(manager, id);

      account.name = updateAccountDto?.name ?? account.name;

      if (updateAccountDto?.clientId) {
        account.client = await this.findClient(
          manager,
          updateAccountDto.clientId,
        );
      }

      if (updateAccountDto?.userResponsableId) {
        account.responsable = await this.findResponsable(
          manager,
          updateAccountDto.userResponsableId,
        );
      }

      if (updateAccountDto?.userMemberIds) {
        account.members = await this.findMembers(
          manager,
          updateAccountDto?.userMemberIds,
        );
      }

      return this.getAccountRepository(manager).save(account);
    });
  }

  private findAccount(manager: EntityManager, id: string) {
    return this.getAccountRepository(manager).findOne({
      where: { id },
      loadRelationIds: true,
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
