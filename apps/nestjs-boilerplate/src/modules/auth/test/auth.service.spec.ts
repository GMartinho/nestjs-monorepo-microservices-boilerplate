import { AuthService } from '../auth.service';
import { UserRepository } from '../../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Environment } from '@libs/core/env/environment';
import { EmailService } from '@libs/email';
import { mock } from 'jest-mock-extended';
import { mockUserAccount } from '../../../../test/mock/modules/user/mock-user-account'
import { mockUserSetting } from '../../../../test/mock/modules/user/mock-user-setting';
import { USER_ACCOUNT_ROLE, USER_ACCOUNT_STATUS } from '../../user/user.types';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from '../../../common/exception/user-not-found.exception';
import { InvalidPasswordException } from '../../../common/exception/invalid-password.exception';

const makeSut = () => {
  const userRepository = mock<UserRepository>({
    createByEmail: jest.fn().mockResolvedValue({
      account: mockUserAccount(),
      setting: mockUserSetting(),
    }),
    findUserAccountByEmail: jest.fn().mockResolvedValue(mockUserAccount()),
  });

  const jwtService = mock<JwtService>({
    sign: jest.fn().mockReturnValue('any-token'),
    signAsync: jest.fn().mockResolvedValue('any-async-token')
  });
  
  const env = mock<Environment>({
    authConfig: {
      confirmEmailSecret: 'secret',
      confirmEmailExpiresIn: 3600,
    },
  });

  const emailService = mock<EmailService>();

  const authService = new AuthService(
    userRepository,
    jwtService,
    env,
    emailService
  );

  return {
    userRepository,
    jwtService,
    emailService,
    authService
  }
}

describe('AuthService', () => {
  describe('LogIn', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should log in by e-mail successfully', async () => {
      const { authService, userRepository, jwtService } = makeSut();
  
      const dto = {
        email: 'john.doe@email.com',
        password: 'password123',
      };
  
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => true);
  
      const token = await authService.logIn(dto);

      const expectedToken = 'any-token';
  
      expect(userRepository.findUserAccountByEmail).toHaveBeenCalledWith(dto.email);
      expect(jwtService.sign).toHaveBeenCalled();
      expect(token).toBe(expectedToken);
    });

    it('should throw UserNotFoundException if user does not exist', async () => {
      const { authService, userRepository } = makeSut();
  
      const dto = {
        email: 'john.doe@email.com',
        password: 'password123',
      };
  
      jest.spyOn(userRepository, 'findUserAccountByEmail').mockResolvedValueOnce(null);
  
      await expect(authService.logIn(dto)).rejects.toThrow(UserNotFoundException);
  
      expect(userRepository.findUserAccountByEmail).toHaveBeenCalledWith(dto.email);
    });

    it('should throw InvalidPasswordException if password is invalid', async () => {
      const { authService, userRepository } = makeSut();
  
      const dto = {
        email: 'john.doe@email.com',
        password: 'password123',
      };
  
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
  
      await expect(authService.logIn(dto)).rejects.toThrow(InvalidPasswordException);
  
      expect(userRepository.findUserAccountByEmail).toHaveBeenCalledWith(dto.email);
    });
  });

  describe('SignUp', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should sign up successfully and send a confirmation email', async () => {
      const { authService, userRepository, emailService, jwtService } = makeSut();
  
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        password: 'password123',
      };
  
      const token = await authService.signUp(dto);
  
      const expectedCreateByEmailResponse = {
        ...dto,
        role: USER_ACCOUNT_ROLE.STANDARD,
        status: USER_ACCOUNT_STATUS.INACTIVE,
      };
  
      const expectedToken = 'any-async-token';
  
      const expectedUserSignUp = {
        to: dto.email,
        data: {
          hash: expectedToken
        }
      }
  
      expect(userRepository.createByEmail).toHaveBeenCalledWith(expectedCreateByEmailResponse);
      expect(emailService.userSignUp).toHaveBeenCalledWith(expectedUserSignUp);
      expect(jwtService.signAsync).toHaveBeenCalled();
      expect(token).toBe(expectedToken);
    });
  
    it('should throw an error if createByEmail fails', async () => {
      const { authService, userRepository } = makeSut();
      const error = new Error('User creation failed');
  
      userRepository.createByEmail.mockRejectedValueOnce(error);
  
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        password: 'password123',
      };
  
      await expect(authService.signUp(dto)).rejects.toThrow(error);
  
      expect(userRepository.createByEmail).toHaveBeenCalledWith({
        ...dto,
        role: USER_ACCOUNT_ROLE.STANDARD,
        status: USER_ACCOUNT_STATUS.INACTIVE,
      });
    });
  });
});
