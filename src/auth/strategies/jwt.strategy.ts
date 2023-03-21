import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import Config from 'src/config';
import { ValidateTokenService } from '../services';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: ValidateTokenService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: Config.getValues().jwt.secret,
      ignoreExpiration: true,
    });
  }

  private validate(token: string) {
    return this.service.getUserFromToken(token);
  }
}
