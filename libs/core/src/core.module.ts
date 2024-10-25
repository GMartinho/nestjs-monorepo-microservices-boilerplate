import { Module } from '@nestjs/common';
import { EnvironmentModule } from './env/environment.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [],
  exports: [],
  imports: [EnvironmentModule, LoggerModule],
})
export class CoreModule {}
