import { Exclude } from 'class-transformer';
import { UserAccountRole, UserAccountStatus } from '../user.types';
import { DatabaseEntity } from '@libs/database/database.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { UserSettingEntity } from './user-setting.entity';
import { UserProviderEntity } from './user-provider.entity';

@Entity({ name: 'user_account' })
export class UserAccountEntity extends DatabaseEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 255, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255, nullable: false })
  lastName: string;

  @Column({ unique: true, type: 'varchar', length: 255, nullable: false })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, nullable: true })
  password?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  role: UserAccountRole;

  @Column({ type: 'varchar', length: 255, nullable: false })
  status: UserAccountStatus;

  @Column({ type: 'varchar', length: 255, nullable: false })
  phone?: string;

  @Column({ name: 'avatar_path', type: 'varchar', length: 255, nullable: false })
  avatarPath?: string;

  @OneToOne(() => UserSettingEntity, (userSetting) => userSetting.account)
  settings?: UserSettingEntity;

  @OneToMany(() => UserProviderEntity, (userProvider) => userProvider.account)
  providers?: UserProviderEntity[];
}