import { Module } from '@nestjs/common';
import { UnpluggedService } from './unplugged.service';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  providers: [UnpluggedService],
  exports: [UnpluggedService]
})
export class UnpluggedModule {}
