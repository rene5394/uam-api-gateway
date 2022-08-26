import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { TeamMSG } from 'src/common/constants/team-messages';
import { ClientProxyTeam } from 'src/common/proxy/client-proxy-team';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/team/teams')
export class TeamController {
  constructor(private readonly clientProxy: ClientProxyTeam) {}

  private _clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll(@Query('status') statusQuery) {
    const status = (statusQuery) ? statusQuery : '';

    return this._clientProxyTeam.send(TeamMSG.FIND_ALL, status);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this._clientProxyTeam.send(TeamMSG.FIND_ONE, id);
  }
}
