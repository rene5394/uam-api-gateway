import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { UserMSG } from 'src/common/constants/team-messages';
import { ClientProxyTeam } from 'src/common/proxy/client-proxy-team';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/team/users')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyTeam) {}

  private clientProxyUser = this.clientProxy.clientProxyUser();

  @Get('/me')
  findOneByUserJWT(@Auth() auth) {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, auth.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }
}
