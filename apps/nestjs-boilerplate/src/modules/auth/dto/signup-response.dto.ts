import { ApiProperty } from '@nestjs/swagger';

export class SignUpResponseDto {
  @ApiProperty()
  signUpToken: string;

  constructor(signUpToken: Partial<string>) {
    this.signUpToken = signUpToken;
  }
}