import { Module } from '@nestjs/common';
import { ClientProxyAttendance } from './client-proxy-attendance';
import { ClientProxyTimeOff } from './client-proxy-timeoff';

@Module({
  providers: [ClientProxyTimeOff, ClientProxyAttendance],
  exports: [ClientProxyTimeOff, ClientProxyAttendance]
})
export class ProxyModule {}
