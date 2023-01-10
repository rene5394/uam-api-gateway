import { Module } from '@nestjs/common';
import { UnpluggedModule } from 'src/api/email/unplugged/unplugged.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { RequestController } from './request.controller';

@Module({
  imports: [ProxyModule, UnpluggedModule],
  controllers: [RequestController]
})
export class RequestModule {}
