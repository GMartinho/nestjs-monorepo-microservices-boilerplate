import { DatabaseEntity } from '@libs/database/database.entity';
import { UserProviderOptions } from '../user.types';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccountEntity } from './user-account.entity';

@Entity({ name: 'user_provider' })
export class UserProviderEntity extends DatabaseEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: UserProviderOptions;

  @Column({ type: 'text' })
  key: string;

  @Column({ type: 'jsonb' })
  metadata: object;

  @ManyToOne(() => UserAccountEntity, (user) => user.providers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_account_id' })
  account?: UserAccountEntity;
    
}