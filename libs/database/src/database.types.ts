
import { UUID } from "crypto";
import { DatabaseEntity } from "./database.entity";

export type Id = UUID;

export const TYPEORM_DATABASE_TYPES = {
    postgres: 'postgres',
    mysql: 'mysql',
    mariadb: 'mariadb',
    sqlite: 'sqlite',
    mssql: 'mssql',
    oracle: 'oracle',
    mongodb: 'mongodb',
    'aurora-mysql': 'aurora-mysql'
} as const;

export type TypeOrmDatabaseTypes = typeof TYPEORM_DATABASE_TYPES[keyof typeof TYPEORM_DATABASE_TYPES];

export interface TypeOrmConfig {
    type: TypeOrmDatabaseTypes;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities?: DatabaseEntity[];
    synchronize?: boolean;
}

export type DatabaseConfig = {
    entities?: any[];
    synchronize?: boolean; 
}

type PaginationOptions = {
    page: number,
    limit: number
}

const SORT_ORDERS = {
    ASC: 'ASC',
    DESC: 'DESC'
} as const;

export type SortOrders = typeof SORT_ORDERS[keyof typeof SORT_ORDERS];

type SortOptions = {
    resourceName: string,
    order: SortOrders;
}

export type PaginationAndFilter = {
    paginationOptions: PaginationOptions,
    sortOptions: SortOptions[],
    where: object
}
