import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { BalanceTransactionController } from './balance-transaction.controller';

@Module({
  imports: [ProxyModule],
  controllers: [BalanceTransactionController]
})
export class BalanceTransactionModule {}
