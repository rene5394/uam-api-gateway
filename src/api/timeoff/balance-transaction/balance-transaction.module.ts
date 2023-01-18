import { Module } from '@nestjs/common';
import { UnpluggedModule } from 'src/api/email/unplugged/unplugged.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { BalanceTransactionController } from './balance-transaction.controller';

@Module({
  imports: [ProxyModule, UnpluggedModule],
  controllers: [BalanceTransactionController]
})
export class BalanceTransactionModule {}
