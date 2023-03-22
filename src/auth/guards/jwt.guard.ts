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
    return user;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const { user }: Request = context.switchToHttp().getRequest();

    return !!user;
  }
}
