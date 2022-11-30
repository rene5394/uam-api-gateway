import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { SupportTeamMemberMSG } from 'src/common/constants/team-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@ApiTags('Support Team Member')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/v1/team/support-team-members')
export class SupportTeamMemberController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll(@Query() queryParams) {
    const status = (queryParams.status) ? queryParams.status : '';
    const findParams = { status };
    
    return this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ALL, findParams);
  }

  @Get('/supportTeam/:supportTeamId')
  findOneBySupportTeamId(@Param('supportTeamId') supportTeamId: number) {
    return this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ALL_SUPPORT_TEAM_ID, supportTeamId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyTeam.send(SupportTeamMemberMSG.FIND_ONE, id);
  }
}
