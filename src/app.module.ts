import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './api/timeoff/balance/balance.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }),
  BalanceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
