import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserAccountEntity } from "./entity/user-account.entity";
import { DatabaseRepository } from "@libs/database/database.repository";
import { UserSettingEntity } from "./entity/user-setting.entity";
import { UserProviderEntity } from "./entity/user-provider.entity";
import { Id } from "@libs/database/database.types";
import { User } from "./user.types";

@Injectable()
export class UserRepository {

  constructor(
    @InjectRepository(UserAccountEntity)
    private readonly userAccountRepository: DatabaseRepository<UserAccountEntity>,
    @InjectRepository(UserProviderEntity)
    private readonly userProviderRepository: DatabaseRepository<UserProviderEntity>,
    @InjectRepository(UserSettingEntity)
    private readonly userSettingRepository: DatabaseRepository<UserSettingEntity>

  ) {}

  async findUserAccountByEmail(email: string): Promise<UserAccountEntity> | null {
      return this.userAccountRepository.findOne({ email });
  }

  async findUserAccountById(id: Id) {
    return this.userAccountRepository.findOne({ id });
  }

  async createByEmail(user: UserAccountEntity): Promise<User> {
    const account = await this.userAccountRepository.create(user);
    const setting = await this.userSettingRepository.create({
      ...user,
      userAccountId: account.id
    });

    return {
      account,
      setting
    }
  }

  async updateUserAccount(id:Id, user: Partial<UserAccountEntity>) {
    return this.userAccountRepository.update({ id }, { user });
  }
}