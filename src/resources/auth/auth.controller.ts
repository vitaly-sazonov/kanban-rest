import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SigninUserDto } from './dto/signin-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

import signin from './schema/controller.signin';
import signup from './schema/controller.signup';

@ApiTags('Authorization')
@Controller()
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create token' })
  @ApiResponse({
    status: 201,
    schema: signin,
  })
  @Post('/signin')
  signin(@Body() signinDto: SigninUserDto) {
    return this.authService.signin(signinDto);
  }

  @ApiOperation({ summary: 'Sign up to create an account' })
  @ApiResponse({
    status: 200,
    schema: signup,
  })
  @Post('/signup')
  signup(@Body() signupDto: CreateUserDto) {
    return this.usersService.create(signupDto);
  }
}
