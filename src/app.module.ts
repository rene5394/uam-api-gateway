import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './api/timeoff/balance/balance.module';

@Module({
  imports: [BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
