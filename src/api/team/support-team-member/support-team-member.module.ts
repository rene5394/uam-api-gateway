import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { SupportTeamMemberController } from './support-team-member.controller';

@Module({
  imports: [ProxyModule],
  controllers: [SupportTeamMemberController]
})
export class SupportTeamMemberModule {}
