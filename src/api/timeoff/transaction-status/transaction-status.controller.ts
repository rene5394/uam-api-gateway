import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { ClientProxyTimeOff } from 'src/common/proxy/client-proxy-timeoff';
import { TransactionStatusMSG } from 'src/common/constants/time-off-messages';
import { TransactionStatus } from './entities/transaction-status.entity';

@ApiTags('Timeoff Transaction Statuses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/transaction-statuses')
export class TransactionStatusController {
  constructor(private readonly clientProxy: ClientProxyTimeOff) {}

  private clientProxyTransactionStatus = this.clientProxy.clientProxyTransactionStatus();

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get()
  findAll(): Observable<TransactionStatus[]> {
    return this.clientProxyTransactionStatus.send(TransactionStatusMSG.FIND_ALL, '');
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<TransactionStatus>> {
    const transactionStatus = this.clientProxyTransactionStatus.send(TransactionStatusMSG.FIND_ONE, id);

    const transactionStatusFound = await new Promise<boolean>(resolve =>
      transactionStatus.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
    );

    if (!transactionStatusFound) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return transactionStatus;
  }
}
