import { Controller, Get, Param, UseGuards, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { TypeMSG } from 'src/common/constants/time-off-messages';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { Type } from './entities/type.entity';

@ApiTags('Timeoff Request Types')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/types')
export class TypeController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyType = this.clientProxy.clientProxyType(); 

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAll(@Query('app') appQuery): Observable<Type[]> {
    const app = (appQuery) ? appQuery : '';

    return this.clientProxyType.send(TypeMSG.FIND_ALL, app);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<Type>> {
    const type = this.clientProxyType.send(TypeMSG.FIND_ONE, id);

    const typeFound = await new Promise<boolean>(resolve =>
      type.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
    );

    if (!typeFound) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return type;
  }
}
