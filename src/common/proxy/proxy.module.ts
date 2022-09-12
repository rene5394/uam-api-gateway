import { Module } from '@nestjs/common';
import { ClientProxies } from './client-proxies';

@Module({
  providers: [ClientProxies],
  exports: [ClientProxies]
})
export class ProxyModule {}
