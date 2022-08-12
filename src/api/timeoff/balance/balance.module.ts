import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { BalanceController } from './balance.controller';

@Module({
  imports: [ProxyModule],
  controllers: [BalanceController]
})
export class BalanceModule {}
