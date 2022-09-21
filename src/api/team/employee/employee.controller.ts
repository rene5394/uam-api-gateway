import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { EmployeeMSG } from 'src/common/constants/team-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';

@ApiTags('Team Employees')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('employees')
export class EmployeeController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Get()
  findAll(@Query() queryParams) {
    const userIds = (queryParams.userIds) ? queryParams.userIds : '';
    const page = (queryParams.page) ? queryParams.page : '';
    const findParams = { userIds, page };

    return this.clientProxyTeam.send(EmployeeMSG.FIND_ALL, findParams);
  }
}
