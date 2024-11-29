import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getWeather() {
    const apiKey = this.configService.get('WEATHER_API_KEY');
    return this.callWeatherApi(apiKey);
  }

  private callWeatherApi(apiKey: string): string {
    console.log(apiKey);
    return apiKey;
  }
}
