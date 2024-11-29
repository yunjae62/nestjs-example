import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get('hi')
  getHello(): string {
    const message = this.configService.get('MESSAGE');
    console.log(message);
    return message;
  }

  @Get('env')
  getEnv() {
    return this.configService.get('URL');
  }
}
