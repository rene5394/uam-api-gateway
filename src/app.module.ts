import { Module } from '@nestjs/common';
import { BalanceModule } from './api/timeoff/balance/balance.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntrieModule } from './api/attendance/entry/entry.module';
import { StatusModule } from './api/attendance/status/status.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './api/team/user/user.module';

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
    password  : process.env.DATABASE_PASSWORD || 'password',
    database: process.env.DATABASE || 'uamapp',
    entities: [],
    autoLoadEntities: true,
    synchronize: false
  }),
  BalanceModule,
  EntrieModule,
  StatusModule,
  AuthModule,
  UserModule]
})
export class AppModule {}
