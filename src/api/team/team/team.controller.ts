import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { TeamMSG } from 'src/common/constants/team-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@ApiTags('Team Teams')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/team/teams')
export class TeamController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll(@Query('status') statusQuery) {
    const status = (statusQuery) ? statusQuery : '';

    return this.clientProxyTeam.send(TeamMSG.FIND_ALL, status);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyTeam.send(TeamMSG.FIND_ONE, id);
  }

  @Get('/user/me')
  findOneByUserJWT(@Auth() auth) {
    return this.clientProxyTeam.send(TeamMSG.FIND_ONE_USER_ID, auth.userId);
  }
}
