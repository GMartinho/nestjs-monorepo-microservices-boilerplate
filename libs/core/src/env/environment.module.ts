import { Global, Module } from '@nestjs/common';
import { Environment } from './environment';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [Environment, ConfigService],
  exports: [Environment]
})
export class EnvironmentModule {}
