import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from '@libs/database';
import { AuthModule } from './modules/auth/auth.module';
import { UserAccountEntity } from './modules/user/entity/user-account.entity';
import { UserProviderEntity } from './modules/user/entity/user-provider.entity';
import { UserSettingEntity } from './modules/user/entity/user-setting.entity';
import { TypeOrmClient } from '@libs/database/client/typeorm.client';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from '@libs/email';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    AuthModule,
    EmailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
