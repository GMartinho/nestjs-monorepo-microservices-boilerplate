import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig, TypeOrmConfig } from './database.types';
import { EnvironmentModule } from '@libs/core/env/environment.module';
import { Environment } from '@libs/core/env/environment';
import { DatabaseRepository } from './database.repository';

@Module({})
export class DatabaseModule {
  static forRoot(config: DatabaseConfig): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [EnvironmentModule],
          inject: [Environment],
          useFactory: (env: Environment): TypeOrmConfig => ({
            type: env.databaseConfig.type,
            host: env.databaseConfig.host,
            port: env.databaseConfig.port,
            username: env.databaseConfig.username,
            password: env.databaseConfig.password,
            database: env.databaseConfig.name,
            entities: config.entities,
            synchronize: config.synchronize
          })
        }),
      ],
      providers: [
        DatabaseRepository,
      ],
      exports: [TypeOrmModule, DatabaseRepository],
    };
  }
}
