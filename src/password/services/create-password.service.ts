import { Injectable } from '@nestjs/common';
import { genSalt, hash } from 'bcryptjs';
import Config from 'src/config';

@Injectable()
export default class CreatePasswordService {
  async create(str: string) {
    return hash(str, await genSalt(Config.getValues().hash.salt));
  }
}
