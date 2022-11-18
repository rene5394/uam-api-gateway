import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { EmailService } from './email.service';

@Module({
  imports: [ProxyModule],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
