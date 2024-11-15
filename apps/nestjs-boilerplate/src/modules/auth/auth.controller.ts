import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LogInRequestDto } from './dto/login-request.dto';
import { LogInResponseDto } from './dto/login-response.dto';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { SignUpResponseDto } from './dto/signup-response.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth',
  version: '1'
})
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LogInResponseDto })
  async logIn(@Body() logInRequestDto: LogInRequestDto): Promise<LogInResponseDto> {
    const accessToken = await this.authService.logIn(logInRequestDto);
    return new LogInResponseDto(accessToken);
  }

  @Post('signup')
  @ApiCreatedResponse({ type: SignUpResponseDto })
  async signUp(@Body() signUpRequestDto: SignUpRequestDto): Promise<SignUpResponseDto> {
    const signUpToken = await this.authService.signUp(signUpRequestDto);
    return new SignUpResponseDto(signUpToken);
  }

  @Post('forgot-password')
  @ApiNoContentResponse()
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @ApiNoContentResponse()
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<void> {
    return this.authService.resetPassword(resetPasswordDto);
  }
}