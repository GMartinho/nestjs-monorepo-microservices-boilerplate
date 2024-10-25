import { Module } from '@nestjs/common';
import { Logger } from './logger';

@Module({
  providers: [Logger],
})
export class LoggerModule {}
