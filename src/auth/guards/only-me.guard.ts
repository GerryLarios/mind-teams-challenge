import { Request } from 'express';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import type { UserEntity } from 'src/entities';
import { isAdmin } from 'src/utils';

@Injectable()
export default class OnlyMeGuard
  extends AuthGuard('jwt')
  implements IAuthGuard
{
  handleRequest(err: unknown, user: UserEntity): any {
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const request: Request = context.switchToHttp().getRequest();
    if (!request?.user) {
      return false;
    }
    const user = request.user as UserEntity;

    return user.active && (isAdmin(user) || request.params?.id === user.id);
  }
}
