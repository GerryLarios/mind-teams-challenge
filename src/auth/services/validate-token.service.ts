import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { FindUserService } from 'src/users/services';

@Injectable()
export default class ValidateTokenService {
  constructor(private readonly findUserService: FindUserService) {}

  // Get User by the decoded token. the decoded token only returs the user's id.
  async getUserFromDecodedToken(decoded: { id: string }) {
    if (!decoded?.id) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = this.findUserService.findById(decoded.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
