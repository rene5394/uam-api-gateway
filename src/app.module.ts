import { Module } from '@nestjs/common';
import { BalanceModule } from './api/timeoff/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrieModule } from './api/attendance/entry/entry.module';
import { StatusModule as AttendanceStatusModule } from './api/attendance/status/status.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/team/user/user.module';
import { TeamModule } from './api/team/team/team.module';
import { BalanceTransactionModule } from './api/timeoff/balance-transaction/balance-transaction.module';
import { TypeModule } from './api/timeoff/type/type.module';
import { StatusModule as TimeOffStatusModule } from './api/timeoff/status/status.module';
import { RequestModule } from './api/timeoff/request/request.module';
import { RequestDayModule } from './api/timeoff/request-day/request-day.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ['.env'],
    isGlobal: true
  }),
  TypeOrmModule.forRoot({
    type: process.env.DATABASE_TYPE as any || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT) || 3306,
    username  : process.env.DATABASE_USERNAME || 'root',
    password  : process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE || 'uamapp',
    entities: [],
    autoLoadEntities: true,
    synchronize: false
  }),
  AttendanceStatusModule,
  AuthModule,
  BalanceModule,
  BalanceTransactionModule,
  EntrieModule,
  TeamModule,
  TimeOffStatusModule,
  TypeModule,
  UserModule,
  RequestModule,
  RequestDayModule]
})
export class AppModule {}
