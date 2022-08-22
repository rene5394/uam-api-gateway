import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { BalanceModule } from './api/timeoff/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { EntrieModule } from './api/attendance/entry/entry.module';
import { StatusModule } from './api/attendance/status/status.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './auth/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }),
  BalanceModule,
  EntrieModule,
  StatusModule,
  AuthModule,
  UsersModule],
  controllers: [AppController]
})
export class AppModule {}
