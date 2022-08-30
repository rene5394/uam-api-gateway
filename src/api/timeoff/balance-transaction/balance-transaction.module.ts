import { Module } from '@nestjs/common';
import { BalanceTransactionController } from './balance-transaction.controller';

@Module({
  controllers: [BalanceTransactionController]
})
export class BalanceTransactionModule {}
