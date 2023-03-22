import { Injectable } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcryptjs';
import Config from 'src/config';

@Injectable()
export default class CreatePasswordService {
  create(str: string) {
    return hashSync(str, genSaltSync(Config.getValues().hash.salt));
  }
}
