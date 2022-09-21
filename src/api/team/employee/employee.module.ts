import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [ProxyModule],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
