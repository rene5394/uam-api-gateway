import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SupportTeamMSG } from 'src/common/constants/team-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@ApiTags('Support Team')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/v1/team/support-teams')
export class SupportTeamController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll() {
    return this.clientProxyTeam.send(SupportTeamMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyTeam.send(SupportTeamMSG.FIND_ONE, id);
  }
}
