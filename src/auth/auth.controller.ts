import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/auth.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { PaginationDto } from 'src/common/dto/pagination-common.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('change-password')
  actualizarContrasena(@Body() updatePassword: UpdatePasswordDto) {
    return this.authService.actualizarContrasena(updatePassword);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }

  @Get('users')
  @Auth()
  getUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.getUsers(paginationDto);
  }

  @Get('user/:userId')
  @Auth()
  getUserById(@Param('userId') userId: string) {
    return this.authService.getUserById(userId);
  }
}
