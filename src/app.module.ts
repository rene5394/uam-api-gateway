import { Module } from '@nestjs/common';
import { BalanceModule } from './api/timeoff/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { EntrieModule } from './api/attendance/entry/entry.module';
import { StatusModule as AttendanceStatusModule } from './api/attendance/status/status.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/team/user/user.module';
import { TeamModule } from './api/team/team/team.module';
import { BalanceTransactionModule } from './api/timeoff/balance-transaction/balance-transaction.module';
import { TypeModule } from './api/timeoff/type/type.module';
import { StatusModule as TimeOffStatusModule } from './api/timeoff/status/status.module';
import { RequestModule } from './api/timeoff/request/request.module';
import { TransactionModule } from './api/timeoff/transaction/transaction.module';
import { TransactionStatusModule } from './api/timeoff/transaction-status/transaction-status.module';
import { EmployeeModule } from './api/team/employee/employee.module';
import { MemberModule } from './api/team/member/member.module';
import { AppService } from './app.service';
import { ProxyModule } from './common/proxy/proxy.module';
import { UnpluggedService } from './api/email/unplugged/unplugged.service';
import { SupportTeamMemberModule } from './api/team/support-team-member/support-team-member.module';
import { SupportTeamModule } from './api/team/support-team/support-team.module';

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
  ScheduleModule.forRoot(),
  AttendanceStatusModule,
  AuthModule,
  BalanceModule,
  BalanceTransactionModule,
  EmployeeModule,
  EntrieModule,
  MemberModule,
  TeamModule,
  TimeOffStatusModule,
  TypeModule,
  UserModule,
  RequestModule,
  TransactionModule,
  TransactionStatusModule,
  ProxyModule,
  SupportTeamMemberModule,
  SupportTeamModule],
  providers: [AppService, UnpluggedService]
})
export class AppModule {}
