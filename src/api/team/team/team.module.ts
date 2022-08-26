import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { TeamController } from './team.controller';


@Module({
  imports: [ProxyModule],
  controllers: [TeamController]
})
export class TeamModule {}
