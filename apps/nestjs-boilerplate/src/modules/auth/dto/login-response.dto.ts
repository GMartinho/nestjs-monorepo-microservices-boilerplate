import { ApiProperty } from '@nestjs/swagger';

export class LogInResponseDto {
  @ApiProperty()
  accessToken: string;

  constructor(accessToken: Partial<string>) {
    this.accessToken = accessToken;
  }
}