import { Module } from '@nestjs/common';
import { UnpluggedModule } from 'src/api/email/unplugged/unplugged.module';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { BalanceController } from './balance.controller';

@Module({
  imports: [ProxyModule, UnpluggedModule],
  controllers: [BalanceController]
})
export class BalanceModule {}
