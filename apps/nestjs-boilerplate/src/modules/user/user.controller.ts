import { Controller, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('v1/users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}
}
