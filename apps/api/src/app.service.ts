import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'AI Stars API - 影视演员库服务';
  }
}