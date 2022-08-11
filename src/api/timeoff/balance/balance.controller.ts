import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Observable } from 'rxjs';
import { BalanceMSG } from 'src/common/constants/time-off-messages';
import { ClientProxyProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { Balance } from './entities/balance.entity';

@Controller('v1/timeoff/balances')
export class BalanceController {
  constructor(private readonly clientProxy: ClientProxyProxyTimeOff) {}

  private clientProxyBalance = this.clientProxy.clientProxyBalance();

  @Post()
  create(@Body() createBalanceDto: CreateBalanceDto) {
    return '';
  }

  @Get()
  findAll(): Observable<Balance[]> {
    return this.clientProxyBalance.send(BalanceMSG.FIND_ALL, '');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
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
