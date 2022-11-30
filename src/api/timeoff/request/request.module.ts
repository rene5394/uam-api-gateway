import { Module } from '@nestjs/common';
import { EmailModule } from 'src/api/email/email.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { RequestController } from './request.controller';

@Module({
  imports: [ProxyModule, EmailModule],
  controllers: [RequestController]
})
export class RequestModule {}
