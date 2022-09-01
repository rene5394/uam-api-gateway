import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { TransactionStatusController } from './transaction-status.controller';

@Module({
  imports: [ProxyModule],
  controllers: [TransactionStatusController]
})
export class TransactionStatusModule {}
