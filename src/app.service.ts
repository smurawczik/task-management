import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(startTime: number): object {
    return { ping: `${startTime - Date.now()}ms` };
  }
}
