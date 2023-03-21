import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

@Injectable()
export default class ValidatePasswordService {
  validate(password: string | null, hash: string | null) {
    if (!password && !hash) {
      return true;
    }

    return compare(password, hash);
  }
}
