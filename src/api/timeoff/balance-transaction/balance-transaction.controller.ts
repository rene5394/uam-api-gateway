import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { BalanceTransactionMSG } from 'src/common/constants/time-off-messages';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { CreateBalanceTransactionDto } from './dto/create-balance-transaction.dto';
import { UpdateBalanceTransactionDto } from './dto/update-balance-transaction.dto';
import { BalanceTransaction } from './entities/balance-transaction.entity';

@ApiTags('Balance Transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/balance-transactions')
export class BalanceTransactionController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyBalanceTransaction = this.clientProxy.clientProxyBalanceTransaction();

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Post()
  create(@Body() createBalanceTransactionDto: CreateBalanceTransactionDto): Observable<BalanceTransaction> {
    return this.clientProxyBalanceTransaction.send(BalanceTransactionMSG.CREATE, createBalanceTransactionDto);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/me')
  findAllByUserJWT(@Auth() auth): Observable<BalanceTransaction[]> {
    return this.clientProxyBalanceTransaction.send(BalanceTransactionMSG.FIND_ALL_USER_ID, auth.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBalanceTransactionDto: UpdateBalanceTransactionDto) {
    return '';
  }
}
