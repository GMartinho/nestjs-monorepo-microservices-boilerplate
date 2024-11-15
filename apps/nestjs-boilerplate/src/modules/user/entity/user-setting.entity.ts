import { DatabaseEntity } from "@libs/database/database.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { UserAccountEntity } from "./user-account.entity";

@Entity({ name: 'user_setting' })
export class UserSettingEntity extends DatabaseEntity {  
  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified?: boolean;

  @Column({ default: false })
  isPhoneVerified?: boolean;

  @OneToOne(() => UserAccountEntity, (user) => user.settings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_account_id' })
  account?: UserAccountEntity;
}