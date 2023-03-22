import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import type User from 'src/entities/user.entity';

@Injectable()
export default class JwtAuthGuard
  extends AuthGuard('jwt')
  implements IAuthGuard
{
  handleRequest(err: unknown, user: User): any {
    console.log('HANDLE_REQUEST', user);

    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const { user }: Request = context.switchToHttp().getRequest();
    console.log('CAN_ACTIVATE', user);

    return !!user;
  }
}
