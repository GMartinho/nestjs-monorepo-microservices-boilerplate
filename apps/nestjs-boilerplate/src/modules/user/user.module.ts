import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '@libs/database';
import { UserAccountEntity } from './entity/user-account.entity';
import { UserProviderEntity } from './entity/user-provider.entity';
import { UserSettingEntity } from './entity/user-setting.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule.forRoot({
      entities: [
        UserAccountEntity,
        UserProviderEntity,
        UserSettingEntity
      ]
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
