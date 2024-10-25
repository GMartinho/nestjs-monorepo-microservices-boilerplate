/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { DatabaseClient } from '../database-client.interface';

@Injectable()
export class PsqlTypeORMClient implements DatabaseClient {
  create(entity: unknown): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  findOne(criteria: Partial<unknown>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  findMany(criteria?: Partial<unknown>): Promise<unknown[]> {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: Partial<unknown>): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  count(criteria?: Partial<unknown>): Promise<number> {
    throw new Error('Method not implemented.');
  }
}
