import { Controller, Get, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { StatusMSG } from 'src/common/constants/time-off-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { Status } from './entities/status.entity';

@ApiTags('Timeoff Request Statuses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/statuses')
export class StatusController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAll(): Observable<Status[]> {
    return this.clientProxyTimeOff.send(StatusMSG.FIND_ALL, '');
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<Status>> {
    const status = this.clientProxyTimeOff.send(StatusMSG.FIND_ONE, id);

    const statusFound = await new Promise<boolean>(resolve =>
      status.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
    );

    if (!statusFound) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return status;
  }
}
