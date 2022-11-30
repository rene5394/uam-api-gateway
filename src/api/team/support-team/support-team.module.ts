import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { SupportTeamController } from './support-team.controller';

@Module({
  imports: [ProxyModule],
  controllers: [SupportTeamController]
})
export class SupportTeamModule {}
