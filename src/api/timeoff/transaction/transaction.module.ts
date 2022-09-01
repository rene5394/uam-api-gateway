import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [ProxyModule],
  controllers: [TransactionController]
})
export class TransactionModule {}
