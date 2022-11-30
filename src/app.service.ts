import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { User } from './api/team/user/entities/user.entity';
import { UserMSG } from './common/constants/team-messages';
import { BalanceTransactionMSG } from './common/constants/time-off-messages';
import { BalanceOperation } from './common/enums/balanceOperation.enum';
import { RequestType } from './common/enums/requestType.enum';
import { ClientProxies } from './common/proxy/client-proxies';

@Injectable()
export class AppService {
  constructor(private readonly clientProxy: ClientProxies) {}

  private readonly logger = new Logger();
  private clientProxyTimeOff = this.clientProxy.clientProxyTimeOff();
  private clientProxyTeam = this.clientProxy.clientProxyTeam();

  @Cron('0 40 12 * * *')
  async yearlyVacation(): Promise<any> {
    if (process.env.VACATION_CRONJOBS === 'true' ) {
      try {
        const users = this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES_HIRE_DATE, "");
        const usersFound = await lastValueFrom(users);
  
        if (usersFound) {
          const userIds: any = [];
          usersFound.map((user: User) => userIds.push(user.id));
  
          const createBulkVacationTransactionDto = {
            userIds,
            typeId: RequestType.vacation,
            operation: BalanceOperation.addition,
            amount: 8,
            updatedBy: 1
          }
  
          const balanceTransactions = this.clientProxyTimeOff.send(BalanceTransactionMSG.CREATE_BULK_VACATION, createBulkVacationTransactionDto);
          const balanceTransactionCreated = await lastValueFrom(balanceTransactions);
  
          return balanceTransactionCreated;
        }
        
        throw new Error('No users found');
      } catch (err) {
        throw new Error(err.message);
      }
    }

    throw new Error('Cron job deactivated');
  }

  @Cron('0 45 12 * * *')
  async sixMonthVacation(): Promise<any> {
    if (process.env.VACATION_CRONJOBS === 'true' ) {
      try {
        const users = this.clientProxyTeam.send(UserMSG.FIND_ALL_EMPLOYEES_SEMESTER_HIRE_DATE, "");
        const usersFound = await lastValueFrom(users);

        if (usersFound) {
          const userIds: any = [];
          usersFound.map((user: User) => userIds.push(user.id));

          const createBulkVacationTransactionDto = {
            userIds,
            typeId: RequestType.vacation,
            operation: BalanceOperation.addition,
            amount: 7,
            updatedBy: 1
          }

          const balanceTransactions = this.clientProxyTimeOff.send(BalanceTransactionMSG.CREATE_BULK_VACATION, createBulkVacationTransactionDto);
          const balanceTransactionCreated = await lastValueFrom(balanceTransactions);

          return balanceTransactionCreated;
        }

        throw new Error('No users found');
      } catch (err) {
        throw new Error(err.message);
      }
    }

    throw new Error('Cron job deactivated');
  }
}
