import { Module } from '@nestjs/common';
import { ClientProxyAttendance } from './client-proxy-attendance';
import { ClientProxyTeam } from './client-proxy-team';
import { ClientProxyTimeOff } from './client-proxy-timeoff';

@Module({
  providers: [ClientProxyTimeOff, ClientProxyTeam, ClientProxyAttendance],
  exports: [ClientProxyTimeOff, ClientProxyTeam, ClientProxyAttendance]
})
export class ProxyModule {}
