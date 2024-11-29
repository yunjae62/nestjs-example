import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('hi')
  getHello(): string {
    const message: string = this.configService.get<string>('MESSAGE');
    console.log(message);
    return message;
  }

  @Get('env')
  getEnv(): string {
    return this.configService.get<string>('URL');
  }
}
