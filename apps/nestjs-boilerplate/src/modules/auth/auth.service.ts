import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { USER_ACCOUNT_ROLE, USER_ACCOUNT_STATUS } from '../user/user.types';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokenData, VerifyTokenData } from './auth.types';
import { Environment } from '@libs/core/env/environment';
import { EmailService } from '@libs/email';
import { UserNotFoundException } from '../../common/exception/user-not-found.exception';
import { UserRepository } from '../user/user.repository';
import * as bcrypt from 'bcrypt';
import { InvalidPasswordException } from '../../common/exception/invalid-password.exception';
import { Id } from '@libs/database/database.types';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository, private readonly jwtService: JwtService, private readonly env: Environment, private readonly emailService: EmailService) {}

    async logIn({ email, password }): Promise<string> {
        const user = await this.userRepository.findUserAccountByEmail(email);

        if (!user) {
          throw new UserNotFoundException();
        }
    
        const validPassword: boolean = await bcrypt.compare(password, user.password);
    
        if (!validPassword) {
          throw new InvalidPasswordException();
        }

        const payload = {
          userId: user.id,
          role: user.role
        }
    
        return this.generateToken({ payload });
      }

    async signUp(user: SignUpRequestDto): Promise<string> {
        const { account } = await this.userRepository.createByEmail({
          ...user,
          role: USER_ACCOUNT_ROLE.STANDARD,
          status: USER_ACCOUNT_STATUS.INACTIVE
        });

        const payload = {
          userAccountId: account.id
        };

        const options = {
          secret: this.env.authConfig.confirmEmailSecret,
          expiresIn: this.env.authConfig.confirmEmailExpiresIn
        };
    
        const token = await this.generateTokenAsync({
            payload,
            options
        });
    
        await this.emailService.userSignUp({
          to: account.email,
          data: {
            hash: token
          }
        });

        return token;
    }

    async forgotPassword({ email }: ForgotPasswordDto) {
      const userAccount = await this.userRepository.findUserAccountByEmail(email);

      if (!userAccount) {
        throw new UserNotFoundException();
      }

      const tokenExpiresIn = this.env.authConfig.forgotPasswordExpiresIn;

      const tokenExpirationTime = Date.now() + Number(tokenExpiresIn);

      const payload = {
        userAccountId: userAccount.id
      };

      const options = {
        secret: this.env.authConfig.forgotPasswordSecret,
        expiresIn: tokenExpiresIn
      };

      const token = await this.generateTokenAsync({
        payload,
        options
      })

      await this.emailService.forgotPassword({
        to: email,
        data: {
          hash: token,
          tokenExpires: tokenExpirationTime
        }
      });
    }

    async resetPassword({ hash, password }: ResetPasswordDto): Promise<void> {
      const tokenData = await this.verifyTokenAsync({
        token: hash,
        options: {
          secret: this.env.authConfig.forgotPasswordSecret
        }
      });

      const userAccountId = tokenData?.userAccountId;

      const userAccount = await this.userRepository.findUserAccountById(userAccountId);

      if (!userAccount) {
        throw new UserNotFoundException();
      }

      // kill opened sessions

      await this.userRepository.updateUserAccount(userAccount.id, { password });

    }

    async validateUser(userAccountId: Id) {
      return this.userRepository.findUserAccountById(userAccountId);
    }

    private generateToken({ payload, options }: GenerateTokenData) {
        return this.jwtService.sign(payload, options);
    }

    private generateTokenAsync({ payload, options }: GenerateTokenData) {  
        return this.jwtService.signAsync(payload, options);
    }

    private verifyTokenAsync({ token, options }: VerifyTokenData) {
      return this.jwtService.verifyAsync(token, options);
    }
}
