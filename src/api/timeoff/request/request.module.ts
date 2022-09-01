import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { RequestController } from './request.controller';

@Module({
  imports: [ProxyModule],
  controllers: [RequestController]
})
export class RequestModule {}
