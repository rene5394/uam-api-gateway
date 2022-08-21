import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceModule } from './api/timeoff/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { EntrieModule } from './api/attendance/entry/entry.module';
import { StatusModule } from './api/attendance/status/status.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }),
  BalanceModule,
  EntrieModule,
  StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
