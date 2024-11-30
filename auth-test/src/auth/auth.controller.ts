import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/user.dto';
import { Request, Response } from 'express';

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
}
