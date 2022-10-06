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

  @Roles(Role.admin)
  @Get()
  findAll(@Query() queryParams) {
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page && queryParams.page > 0) ? queryParams.page : '';
    const findParams = { page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL, findParams);
  }

  @Roles(Role.admin)
  @Get('employees')
  findAllEmployees(@Query() queryParams)  {
    const userIds = (queryParams.userIds) ? queryParams.userIds : '';
    const text = (queryParams.text) ? queryParams.text : '';
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page && queryParams.page > 0) ? queryParams.page : '';
    const findParams = { userIds, text, page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES, findParams);
  }

  @Roles(Role.admin)
  @Get('employees/team/:teamId')
  findAllEmployeesByTeam(@Param('teamId') teamId: number, @Query() queryParams) {
    const text = (queryParams.text) ? queryParams.text : '';
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page && queryParams.page > 0) ? queryParams.page : '';
    const findParams = { teamId, text, page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES_TEAM_ID, findParams);
  }

  @Roles(Role.coach, Role.jrCoach)
  @Get('employees/user/me')
  findAllEmployeesByTeamJWT(@Auth() auth, @Query() queryParams) {
    const userId = auth.userId;
    const text = (queryParams.text) ? queryParams.text : '';
    const status = (queryParams.status) ? queryParams.status : '';
    const page = (queryParams.page && queryParams.page > 0) ? queryParams.page : '';
    const findParams = { userId, text, page, status };

    return this.clientProxyTeam.send(UserMSG.FIND_ALL_TEAM_EMPLOYEES_USER_ID, findParams);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('/me')
  findOneByUserJWT(@Auth() auth) {
    return this.clientProxyTeam.send(UserMSG.FIND_ONE, auth.userId);
  }

  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clientProxyTeam.send(UserMSG.FIND_ONE, id);
  }
}
