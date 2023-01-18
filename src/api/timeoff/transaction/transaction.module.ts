import { Module } from '@nestjs/common';
import { UnpluggedModule } from 'src/api/email/unplugged/unplugged.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { TransactionController } from './transaction.controller';

@Module({
  imports: [ProxyModule, UnpluggedModule],
  controllers: [TransactionController]
})
export class TransactionModule {}
