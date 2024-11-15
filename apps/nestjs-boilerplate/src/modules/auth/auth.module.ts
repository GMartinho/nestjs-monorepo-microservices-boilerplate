import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { EnvironmentModule } from '@libs/core/env/environment.module';
import { Environment } from '@libs/core/env/environment';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvironmentModule],
      inject: [Environment],
      useFactory: async (env: Environment) => ({
        secret: env.jwtSecret,
        signOptions: { expiresIn: '2h' },
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserRepository],
  exports: [AuthService]
})
export class AuthModule {}
