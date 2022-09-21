import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { MemberController } from './member.controller';

@Module({
  imports: [ProxyModule],
  controllers: [MemberController]
})
export class MemberModule {}
