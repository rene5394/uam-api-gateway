import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { BalanceMSG } from 'src/common/constants/time-off-messages';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';

@ApiTags('Balances')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/balances')
export class BalanceController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyBalance = this.clientProxy.clientProxyBalance();

  @Roles(Role.admin)
  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto): Observable<Balance> {
    return this.clientProxyBalance.send(BalanceMSG.CREATE, createBalanceDto);
  }

  @Roles(Role.admin)
  @Get()
  findAll(): Observable<Balance[]> {
    return this.clientProxyBalance.send(BalanceMSG.FIND_ALL, '');
  }

  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: string): Observable<Balance> {
    return this.clientProxyBalance.send(BalanceMSG.FIND_ONE, id);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/me')
  findOneByUserJWT(@Auth() auth): Observable<Balance> {
    return this.clientProxyBalance.send(BalanceMSG.FIND_ONE_USER_ID, auth.userId);
  }

  @Roles(Role.admin)
  @Get('/user/:userId')
  findOneByUserId(@Param('userId') userId: string): Observable<Balance> {
    return this.clientProxyBalance.send(BalanceMSG.FIND_ONE_USER_ID, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceDto: UpdateBalanceDto) {
    return '';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return '';
  }
}
