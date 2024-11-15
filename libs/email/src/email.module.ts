import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NodemailerClient } from './client/nodemailer.client';
import { Environment } from '@libs/core/env/environment';

@Module({
  providers: [
    EmailService,
    {
        provide: 'MAILER_CLIENT',
        useClass: NodemailerClient
    },
    Environment
  ],
  exports: [EmailService],
})
export class EmailModule {}