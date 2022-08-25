import { Controller, Get, Param } from '@nestjs/common';
import { UserMSG } from 'src/common/constants/team-messages';
import { ClientProxyTeam } from 'src/common/proxy/client-proxy-team';

@Controller('v1/team/users')
export class UserController {
  constructor(private readonly clientProxy: ClientProxyTeam) {}

  private clientProxyUser = this.clientProxy.clientProxyUser();

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientProxyUser.send(UserMSG.FIND_ONE, id);
  }
}
