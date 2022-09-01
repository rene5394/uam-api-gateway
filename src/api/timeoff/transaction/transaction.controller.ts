import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { TransctionMSG } from '../../../common/constants/time-off-messages';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@ApiTags('Timeoff Transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/transactions')
export class TransactionController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyTransaction = this.clientProxy.clientProxyTransaction();

  @Roles(Role.admin)
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto): Observable<Transaction> {
    return this.clientProxyTransaction.send(TransctionMSG.CREATE, createTransactionDto);
  }

  @Roles(Role.admin)
  @Get()
  findAll(): Observable<Transaction[]> {
    return this.clientProxyTransaction.send(TransctionMSG.FIND_ALL, '');
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('/user/me')
  findAllByUserJWT(@Auth() auth): Observable<Transaction[]> {
    return this.clientProxyTransaction.send(TransctionMSG.FIND_ALL_USER_ID, auth.userId);
  }

  @Roles(Role.admin)
  @Get('/user/:userId')
  findAllByUserId(@Param('userId') userId: number): Observable<Transaction[]> {
    return this.clientProxyTransaction.send(TransctionMSG.FIND_ALL_USER_ID, userId);
  }

  @Roles(Role.admin)
  @Get(':requestId')
  findAllByRequestId(@Param('requestId') requestId: number): Observable<Transaction[]> {
    return this.clientProxyTransaction.send(TransctionMSG.FIND_ALL_REQUEST_ID, requestId);
  }

  @Roles(Role.admin)
  @Get(':id')
  findOne(@Param('id') id: number): Observable<Transaction> {
    return this.clientProxyTransaction.send(TransctionMSG.FIND_ONE, id);
  }
}
