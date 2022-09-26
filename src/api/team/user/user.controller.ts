import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants/team-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@ApiTags('Team Users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/team/users')
export class UserController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll(@Query() queryParams) {
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page) ? queryParams.page : '';
    const findParams = { page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL, findParams);
  }

  @Get('employees')
  findAllEmployees(@Query() queryParams)  {
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page) ? queryParams.page : '';
    const findParams = { page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES, findParams);
  }

  @Get('employees/team/:teamId')
  findAllEmployeesByTeam(@Query() queryParams) {
    const teamId = (queryParams.teamId) ? queryParams.teamId : '';
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page) ? queryParams.page : '';
    const findParams = { teamId, page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL_TEAM_ID, findParams);
  }

  @Get('/me')
  findOneByUserJWT(@Auth() auth) {
    return this.clientProxyTeam.send(UserMSG.FIND_ONE, auth.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyTeam.send(UserMSG.FIND_ONE, id);
  }
}
