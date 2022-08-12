import { Module } from '@nestjs/common';
import { ClientProxyProxyTimeOff } from './client-proxy-timeoff';

@Module({
  providers: [ClientProxyProxyTimeOff],
  exports: [ClientProxyProxyTimeOff]
})
export class ProxyModule {}
