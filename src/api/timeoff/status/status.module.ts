import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { StatusController } from './status.controller';

@Module({
  imports: [ProxyModule],
  controllers: [StatusController]
})
export class StatusModule {}
