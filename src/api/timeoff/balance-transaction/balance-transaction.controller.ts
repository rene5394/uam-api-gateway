import { Controller, Get, Post, Body, Param, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role } from '../../../common/enums/role.enum';
import { Observable } from 'rxjs';
import { BalanceTransactionMSG } from 'src/common/constants/time-off-messages';
import { ClientProxies } from 'src/common/proxy/client-proxies';
import { CreateBalanceTransactionDto } from './dto/create-balance-transaction.dto';
import { BalanceTransaction } from './entities/balance-transaction.entity';

@ApiTags('Timeoff Balance Transactions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/timeoff/balance-transactions')
export class BalanceTransactionController {
  constructor(private readonly clientProxy: ClientProxies) {}

  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Post()
  create(@Body() createBalanceTransactionDto: CreateBalanceTransactionDto): Observable<BalanceTransaction> {
    return this.clientProxyTimeOff.send(BalanceTransactionMSG.CREATE, createBalanceTransactionDto);
  }

  @Roles(Role.admin)
  @Get()
  findAll(@Auth() auth): Observable<BalanceTransaction[]> {
    return this.clientProxyTimeOff.send(BalanceTransactionMSG.FIND_ALL, '');
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/me')
  findAllByUserJWT(@Auth() auth): Observable<BalanceTransaction[]> {
    return this.clientProxyTimeOff.send(BalanceTransactionMSG.FIND_ALL_USER_ID, auth.userId);
  }

  @Roles(Role.admin, Role.coach, Role.jrCoach, Role.va)
  @Get('user/:userId')
  findAllByUserId(@Param('userId') userId: string): Observable<BalanceTransaction[]> {
    return this.clientProxyTimeOff.send(BalanceTransactionMSG.FIND_ALL_USER_ID, userId);
  }

  @Roles(Role.admin)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Observable<BalanceTransaction>> {
    const balanceTransaction = this.clientProxyTimeOff.send(BalanceTransactionMSG.FIND_ONE, id);

    const balanceTransactionFound = await new Promise<boolean>(resolve =>
      balanceTransaction.subscribe(result => {
        if (!result) {
         resolve(false);
        }
       
        resolve(true);
      })
    );

    if (!balanceTransactionFound) {
      throw new HttpException('NOT FOUND', HttpStatus.NOT_FOUND);
    }

    return balanceTransaction;
  }
}
