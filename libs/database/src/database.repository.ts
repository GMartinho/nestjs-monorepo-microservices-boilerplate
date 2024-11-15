import { TypeOrmClient } from './client/typeorm.client';

export class DatabaseRepository<T> extends TypeOrmClient<T> {}