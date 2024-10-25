export interface DatabaseClient {
  create(entity: unknown): Promise<unknown>;

  findOne(criteria: unknown): Promise<unknown>;

  findMany(criteria?: unknown): Promise<unknown[]>;

  update(id: string, entity: unknown): Promise<unknown>;

  delete(id: string): Promise<void>;

  count(criteria?: unknown): Promise<number>;
}
