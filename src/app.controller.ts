import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  ping(): object {
    const startTime = new Date().getTime();
    return this.appService.ping(startTime);
  }
}
