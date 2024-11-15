import { Injectable } from '@nestjs/common';
import { FindManyOptions, FindOptionsWhere, ObjectId, Repository, UpdateResult } from 'typeorm';
import { Id, PaginationAndFilter } from '../database.types';
import { UpsertOptions } from 'typeorm/repository/UpsertOptions';

@Injectable()
export class TypeOrmClient<T> {
  constructor(
    private readonly repository: Repository<T>
  ) {}

  async create(entity: T): Promise<T> {
    const resource = this.repository.create(entity);

    return this.repository.save(resource);
  }

  async findOne(criteria: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this.repository.findOne({
      where: criteria
    });
  }

  async findMany(criteria: Partial<PaginationAndFilter>): Promise<T[]> {
    const { where, paginationOptions, sortOptions } = criteria;

    return this.repository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order: sortOptions?.reduce(
        (acc, sort) => ({
          ...acc,
          [sort.resourceName]: sort.order
        }),
        {}
      )
    });
  }

  async update(criteria: string | number | FindOptionsWhere<T> | Date | ObjectId | string[] | number[] | Date[] | ObjectId[], entity: Partial<unknown>): Promise<UpdateResult> {
    return this.repository.update(criteria, entity);
  }

  async upsert(entity: Partial<unknown>, criteria: string[] | UpsertOptions<T>): Promise<unknown> {
    return this.repository.upsert(entity, criteria);
  }

  async delete(id: Id): Promise<unknown> {
    return this.repository.delete(id);
  }

  async softDelete(criteria: string | number | FindOptionsWhere<T> | Date | ObjectId | string[] | number[] | Date[] | ObjectId[]): Promise<UpdateResult> {
    return this.repository.softDelete(criteria);
  }

  async count(criteria?: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<number> {
    return this.repository.count({
      where: criteria
    })
  }

  async query(query: string, parameters?: unknown[]): Promise<unknown> {
    return this.repository.query(query, parameters);
  }
}
