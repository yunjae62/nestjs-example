import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { Request, Response } from 'express';
import { LoginGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return res.send({ message: 'login success' });
  }

  @UseGuards(LoginGuard)
  @Post('login2')
  async login2(@Req() req: Request, @Res() res: Response) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 10,
      });
    }

    return res.send({ message: 'login success' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인 되었을 때만 이 글이 보입니다.';
  }
}
