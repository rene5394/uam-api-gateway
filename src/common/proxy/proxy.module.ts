import { Module } from '@nestjs/common';
import { TimeOffProxy } from './timeoff-proxy';

@Module({
  providers: [TimeOffProxy],
  exports: [TimeOffProxy]
})
export class proxyModule {}
