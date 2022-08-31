import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { TypeController } from './type.controller';

@Module({
  imports: [ProxyModule],
  controllers: [TypeController]
})
export class TypeModule {}
