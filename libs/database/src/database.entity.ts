import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Id } from './database.types';

export abstract class DatabaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: Id;

    @CreateDateColumn({
        type: 'timestamptz'
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: 'timestamptz'
    })
    updatedAt!: Date;
}
