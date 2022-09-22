import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { MemberMSG } from 'src/common/constants/team-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@ApiTags('Team Members')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/team/members')
export class MemberController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll(@Query() queryParams) {
    const employeeIds = (queryParams.employeeIds) ? queryParams.employeeIds : '';
    const findParams = { employeeIds };

    return this.clientProxyTeam.send(MemberMSG.FIND_ALL, findParams);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyTeam.send(MemberMSG.FIND_ONE, id);
  }
}
