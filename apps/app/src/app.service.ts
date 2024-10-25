import { Environment } from '@libs/core/env/environment';
import { DatabaseService } from '@libs/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private readonly database: DatabaseService,
    private readonly env: Environment,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
