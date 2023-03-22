import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import type { UserEntity } from 'src/entities';

@Injectable()
export default class JwtAuthGuard
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

    return (request.user as UserEntity)?.active;
  }
}
